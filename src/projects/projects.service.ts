import { Injectable } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "./entities/projects.entity";
import { PageService } from "src/modules/pagination/page/page.service";
import { DEFAULT_PAGE_SIZE, FilterDto } from "src/modules/pagination/dto/filter.dto";
@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        private readonly pageService: PageService,
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

    findAllPaginated(filter?: FilterDto) {
        if (!filter) {
            return this.findAll();
        }

        return this.pageService.paginate(this.projectRepository, {
            page: filter.page,
            pageSize: DEFAULT_PAGE_SIZE,
        });
    }
}