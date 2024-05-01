import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { Users } from 'src/user/entity/entity';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  bulkEmail(@Body() userDto: Users): Promise<void> {
    return this.emailService.sendUserEmails(userDto);
  }
}
