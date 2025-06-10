import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { config } from 'dotenv';
import { Attachment } from 'nodemailer/lib/mailer'; 
config({ path: '.env' });

@Injectable()
export class MailService {
  constructor(private mailer: MailerService) {}

  async sendContactEmail(data) {
    const attachments: Attachment[] = [];

    if (data.id_proof) {
      try {
        const buffer = Buffer.from(data.id_proof, 'base64');
        attachments.push({
          filename: 'id_proof.png',
          content: buffer,
        });
      } catch (error) {
        console.error('Invalid base64 ID proof:', error);
      }
    }

    const messageBody = `Hello Team,

You have received a new submission from the Neuspatial Contact Us form.

Details are as follows:

Name: ${data.first_name} ${data.last_name}
Email: ${data.email}
Mobile: ${data.mobile}
Type: ${data.type}
About: ${data.about}
Id Proof attached:${data.id_proof ? 'ID Proof is attached.' : 'No ID Proof provided.'}

Please follow up with the user at your earliest convenience.

Best regards,
Neuspatial Web Team`;

    await this.mailer.sendMail({
      to: process.env.TO_MAIL,
      subject: `Neuspatial Contact Us Form Submission from ${data.first_name} ${data.last_name}`,
      text: messageBody,
      attachments, 
    });
  }
}
