// email.service.ts

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User, Users } from 'src/user/entity/entity';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendUserWelcome(user: User, token: string) {
    const confirmation_url = `example.com/auth/confirm?token=${token}`;
    const aje_url = 'https://ajeinc.app/';
    const download_url =
      'https://play.google.com/store/apps/details?id=com.aje.app&pcampaignid=web_share';
    const email = await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Aje App! Anella Testing',
      template: './newsletter',
      context: {
        name: user.fullName,
        confirmation_url,
        aje_url,
        download_url,
      },
    });
    console.log(email);
  }

  async sendUserEmails(userData: Users) {
    const toAddresses = userData.users.map((user) => user.email);
    const name = userData.users.map((user) => user.fullName);
    console.log(toAddresses);
    const aje_url = 'https://ajeinc.app/';
    const download_url =
      'https://play.google.com/store/apps/details?id=com.aje.app&pcampaignid=web_share';
    const email = await this.mailerService.sendMail({
      to: toAddresses,
      subject: 'Welcome to Aje App! Anella Testing for ALX Survey',
      template: './newsletter',
      context: {
        name: name,
        aje_url,
        download_url,
      },
    });

    console.log('Emails sent to:', toAddresses, email);
  }
}
