import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";
import { User } from "../models/Users"
interface IUsersRepository{
    createUsers({name,email,password}:ICreateUsersDTO):Promise<User>;
    findUserByEmail(email:string):Promise<User>;
    findAllUsers():Promise<User[]>;
    findOneUser(id:string):Promise<User>;
    deleteOne(id:string):Promise<void>;
}

export {IUsersRepository}
