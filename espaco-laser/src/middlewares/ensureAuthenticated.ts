import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export async function ensureAuthenticated(request:Request,response:Response,next:NextFunction){

    const authToken = request.headers.authorization;

    if(!authToken){
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try{
        verify(token,'shhh')

        next()        
    }catch{
        throw new Error("Invalid Token")
    }
}
