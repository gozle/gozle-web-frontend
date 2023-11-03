import { type Theme, useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

interface P {
  accept?: { [key: string]: string[] };
  disabled?: boolean;
  files: File[];
  helpContent: React.ReactNode;
  maxFiles?: number;
  onDrop: (files: File[]) => void;
}

const baseStyle = (theme: Theme): React.CSSProperties => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: theme.palette.text.disabled,
  borderStyle: 'dashed',
  backgroundColor: 'transparent',
  color: theme.palette.text.disabled,
  outline: 'none',
  transition: 'border .24s ease-in-out',
});

const focusedStyle = (theme: Theme): React.CSSProperties => ({
  borderColor: theme.palette.primary.main,
});

const acceptStyle = (theme: Theme): React.CSSProperties => ({
  borderColor: theme.palette.success.main,
});

const rejectStyle = (theme: Theme): React.CSSProperties => ({
  borderColor: theme.palette.error.main,
});

const previewStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexWrap: 'wrap',
  height: '150px',
  width: '100%',
  overflow: 'auto',
};

export const DragAndDropFile = ({
  helpContent,
  accept,
  maxFiles,
  files,
  disabled,
  onDrop,
}: P) => {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept, disabled, maxFiles, onDrop });
  const theme = useTheme();

  const style = useMemo(
    () => ({
      ...baseStyle(theme),
      ...(isFocused ? focusedStyle(theme) : {}),
      ...(isDragAccept ? acceptStyle(theme) : {}),
      ...(isDragReject ? rejectStyle(theme) : {}),
    }),
    [theme, isFocused, isDragAccept, isDragReject],
  );
  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {files.length ? (
        <div style={previewStyle}>
          {files.map((file, i) => {
            const preview = URL.createObjectURL(file);
            return (
              <img
                alt={file.name}
                key={i}
                src={preview}
                style={{
                  maxHeight: 'calc(100% - 10px)',
                  margin: '5px',
                  maxWidth: 'calc(100% - 10px)',
                  flexShrink: 1,
                }}
              />
            );
          })}
        </div>
      ) : (
        <div style={{ padding: '2em' }}>{helpContent}</div>
      )}
    </div>
  );
};
