import { Router } from "express";
import { CreateCampaingController } from "../modules/campaing/controller/CreateCampaingController";
import { UpdateCampaingController } from "../modules/campaing/controller/UpdatecampaingController";

const createCampaingController = new CreateCampaingController();
const updateCampaingController = new UpdateCampaingController();

const campaing = Router();

campaing.post('/create', createCampaingController.handle);
campaing.put('/update', updateCampaingController.handle);

export {campaing}
