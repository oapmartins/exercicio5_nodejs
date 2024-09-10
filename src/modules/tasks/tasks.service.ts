import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { Project } from "../projects/entities/projects.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(userEmail: string, createTaskDto: CreateTaskDto) {
    const user = await this.usersRepository.findOneByOrFail({
      email: userEmail,
    });
    const project = await this.projectRepository.findOneByOrFail({
      id: createTaskDto.projectId,
      user,
    });
    return this.taskRepository.save({
      ...createTaskDto,
      project,
      user,
    });
  }

  async findAll(userEmail: string) {
    const user = await this.usersRepository.findOneByOrFail({
      email: userEmail,
    });
    return this.taskRepository.find({
      relations: ["project"],
      where: { user },
    });
  }

  async findOne(userEmail: string, id: number) {
    const user = await this.usersRepository.findOneByOrFail({
      email: userEmail,
    });
    return this.taskRepository.find({
      where: { id, user },
      relations: ["project"],
    });
  }

  async update(userEmail: string, id: number, updateTaskDto: UpdateTaskDto) {
    const user = await this.usersRepository.findOneByOrFail({
      email: userEmail,
    });
    const task = this.taskRepository.findOneByOrFail({ id, user });
    if (!task) {
      throw new UnauthorizedException();
    }
    return this.taskRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.taskRepository.softDelete(id);
  }
}