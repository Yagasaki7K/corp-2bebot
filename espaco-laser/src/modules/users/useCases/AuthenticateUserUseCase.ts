import { compare } from "bcrypt";
import { sign } from "jsonwebtoken"
import { IAuthenticateUserDTO } from "../dtos/IAuthenticateUserDTO";
import { UsersRepository } from "../repository/UsersRepository";

interface IResponse{
    user:{
        name: string;
        email: string;
    },
    token: string;
}

class AuthenticateUserUseCase{

    async execute({email,password}:IAuthenticateUserDTO):Promise<IResponse>{

        const usersRepostory = new UsersRepository()

        const user = await usersRepostory.findUserByEmail(email)

        if(!user){
            throw new Error("Email or Password incorrect")
        }

        const passwordMatch = await compare(password,user.password)

        if(!passwordMatch){
            throw new Error("Email or Password incorrect")
        }

        const token = sign(
            {email:user.email},
            "shhh",
            {
                subject:String(user._id),
                expiresIn:"1d"
            }
        )
 
        const tokenReturn:IResponse = {
            token,
            user:{
                name:user.name,
                email:user.email
            }
        }    
        return tokenReturn
    }

}

export {AuthenticateUserUseCase}
