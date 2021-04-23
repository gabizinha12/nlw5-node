import { getCustomRepository, Repository } from "typeorm"
import { Setting } from "../entities/Setting"
import { SettingsRepository } from "../repositories/SettingsRepository"

interface ISettingsCreate {
    chat: boolean;
    username: string;
}


class SettingsService {
    private settingsRepository: Repository<Setting>
constructor() {
    this.settingsRepository =  getCustomRepository(SettingsRepository)
}
    async create({ chat, username }: ISettingsCreate) {
        const userArleadyExists = await this.settingsRepository.findOne({username})
        const settings = this.settingsRepository.create({
            chat,
            username
        })
    if(userArleadyExists) {
        throw new Error("User arleady exists")
    }
        await this.settingsRepository.save(settings)
        return settings
    }
    async findByUsername(username: string) {
        const settings = await this.settingsRepository.findOne({
            username
        })
        return settings;
    }
    async update(username: string, chat: boolean) {
       await this.settingsRepository.createQueryBuilder().update(Setting)
        .set({chat})
        .where("username  = :username", {
            username
        }).execute()


    }
}


export { SettingsService }