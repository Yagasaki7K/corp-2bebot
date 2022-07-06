import { UsersRepository } from "../repository/UsersRepository";

class FindAllUsersUseCase{

    async execute(){
        
        const usersRepository = new UsersRepository();

        const users = await usersRepository.findAllUsers();

        return users
            
    }

}
export{FindAllUsersUseCase}
