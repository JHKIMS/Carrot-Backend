import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  let user;
  if(phone){
    user = await client.user.upsert({
      where:{
        phone: +phone,
      },
      create:{
        name: "Tester-2",
        phone: +phone,
      },
      update:{},
    })
  }else if(email){
    user = await client.user.upsert({
      where:{
        email: email,
      },
      create:{
        name: "Tester-2",
        email: email,
      },
      update:{},
    })
  }

  return res.status(200).end();
}

export default withHandler("POST", handler);
