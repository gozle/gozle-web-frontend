export const secondsToTime = (sec: number) => {
  let res = '';
  const hours = Math.floor(sec / 3600);

  if (hours) res += `0${hours}:`.slice(-3);

  const minutes = Math.floor((sec - hours * 3600) / 60);

  res += `0${minutes}:`.slice(-3);

  const seconds = sec - hours * 3600 - minutes * 60;

  return res + `0${seconds}`.slice(-2);
};
