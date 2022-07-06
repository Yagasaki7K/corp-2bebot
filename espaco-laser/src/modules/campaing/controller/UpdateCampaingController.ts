import { Request, response, Response } from "express";
import { UpdateCamapaingUseCase } from "../useCases/UpdateCampaingUseCase";

class UpdateCampaingController {

  async handle(req:Request,res:Response):Promise<Response>{

    const {name, phone, hasInterest, needHelp, search} = req.body
    
    const updateCampaingUseCase = new UpdateCamapaingUseCase();

    const newCamaping = await updateCampaingUseCase.execute(name, phone, hasInterest, needHelp, search)

    return res.status(200).json(newCamaping)
  }
}

export {UpdateCampaingController}