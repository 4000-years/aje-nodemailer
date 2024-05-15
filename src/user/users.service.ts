import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as user from 'src/drizzle/schema/users';
import * as devuser from 'src/drizzle/schema/devusers';
import { users } from 'src/drizzle/schema/users';
import { PG_CONNECTION } from 'constants/db';
import { Createuserdto } from './dto/user.dto';
import { Users } from './entity/entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PG_CONNECTION) private dbusers: NodePgDatabase<typeof user>,
    @Inject(PG_CONNECTION) private dbdev: NodePgDatabase<typeof devuser>,
  ) {}

  public async findAll() {
    return await this.dbusers.select().from(users);
  }

  public async createUser(NewUser: Createuserdto) {
    if (!NewUser.firstName) {
      return 'user name is required';
    }

    const fullName = NewUser.firstName + ' ' + NewUser.lastName;
    await this.dbusers.insert(users).values({
      fullName: fullName,
      email: NewUser.email,
    });
    return 'done';
  }

  public async storeUser(userData: Users) {
    const insertPromises = userData.users.map(async (user) => {
      return await this.dbusers.insert(users).values({
        fullName: user.fullName,
        email: user.email,
      });
    });

    await Promise.all(insertPromises);
  }
}
