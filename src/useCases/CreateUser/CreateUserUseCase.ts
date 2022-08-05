import { User } from "../../entities/User";
import { IMainProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
    constructor(
       private usersRepository: IUsersRepository,
       private mailProvider: IMainProvider, 
    ) {}

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

        if(userAlreadyExists) {
            throw new Error('User already exists.')
        }

        const user = new User(data)

        await this.usersRepository.save(user)

        this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: "My app team",
                email: 'team@myapp.com',
            },
            subject: 'Welcome to platform',
            body: '<p>You can now access our platform</p>'
        })
    }
}