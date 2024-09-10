import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/users/users.module";
import { TaskModule } from "./modules/tasks/tasks.module";
import { CacheModule } from "@nestjs/cache-manager";
import { AuthModule } from "./modules/auth/auth.module";
import * as redisStore from "cache-manager-redis-store";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuardService } from "./modules/auth/auth-guard/auth-guard.service";
import { ProjectModule } from "./modules/projects/project.module";
import { TypeOrmModule } from "@nestjs/typeorm";
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuardService,
    },
  ],
})
export class AppModule { }