import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/drizzle/schema/*',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgres://postgres.apgghnnyefvraemuoixq:Ajells23p813@aws-0-us-west-1.pooler.supabase.com:6543/postgres',
  },

  verbose: true,
  strict: true,
});
