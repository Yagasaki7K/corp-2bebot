import { Request, Response } from "express";
import { CreateUsersUseCase } from "../useCases/CreateUsersUseCase";

class CreateUsersController{

    async handle(req:Request,res:Response):Promise<Response>{
        const {name,email,password} = req.body;

        const createUsersUseCase = new CreateUsersUseCase();

        const user = await createUsersUseCase.execute({name,email,password})

        return res.status(201).json(user)
    }
}

export {CreateUsersController}
