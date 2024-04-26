// email.module.ts

import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { join } from 'path';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: `${process.env.MAIL_HOST}`,
          port: 465,
          secure: false,
          auth: {
            user: `${process.env.SMTP_USERNAME}`,
            pass: `${process.env.SMTP_PASSWORD}`,
          },
          tls: {
            rejectUnauthorized: false,
          },
        },
        defaults: {
          from: `"Nice App" <${process.env.SMTP_USERNAME}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
