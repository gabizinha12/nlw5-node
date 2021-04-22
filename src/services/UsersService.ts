import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"

class UsersService {
    async create(email: string) {
        const usersRepository = getCustomRepository(UsersRepository)
        const userArleadyExists = await usersRepository.findOne({
            email
        })
        if (userArleadyExists) {
            return userArleadyExists;
        }

        const user = await usersRepository.create({
            email
        })
        await usersRepository.save(user)
        return user;
    }
}

export { UsersService }