
import { Project } from "src/modules/projects/entities/projects.entity";
import { Task } from "src/modules/tasks/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "firstName", nullable: false })
    firstName: string;

    @Column({ name: "lastName" })
    lastName: string;

    @Column({ name: "email", nullable: false })
    email: string;

    @Column({ name: "password", nullable: false })
    password: string;

    @OneToMany(() => Project, (project) => project.user)
    projects: Project[];

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];
}