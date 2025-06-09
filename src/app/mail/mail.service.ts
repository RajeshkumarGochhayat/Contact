import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { config } from 'dotenv';

config({ path: '.env' });

@Injectable()
export class MailService {
  constructor(private mailer: MailerService) { }

  async sendContactEmail(data) {
    const buffer = Buffer.from(data.id_proof, 'base64');

    await this.mailer.sendMail({
      to: process.env.TO_MAIL,
      subject: `Neuspatial Contact Us Form Submission from ${data.first_name} ${data.last_name}`,
      text: `Hello Team,

You have received a new submission from the Neuspatial Contact Us form.

Details are as follows:

Name: ${data.first_name} ${data.last_name}
Email: ${data.email}
Mobile: ${data.mobile}
Type: ${data.type}
About: ${data.about}
ID Proof attach in the attachment

Please follow up with the user at your earliest convenience.

Best regards,
Neuspatial Web Team`,
      attachments: [
        {
          filename: 'id_proof.png',
          content: buffer,
        },
      ],
    });
  }
}