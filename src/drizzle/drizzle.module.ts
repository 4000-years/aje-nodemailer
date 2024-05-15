import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { PG_CONNECTION } from '../../constants/db';
import * as postgres from 'postgres';
import { users } from './schema/users';
import { devusers } from './schema/devusers';

@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');

        if (!connectionString) {
          throw new Error('DATABASE_URL is not defined');
        }

        try {
          new URL(connectionString);

          const client = postgres(connectionString, { prepare: false });
          const db = drizzle(client, {
            schema: {
              ...users,
              ...devusers,
            },
          });
          return db;
        } catch (error) {
          console.error('Error creating postgres client:', error);
          throw error;
        }
      },
    },
  ],
  exports: [PG_CONNECTION],
})
export class DrizzleModule {}
