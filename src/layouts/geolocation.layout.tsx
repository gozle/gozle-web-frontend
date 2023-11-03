import React, { useEffect } from 'react';

import { useAppDispatch } from 'lib/hooks';
import { resetCoords, updateCoords } from 'lib/store/features/coords';

interface P {
  children: React.ReactNode;
}

export const WithGeolocationLayout = ({ children }: P) => {
  const dispatch = useAppDispatch();

  // Set geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) =>
        dispatch(
          updateCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        ),
      () => resetCoords(),
      { enableHighAccuracy: true },
    );
  }, [dispatch]);

  return <>{children}</>;
};
