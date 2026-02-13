import { Controller, Get, Post, Body,  Param, Patch } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';


@Controller('projects')
export class ProjectsController {
    constructor(
        private projectServ: ProjectsService
    ){}

    @Get('/:language')
    getProjects(@Param('language') language:string){
        return this.projectServ.getAll(language);
    }

    @Post()
    postProject(@Body() body:any){
        return this.projectServ.create(body)
    }
    @Patch('/:id')
    update(@Body() body:any, @Param('id') id:string){
        console.log(`ID: ${id}, Body: ${JSON.stringify(body)}`, 'ProjectController');
        return this.projectServ.updateProject(id, body)
    }
}
