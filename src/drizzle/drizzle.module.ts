import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { PG_CONNECTION } from '../../constants/db';
import * as postgres from 'postgres';
import { users } from './schema/users';

@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');

        // Log the connection string for debugging
        console.log(`DATABASE_URL: ${connectionString}`);

        // Validate the connection string
        if (!connectionString) {
          throw new Error('DATABASE_URL is not defined');
        }

        try {
          // Validate the URL format
          new URL(connectionString);

          const client = postgres(connectionString, { prepare: false });
          const db = drizzle(client, {
            schema: {
              ...users,
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
