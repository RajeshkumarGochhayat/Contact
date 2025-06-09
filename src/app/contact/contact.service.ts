import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { Contact } from './entity/contact.entity';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepo: Repository<Contact>,
    private mailService: MailService,
  ) { }

  async sendContactEmail(data: ContactDto) {
    const user = this.contactRepo.create(data);
    const saved = await this.contactRepo.save(user);
    await this.mailService.sendContactEmail(saved);
  }
}
