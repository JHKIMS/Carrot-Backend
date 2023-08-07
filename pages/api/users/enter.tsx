import { NextApiRequest, NextApiResponse } from "next";

export default async function handelr(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method !=="POST"){
        res.status(401).end();
    }
    res.status(200).end();
}
