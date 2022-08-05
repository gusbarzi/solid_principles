import { MaintrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const postgresUsersRepository = new PostgresUsersRepository()
const mailtrapProvider = new MaintrapMailProvider()

const createUserUseCase = new CreateUserUseCase(
    postgresUsersRepository,
    mailtrapProvider,
)

const createUserController = new CreateUserController(
    createUserUseCase
)

export { createUserUseCase, createUserController }