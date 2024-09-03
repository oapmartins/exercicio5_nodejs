import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseInterceptors,
} from "@nestjs/common";
import { ProjectService } from "./projects.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { FilterDto } from "src/modules/pagination/dto/filter.dto";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";

@Controller("projects")
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Post()
    create(
        @Body() createProjectDto: CreateProjectDto,
    ) {
        return this.projectService.create(createProjectDto);
    }

    @Get()
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30000)
    async findAll(@Query() filter?: FilterDto) {
        console.log("buscando projetos...");
        return this.projectService.findAllPaginated(filter);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.projectService.findOne(+id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateProjectDto: UpdateProjectDto,
    ) {
        return this.projectService.update(+id, updateProjectDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.projectService.remove(+id);
    }
}