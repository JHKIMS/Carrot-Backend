import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";
import { withApiSession } from "../../../libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log("Me");
  console.log(req.session.user);
  const profile = await client.user.findUnique({
    where: {
        id: req.session.user?.id
    },
  })
  res.json({
    ok: true,
    profile: profile,
  })
}

export default withApiSession(withHandler({
    method:"GET",
    handler: handler,
    isPrivate:true,
}));
