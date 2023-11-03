export const defineMobileDevice = (userAgent: string): boolean =>
  Boolean(
    userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
    ),
  );

export const defineAndroidDevice = (userAgent: string): boolean =>
  Boolean(userAgent.match(/Android/i));
