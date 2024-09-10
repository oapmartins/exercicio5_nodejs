import { hash } from "bcrypt";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
  private readonly DEFAULT_SALT_ROUNDS = 10;

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await hash(
      createUserDto.password,
      this.DEFAULT_SALT_ROUNDS,
    );
    return this.usersRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  findOneBy(criteria: Partial<User>) {
    return this.usersRepository.findOneBy(criteria);
  }

  findOneByOrFail(criteria: Partial<User>) {
    return this.usersRepository.findOneByOrFail(criteria);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}