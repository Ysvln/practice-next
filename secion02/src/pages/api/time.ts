// https://nextjs.org/docs/pages/building-your-application/routing/api-routes
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const date = new Date();

  res.json({ time: date.toLocaleString() });
}
