import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { about } from 'src/entities/about.entity';

@Injectable()
export class AboutService {
    constructor(
        @InjectRepository(about) private aboutRepo: Repository<about> ){}

        getAll(){
            return this.aboutRepo.find();
        }

        getLanguageAbout(language: string){
            let actualLang = ""
            if(language === "false"){
                actualLang = 'EN'
            }else{
                actualLang = 'ES'
            }
            return this.aboutRepo.find({
                where:
                { language: actualLang}
            })
        }
        createAbout(body: any){
            const newAbout = this.aboutRepo.create(body)            
            return this.aboutRepo.save(newAbout);
        }

        async updateAbout(id: string , body: any){
            const newId = parseInt(id,10)
            const aboutExist = await this.aboutRepo.update(newId, body)
            
            if(aboutExist.affected === 0 ){                
                throw new NotFoundException(`About with id ${id} not found`);
                 
            }
            return this.aboutRepo.findOne({where:{id:newId}})

        }

}
