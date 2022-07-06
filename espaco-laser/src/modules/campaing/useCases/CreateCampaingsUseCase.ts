import { CampaingRepository } from "../repository/CampaingRepository"

class CreateCamapaingsUseCase{
  async execute(name:string){
    const campaingRepository = new CampaingRepository();

    const campaing = await campaingRepository.createCampaing(name)

    return campaing
  }
}

export {CreateCamapaingsUseCase}