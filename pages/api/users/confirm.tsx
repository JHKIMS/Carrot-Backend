import {withIronSessionApiRoute} from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";
import twilio from "twilio"; 
import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_APIKEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

declare module "iron-session"{
  interface IronSessionData{
    user?: {
      id:number;
    }
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {token} = req.body;
  const exists = await client.token.findUnique({
    where:{
      uniqueKey: token,
    },
  });
  console.log("세션값");
  console.log(req.session);
  console.log("Confrim파일_Token");
  console.log(token);
  if(!exists) return res.status(404).end();
  console.log(exists);
  req.session.user = {
    id: exists.userId
  }
  await req.session.save();
  res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("POST", handler),{
    cookieName: "ironTest",
    password: "1234556766572askgsj1251251255125421dlhkgjeoigsakjjs"
});
