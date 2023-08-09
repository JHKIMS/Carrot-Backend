import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";

type phoneNumber=number;
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? {phone:+phone} : {email} ;
  const user = await client.user.upsert({
      where:{
        ...payload,
      },
      create:{
        name: "Tester-2",
        ...payload,
      },
      update:{},
    });


  return res.status(200).end();
}

export default withHandler("POST", handler);
