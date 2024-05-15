import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as user from 'src/drizzle/schema/users';
import { users } from 'src/drizzle/schema/users';
import { eq } from 'drizzle-orm';
import { PG_CONNECTION } from 'constants/db';
import { Createuserdto } from './dto/user.dto';
import { Users } from './entity/entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PG_CONNECTION) private dbusers: NodePgDatabase<typeof user>,
  ) {}

  public async findAll() {
    return await this.dbusers.select().from(users);
  }

  public async findUserById(id: number) {
    return await this.dbusers.query.users.findFirst({
      where: eq(users.id, id),
    });
  }

  public async createUser(NewUser: Createuserdto) {
    await this.dbusers.insert(users).values({
      fullName: NewUser.full_Name,
      email: NewUser.email,
    });
    return this.findAll();
  }
  public async storeUser(userData: Users): Promise<any[]> {
    // Batch insert users
    const insertPromises = userData.users.map(async (user) => {
      await this.dbusers.insert(users).values({
        fullName: user.fullName,
        email: user.email,
      });
    });

    // Wait for all inserts to complete
    await Promise.all(insertPromises);

    // Return all users
    return this.findAll();
  }

  /*  public async updateUser(userid: number, userToEdit: Updateuserdto) {
    await this.dbusers
      .update(users)
      .set({
        name: userToEdit.username,
        password: userToEdit.password,
        email: userToEdit.email,
        role: userToEdit.role,
        member: userToEdit.member,
      })
      .where(eq(users.id, userid));
    return this.findAll();
  }

  public async deleteUser(userid: number) {
    await this.dbusers.delete(users).where(eq(users.id, userid));
    return this.findAll();
  } */
}
