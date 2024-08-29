import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TaskModule } from './tasks/tasks.module';
import { ProjectModule } from './projects/project.module';
import { TypeormModule } from './modules/config/typeorm/typeorm.module';

@Module({
  imports: [ProjectModule, UsersModule, TaskModule, TypeormModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
