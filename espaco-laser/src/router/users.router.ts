import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "../modules/users/controller/AuthenticateUserController";
import { CreateUsersController } from "../modules/users/controller/CreateUsersController";
import { DeleteOneController } from "../modules/users/controller/DeleteOneController";
import { FindAllUsersController } from "../modules/users/controller/FindAllUsersController";
import { FindOneUserController } from "../modules/users/controller/FindOneUserController";
import { FindUserByEmailController } from "../modules/users/controller/FindUserByEmailController";

const deleteOneController = new DeleteOneController();
const findOneUserController = new FindOneUserController();
const createUsersController = new CreateUsersController();
const findAllUsersController = new FindAllUsersController();
const findUserByEmailController = new FindUserByEmailController();
const authenticateUserController = new AuthenticateUserController();


const users = Router();


users.post("/create",ensureAuthenticated, createUsersController.handle)
users.post("/login",authenticateUserController.handle)
users.get("/all",ensureAuthenticated,findAllUsersController.handle)
users.get("/findOne",ensureAuthenticated,findOneUserController.handle)
users.get("/findByEmail",ensureAuthenticated,findUserByEmailController.handle)
users.post("/delete",ensureAuthenticated,deleteOneController.handle)

export {users}
