import { UsersRepository } from "../repository/UsersRepository";

class FindUserByEmailUseCase{

    async execute(email:string){
        
        const usersRepository = new UsersRepository();
        
        if(!email){
            throw new Error("Missing Parameter")
        }

        const user = await usersRepository.findUserByEmail(email);

        return user
            
    }
}
export {FindUserByEmailUseCase}
