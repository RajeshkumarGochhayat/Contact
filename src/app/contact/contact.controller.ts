import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';
import { Response } from 'express';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) { }


  @Post()
  async handleContact(
    @Body() data: ContactDto,
    @Res() response: Response
  ) {
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: await this.contactService.sendContactEmail(data),
      message: 'Contact email sent successfully',
    });
  }
}
