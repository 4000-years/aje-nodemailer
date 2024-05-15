import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Createuserdto } from './dto/user.dto';
import { Users } from './entity/entity';

@Controller('users')
export class usersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
  @Post('signup')
  async createuser(@Body() user: Createuserdto) {
    return this.userService.createUser(user);
  }
  @Post('store')
  async storeUser(@Body() userData: Users) {
    return this.userService.storeUser(userData);
  }
}
