import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoadDataBase } from './firstload';
import { about } from '../entities/about.entity';
import { contact } from '../entities/contact.entity';
import { skills } from '../entities/skills.entity';
import { projects } from '../entities/projects.entity';
/*import { OnModuleInit } from '@nestjs/common';*/


@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([about, contact, skills, projects]),
  ],
  providers: [LoadDataBase],
  exports: [LoadDataBase],
})
export class LoadDatabaseModule {}
/*implements OnModuleInit{
  constructor(private firstload: LoadDataBase){ }
  onModuleInit() {
    this.firstload.firstLoad()
  }
}*/