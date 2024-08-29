import { Injectable } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "./entities/projects.entity";
@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) { }

    create(createProjectDto: CreateProjectDto) {
        return this.projectRepository.save(createProjectDto);
    }

    findAll() {
        return this.projectRepository.find();
    }

    findOne(id: number) {
        return this.projectRepository.findOne({
            where: { id },
            relations: { tasks: true },
        });
    }

    update(id: number, updateProjectDto: UpdateProjectDto) {
        return this.projectRepository.update(id, updateProjectDto);
    }

    async remove(id: number) {
        await this.projectRepository.delete(id);
    }
}