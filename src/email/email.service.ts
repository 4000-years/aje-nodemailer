// email.service.ts

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User, Users } from 'src/user/entity/entity';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendUserWelcome(user: User, token: string) {
    const confirmation_url = `example.com/auth/confirm?token=${token}`;

    const email = await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Aje App! Anella Testing',
      template: './welcome',
      context: {
        name: user.name,
        confirmation_url,
      },
    });
    console.log(email);
  }

  async sendUserEmails(userData: Users) {
    const toAddresses = userData.users.map((user) => user.email);
    console.log(toAddresses);
    const email = await this.mailerService.sendMail({
      to: toAddresses,
      subject: 'Welcome to Aje App! Anella Testing',
      template: './welcome', // Template path
      context: {},
    });

    console.log('Emails sent to:', toAddresses, email);
  }
}
