import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgDBConfig } from './config';
import { ContactModule } from './app/contact/contact.module';

@Module({
  imports: [TypeOrmModule.forRoot(pgDBConfig),ContactModule],
})
export class AppModule {}
