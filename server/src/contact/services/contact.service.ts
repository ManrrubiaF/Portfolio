import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { contact } from 'src/entities/contact.entity';
import { mailerServ } from 'src/admin/services/mailer.service';

@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(contact) 
        private contactRepo: Repository<contact>,
        private mailserv: mailerServ,
    ){}
    getInfo(){
        return this.contactRepo.find();
    }
    createInfo(body:any){
        const newInfo = this.contactRepo.create(body)
        return this.contactRepo.save(newInfo);
    }
    async updateInfo(id:number, body:any){
        const infoUp = await this.contactRepo.findOne({
            where: {
                id: id
            }
        })
        if(body.email){
            infoUp.email = body.email;
        }
        if(body.phone){
            infoUp.phone = body.phone;
        }
        if(body.whatsapp){
            infoUp.whatsapp = body.whatsapp
        }
        const savedInfo = await this.contactRepo.save(infoUp);
        console.log('info guardada', savedInfo)

        return savedInfo
    }

    async contactMailer(body: any) {
        try {
          const emailStatus = await this.mailserv.contactMail(body);
          return emailStatus;
        } catch (error) {
          throw error; 
        }
      }


}
