import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersController } from './users.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  providers: [UsersService],
  imports: [DrizzleModule],
  controllers: [usersController],
  exports: [UsersService],
})
export class UsersModule {}
