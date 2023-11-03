// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { ADMIN_BASE_URL } from 'lib/constants';

export default async function handler(
  _: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const res = await fetch(`${ADMIN_BASE_URL}/count`);
    return res.status === 200
      ? response.status(200).send('')
      : response.status(400).send('');
  } catch (err) {
    console.log(err);
    return response.status(400).send('');
  }
}
