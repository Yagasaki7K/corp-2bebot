import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";
import { User, Users } from "../models/Users";
import { IUsersRepository } from "./IUsersRepository";

class UsersRepository implements IUsersRepository{


    async createUsers({ name, email, password }: ICreateUsersDTO): Promise<User> {
        const user = new Users({
            name:`${name}`,
            email:`${email}`,
            password:`${password}`
        })

        try{
            await user.save();

            return user
        }catch(err){
            throw new Error(err.message)
        }
    }
    async findUserByEmail(email: string): Promise<User> {
        try{
            const user = await Users.findOne({email:email})
            return user
        }catch(err){
            throw new Error(err.message)
        }
    }
    async findAllUsers(): Promise<User[]> {
        try{
            const users = await Users.find().select("-password")
            
            return users
        }
        catch(err){
            throw new Error(err.message)
        }
    }
    async findOneUser(id: string): Promise<User> {
        try{
            const user = await Users.findById({_id:id})
            
            return user
        }
        catch(err){
            throw new Error(err.message)
        }
    }
    async deleteOne(id: string): Promise<void> {
        try{
            await Users.deleteOne({_id:id});
        }
        catch(err){
            throw new Error(err.message)
        }
    }

}
export {UsersRepository}
