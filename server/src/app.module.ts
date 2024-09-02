import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { AdminModule } from './admin/admin.module';
import { ContactModule } from './contact/contact.module';
import { AboutModule } from './about/about.module';
import { SkillsModule } from './skills/skills.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HttpModule } from '@nestjs/axios';
import { LoadDatabaseModule } from './utils/Load_DataBase.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      ssl: {
        rejectUnauthorized: false, 
      }
      synchronize: false,
      dropSchema: false,


    }),
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.email,
          pass: process.env.pass,
        }
      },
      defaults: {
        from: 'Favio Manrrubia',
      },
    }),


    ProjectsModule, AdminModule, ContactModule, AboutModule, SkillsModule, HttpModule, LoadDatabaseModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
