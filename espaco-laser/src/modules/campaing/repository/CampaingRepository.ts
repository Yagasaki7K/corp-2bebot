import { Campaing, Campaings } from "../models/Campaings";
import { ICampaingRepository } from "./ICampaingRepository";

enum status { ALREADY_A_CUSTOMER = "Já é cliente", COMPETITION_CUSTOMER = "Cliente da concorrência", NOT_INTERESTED = "Não tem interesse" }

class CampaingRepository implements ICampaingRepository {

  async updateOportunity(name: string, phone: string, hasInterest?: boolean, needHelp?: boolean, search?: string): Promise<any> {
    let result
    switch (search) {
      case "Já é cliente":
        result = status.ALREADY_A_CUSTOMER
        break
      case "Cliente da concorrência":
        result = status.COMPETITION_CUSTOMER
        break
      case "Não tem interesse":
        result = status.NOT_INTERESTED
        break
    }
    const campaing = await Campaings.findOne({ name: name })

    campaing.opportunities.forEach(opportunity => {
      if(opportunity.phone == phone){
        opportunity.hasInterest = hasInterest == undefined ? opportunity.hasInterest:hasInterest
        opportunity.needHelp = needHelp == undefined ? opportunity.needHelp:needHelp
        opportunity.search = result == undefined ? opportunity.search : result
      }
    })
    campaing.save()
  }
  async insertOportunity(name: string, phone: string, hasInterest?: boolean, needHelp?: boolean, search?: string): Promise<any> {
    let result
    switch (search) {
      case "Já é cliente":
        result = status.ALREADY_A_CUSTOMER
        break
      case "Cliente da concorrência":
        result = status.COMPETITION_CUSTOMER
        break
      case "Não tem interesse":
        result = status.NOT_INTERESTED
        break
    }
    try {

      const contact = {
        phone: phone,
        hasInterest: typeof(hasInterest) == "boolean"  ? hasInterest : undefined,
        needHelp: typeof(needHelp) == "boolean"  ? needHelp : undefined,
        search: result ? result : undefined
      }
      const newCamaping = await Campaings.findOne({ name: name })

      newCamaping.opportunities.push(contact)
      newCamaping.save()
      return newCamaping
    } catch (err) {
      throw new Error(err.message)
    }
  }
  async createCampaing(name: string): Promise<Campaing> {
    const campaing = new Campaings({
      name: `${name}`,
    })

    try {
      await campaing.save();

      return campaing
    } catch (err) {
      throw new Error(err.message)
    }
  }
  async listAllCampaings(): Promise<Campaing[]> {
    try {
      const user = await Campaings.find()

      return user
    }
    catch (err) {
      throw new Error(err.message)
    }
  }
  async findCampaingByname(name: string): Promise<Campaing> {
    try {
      const user = await Campaings.findOne({ name })

      return user
    }
    catch (err) {
      throw new Error(err.message)
    }
  }
}

export { CampaingRepository }