import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";
import { UsersRepository } from "../repository/UsersRepository";
import bcrypt from "bcrypt"

class CreateUsersUseCase{

    async execute({name,email,password}:ICreateUsersDTO){

        const usersRepository = new UsersRepository()

        if(!name || !email || !password){
            throw new Error("Missing Parameter")
        }

        const existingUser = await usersRepository.findUserByEmail(email)

        if(existingUser){
            throw new Error("User already exists")
        }
        const encryptedPassword = await bcrypt.hash(password,10)

        const user = usersRepository.createUsers({name,email,password:encryptedPassword})
        
        return user
            
    }
}   

export {CreateUsersUseCase}
