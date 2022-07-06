import { UsersRepository } from "../repository/UsersRepository";

class DeleteOneUseCase{

    async execute(id:string){
        
        const usersRepository = new UsersRepository();

        if(!id){
            throw new Error("Missing Parameter")
        }

        await usersRepository.deleteOne(id)
            
    }
}

export {DeleteOneUseCase}
