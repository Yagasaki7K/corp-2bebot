import { Request, Response } from "express";
import { CreateCamapaingsUseCase } from "../useCases/CreateCampaingsUseCase";

class CreateCampaingController {

  async handle(req:Request,res:Response):Promise<Response>{

    const {name} = req.body

    const createCamapaingsUseCase = new CreateCamapaingsUseCase();

    const campaing = await createCamapaingsUseCase.execute(name)

    return res.status(201).json(campaing)
  }
}

export  {CreateCampaingController}