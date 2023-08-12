import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";
import twilio from "twilio";
import mail from "@sendgrid/mail";
import { withApiSession } from "../../../libs/server/withSession";

mail.setApiKey(process.env.SENDGRID_APIKEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  const foundToken = await client.token.findUnique({
    where: {
      uniqueKey: token,
    },
  });
  console.log("세션값");
  console.log(req.session);
  console.log("Confrim파일_Token");
  console.log(token);
  if (!foundToken) return res.status(404).end();
  console.log(foundToken);
  req.session.user = {
    id: foundToken.userId,
  };
  await req.session.save();
  await client.token.deleteMany({
    where:{
      userId: foundToken.userId,
    }
  })
  res.json({ok:true});
}

export default withApiSession(withHandler("POST", handler));
