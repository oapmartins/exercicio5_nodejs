import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TaskStatus } from "../entities/task.entity";
export class CreateTaskDto {
    @IsNotEmpty({ message: "O nome da tarefa precisa de ser definido" })
    @IsString()
    name: string;
    @IsNotEmpty({ message: "A descrição da tarefa precisa de ser definida" })
    @IsEnum(TaskStatus)
    status: TaskStatus;
    projectId: number;
}