import { Module } from '@nestjs/common';
import { ProjectsController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from '../pagination/pagination.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { Project } from './entities/projects.entity';
import { ProjectsService } from './projects.service';

@Module({
  imports: [
    PaginationModule,
    UsersModule,
    TypeOrmModule.forFeature([Project, User]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectModule { }