import { Module } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/projects/entities/projects.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Task, Project])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TaskModule { }