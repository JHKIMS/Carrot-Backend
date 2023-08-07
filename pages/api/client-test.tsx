import { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/client";

export default async function handelr(req: NextApiRequest, res:NextApiResponse){
    await client.user.create({
        data:{
            email:"hi@gmail.com",
            name:"hi",
        }
    })
    
    res.json({
        ok:true,
    });
}