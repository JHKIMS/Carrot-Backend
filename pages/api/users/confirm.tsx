import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";
import twilio from "twilio"; 
import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_APIKEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  console.log("Confrim파일_Token");
  console.log(token);
  res.status(200).end();
}

export default withHandler("POST", handler);
