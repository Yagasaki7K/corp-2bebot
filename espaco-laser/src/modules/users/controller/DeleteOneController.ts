import { Request, Response } from "express";
import { DeleteOneUseCase } from "../useCases/DeleteOneUseCase";

class DeleteOneController{
    
    async handle(req:Request,res:Response):Promise<Response>{

        const {id} = req.body;

        const deleteOneUseCase = new DeleteOneUseCase();

        await deleteOneUseCase.execute(id)

        return res.status(200).send('Usuario deletado com sucesso')
    }

}

export {DeleteOneController}
