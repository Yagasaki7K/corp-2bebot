import { CampaingRepository } from "../repository/CampaingRepository"

class UpdateCamapaingUseCase {
  async execute(name: string, phone: string, hasInterest?: boolean, needHelp?: boolean, search?: string) {

    const campaingrepository = new CampaingRepository();

    const campaing = await campaingrepository.findCampaingByname(name);

    if (!campaing) {
      throw new Error("Camapanha não existe")
    }

    const opportunity = campaing.opportunities.filter(oportunity => {
      return oportunity.phone == phone
    })

    let newCampaing

    if (opportunity.length > 0) {
      newCampaing = await campaingrepository.updateOportunity(name, phone, hasInterest, needHelp, search)

      return newCampaing
    }

    newCampaing = await campaingrepository.insertOportunity(name, phone, hasInterest, needHelp, search)
    return newCampaing

  }

}

export { UpdateCamapaingUseCase }