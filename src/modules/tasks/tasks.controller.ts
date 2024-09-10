import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  create(@Req() request, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(request.user.userEmail, createTaskDto);
  }

  @Get()
  findAll(@Req() request) {
    return this.tasksService.findAll(request.user?.username);
  }

  @Get(":id")
  findOne(@Req() request, @Param("id") id: number) {
    return this.tasksService.findOne(request.user?.username, +id);
  }

  @Patch(":id")
  update(
    @Req() request,
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(
      request.user?.username,
      +id,
      updateTaskDto,
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tasksService.remove(+id);
  }
}