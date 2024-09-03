import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/projects.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './projects.service';
import { PaginationModule } from 'src/modules/pagination/pagination.module';
@Module({
  imports: [PaginationModule, TypeOrmModule.forFeature([Project])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule { }
