import { getCustomRepository } from "typeorm"
import { SettingsRepository } from "../repositories/SettingsRepository"

interface ISettingsCreate {
    chat: boolean;
    username: string;
}


class SettingsService {
    async create({ chat, username }: ISettingsCreate) {
        const settingsRepository = getCustomRepository(SettingsRepository)
        const userArleadyExists = await settingsRepository.findOne({username})
        const settings = settingsRepository.create({
            chat,
            username
        })
    if(userArleadyExists) {
        throw new Error("User arleady exists")
    }
        await settingsRepository.save(settings)
        return settings
    }
}


export { SettingsService }