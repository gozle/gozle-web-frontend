import { APP_URL } from 'lib/constants';

export const count = async () => {
  try {
    const res = await fetch(`${APP_URL}/api/count`);
    return res;
  } catch (err) {
    return null;
  }
};
