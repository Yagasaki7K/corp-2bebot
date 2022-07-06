import { Request, Response } from "express";
import { FindOneUserUseCase } from "../useCases/FindOneUserUseCase";

class FindOneUserController {

    async handle(req:Request,res:Response){

        const { id } = req.body;
 
        const findOneUserUseCase = new FindOneUserUseCase();

        const user = await findOneUserUseCase.execute(id);

        return res.status(200).json(user)
    }
}
export {FindOneUserController}
