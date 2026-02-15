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
                language: actualLanguage,
                visible: true
            }
        });
    }
    create(body: any){
        const newProject = this.projectRepo.create(body);
        return this.projectRepo.save(newProject);
    }
    async updateProject(id: string, body: any){
        const intId = parseInt(id, 10);
        console.log("body", body)
        const projectUp = await this.projectRepo.findOne({
            where: {
                id: intId
            }
        })
        if (body.name !== undefined) {
            projectUp.name = body.name;
        }

        if (body.description !== undefined) {
            projectUp.description = body.description;
        }

        if (body.video !== undefined) {
            projectUp.video = body.video;
            }

        if (body.links !== undefined) {
            projectUp.links = body.links;
        }
        if (body.visible !== projectUp.visible){
            projectUp.visible = body.visible
        }

        const savedProject = await this.projectRepo.save(projectUp);

        

        return savedProject;
    }
    async deleteProject(id: number){
        await this.projectRepo.delete(id)
        return 'Deleted Succefull';
    }

}
