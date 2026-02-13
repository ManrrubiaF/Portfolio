import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { projects } from 'src/entities/projects.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(projects) private projectRepo: Repository<projects>
    ){}
    getAll(language: string){
        let actualLanguage = "";
        if(language === "false"){
            actualLanguage = "EN"
        }else{
            actualLanguage = "ES"
        }

        return this.projectRepo.find({
            where:{
                language: actualLanguage
            }
        });
    }
    create(body: any){
        const newProject = this.projectRepo.create(body);
        return this.projectRepo.save(newProject);
    }
    async updateProject(id: string, body: any){
        const intId = ParseInt(id)
        const projectUp = await this.projectRepo.findOne({
            where: {
                id: intId
            }
        })
        if(body.name){
            projectUp.name = body.name;
        }
        if(body.description){
            projectUp.description = body.description;
        }
        if(body.video){
            projectUp.video = body.video;
        }
        console.log("link",body.links)
        if(body.links){
            projectUp.links = [...body.links];
        }

        const savedProject = await this.projectRepo.save(projectUp);
        

        return savedProject;
    }
    async deleteProject(id: number){
        await this.projectRepo.delete(id)
        return 'Deleted Succefull';
    }

}
