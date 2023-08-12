import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

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

export default withIronSessionApiRoute(withHandler("GET", handler), {
  cookieName: "ironTest",
  password: "1234556766572askgsj1251251255125421dlhkgjeoigsakjjs",
});
