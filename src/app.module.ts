import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { CacheModule } from "@nestjs/cache-manager";
import * as redisStore from "cache-manager-redis-store";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { ProjectModule } from "./projects/project.module";
import { TaskModule } from "./tasks/tasks.module";
@Module({
  imports: [
    UsersModule,
    ProjectModule,
    TaskModule,
    TypeOrmModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }