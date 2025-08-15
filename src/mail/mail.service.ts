import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Admin } from '../admin/entities/admin.entity';
import { Hr } from '../hr/entities/hr.entity';
import { Seeker } from '../seekers/entities/seeker.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendHrMail(hr: Hr) {
    const url = `${process.env.API_HOST}/api/hr/activate/${hr.active_link}`;
    console.log('ACTIVE LINK:', hr.active_link);

    await this.mailerService.sendMail({
      to: hr.email,
      subject: 'Welcome to HH.UZ App!',
      template: './confirmation',
      context: {
        name: hr.first_name,
        url,
      },
    });
  }

  async sendSeekerMail(seeker: Seeker) {
    const url = `${process.env.API_HOST}/api/seeker/activate/${seeker.activate_link}`;

    await this.mailerService.sendMail({
      to: seeker.email,
      subject: 'Welcome to HH.UZ!',
      template: './confirmation',
      context: {
        name: seeker.first_name,
        url,
      },
    });
  }
}
