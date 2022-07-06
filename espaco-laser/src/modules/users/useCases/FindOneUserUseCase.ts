import { UsersRepository } from "../repository/UsersRepository";

class FindOneUserUseCase{

    async execute(id:string){
        
        const usersRepository = new UsersRepository();
        
        if(!id){
            throw new Error("Missing Parameter")
        }

        const user = await usersRepository.findOneUser(id);

        return user
            
    }
}
export {FindOneUserUseCase}
