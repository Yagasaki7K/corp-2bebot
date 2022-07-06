import { Request, Response } from "express";
import { FindUserByEmailUseCase } from "../useCases/FindUserByEmailUseCase";

class FindUserByEmailController{

    async handle(req:Request,res:Response){

        const {email} = req.body;

        const findUserByEmailUseCase = new FindUserByEmailUseCase();

        const user = await findUserByEmailUseCase.execute(email)

        return res.status(200).json(user)
    }
}

export {FindUserByEmailController}
