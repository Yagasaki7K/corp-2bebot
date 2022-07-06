import { Request, Response } from "express";
import { FindAllUsersUseCase } from "../useCases/FindAllUsersUseCase";

class FindAllUsersController{

    async handle(req:Request,res:Response):Promise<Response>{
        
        const findAllUsersUseCase = new FindAllUsersUseCase()

        const users = await findAllUsersUseCase.execute()

        return res.status(200).json(users)
    }
}
export {FindAllUsersController}
