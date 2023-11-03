// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch, { Response } from 'node-fetch';

import { ADMIN_BASE_URL } from 'lib/constants';

const sendFeedbackResult = async (body: any): Promise<Response | null> => {
  try {
    return fetch(`${ADMIN_BASE_URL}/feedback`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return null;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>,
) {
  const result = await sendFeedbackResult(req.body);
  return result
    ? res.status(result.status).send(await result.json())
    : res.status(404).send('');
}
