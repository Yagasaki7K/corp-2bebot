import { Campaing } from "../models/Campaings"

interface ICampaingRepository {
  createCampaing(name:string):Promise<Campaing>;
  listAllCampaings():Promise<Campaing[]>;
  findCampaingByname(name:string):Promise<Campaing>;
  insertOportunity(name: string, phone: string, hasInterest?:boolean, needHelp?:boolean, search?:string):Promise<any>;
  updateOportunity(name: string, phone: string, hasInterest?:boolean, needHelp?:boolean, search?:string):Promise<any>;
}

export {ICampaingRepository}