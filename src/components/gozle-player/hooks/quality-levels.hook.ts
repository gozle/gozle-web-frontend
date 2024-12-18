import Hls from 'hls.js';
// @ts-ignore
import { Parser } from 'm3u8-parser';
import React, { useCallback, useEffect, useState } from 'react';
import { buildAbsoluteURL } from 'url-toolkit';

import { QualityLevel } from '../lib/types';
import { CodecType, isCodecSupportedInMp4, isCodecType } from '../lib/utils';

type Playlist = {
  attributes: {
    BANDWIDTH: number;
    'CLOSED-CAPTIONS'?: string;
    CODECS?: string;
    'FRAME-RATE'?: number;
    NAME?: string;
    'PROGRAM-ID'?: number;
    RESOLUTION?: { height: number; width: number };
  };
  timeline: number;
  uri: string;
};

export const useQualityLevels = (
  src: string,
  api: React.RefObject<Hls | null>,
  ready: boolean,
) => {
  const [mounted, setMounted] = useState(false);
  const [levels, setLevels] = useState<QualityLevel[]>([]);

  const setCodecs = (codecs: string[], level: QualityLevel) => {
    const codecTypes: CodecType[] = ['video', 'audio', 'text'];
    codecTypes.forEach((type: CodecType) => {
      const filtered = codecs.filter((codec) => isCodecType(codec, type));
      if (filtered.length) {
        const preferred = filtered.filter((codec) => {
          return (
            codec.lastIndexOf('avc1', 0) === 0 ||
            codec.lastIndexOf('mp4a', 0) === 0
          );
        });
        level[`${type}Codec`] =
          preferred.length > 0 ? preferred[0] : filtered[0];

        // remove from list
        codecs = codecs.filter((codec) => filtered.indexOf(codec) === -1);
      }
    });

    level.unknownCodecs = codecs;
  };

  const filterAndSortMediaOptions = (unfilteredLevels: QualityLevel[]) => {
    let resolutionFound = false;
    let videoCodecFound = false;
    let audioCodecFound = false;

    // only keep levels with supported audio/video codecs
    let levels = unfilteredLevels.filter(
      ({ audioCodec, videoCodec, width, height, unknownCodecs }) => {
        resolutionFound ||= !!(width && height);
        videoCodecFound ||= !!videoCodec;
        audioCodecFound ||= !!audioCodec;
        return (
          !unknownCodecs?.length &&
          (!audioCodec || isCodecSupportedInMp4(audioCodec, 'audio')) &&
          (!videoCodec || isCodecSupportedInMp4(videoCodec, 'video'))
        );
      },
    );

    // remove audio-only level if we also have levels with video codecs or RESOLUTION signalled
    if ((resolutionFound || videoCodecFound) && audioCodecFound) {
      levels = levels.filter(
        ({ videoCodec, width, height }) => !!videoCodec || !!(width && height),
      );
    }

    // sort levels from lowest to highest
    return levels.sort((a, b) => {
      if (a.bitrate !== b.bitrate) {
        return a.bitrate - b.bitrate;
      }
      if (resolutionFound && a.height !== b.height) {
        return a.height - b.height;
      }
      return 0;
    });
  };

  const setLevelsFromSrc = useCallback(
    (src: string) => {
      fetch(src)
        .then(async (res) => {
          const parser = new Parser();

          parser.push(await res.text());
          parser.end();

          if (mounted) {
            const levels: QualityLevel[] = [];
            const levelsWithKnownCodecs: QualityLevel[] = [];

            parser.manifest.playlists.forEach((el: Playlist) => {
              const level: QualityLevel = {
                bitrate: el.attributes.BANDWIDTH || 0,
                height: el.attributes.RESOLUTION
                  ? el.attributes.RESOLUTION.height
                  : 0,
                name: el.attributes.NAME ? el.attributes.NAME : undefined,
                url: buildAbsoluteURL(src, el.uri, { alwaysNormalize: true }),
                width: el.attributes.RESOLUTION
                  ? el.attributes.RESOLUTION.width
                  : 0,
              };

              setCodecs(
                (el.attributes.CODECS || '')
                  .split(/[ ,]+/)
                  .filter((c: string | undefined) => c),
                level,
              );

              if (!level.unknownCodecs?.length)
                levelsWithKnownCodecs.push(level);

              levels.push(level);
            });

            // Filter out levels with unknown codecs if it does not remove all levels
            const stripUnknownCodecLevels =
              levelsWithKnownCodecs.length > 0 &&
              levelsWithKnownCodecs.length < levels.length;

            setLevels(
              filterAndSortMediaOptions(
                stripUnknownCodecLevels ? levelsWithKnownCodecs : levels,
              ),
            );
          }
        })
        .catch((err) => err);
    },
    [mounted],
  );

  const setLevelsFromApi = useCallback((api: Hls) => {
    setLevels(
      api.levels.map((el) => ({
        bitrate: el.bitrate,
        height: el.height,
        url: el.uri,
        width: el.width,
        audioCodec: el.audioCodec,
        name: el.name,
        unknownCodecs: el.unknownCodecs,
        videoCodec: el.videoCodec,
      })),
    );
  }, []);

  useEffect(() => {
    if (ready) {
      setLevels([]);
      if (api.current === null) setLevelsFromSrc(src);
      else setLevelsFromApi(api.current);
    }
  }, [ready, api, src, setLevelsFromSrc, setLevelsFromApi]);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  return levels;
};
