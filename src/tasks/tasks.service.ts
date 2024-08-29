import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "src/projects/entities/projects.entity";
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    const project = await this.projectRepository.findOneByOrFail({
      id: createTaskDto.projectId,
    });
    return this.taskRepository.save({ ...createTaskDto, project });
  }

  findAll() {
    return this.taskRepository.find();
  }

  findOne(id: number) {
    return this.taskRepository.findOneBy({ id });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.taskRepository.delete(id);
  }
}