import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { AboutService } from '../services/about.service';

@Controller('about')
export class AboutController {
    constructor(
        private aboutService: AboutService
    ){}
    
    @Get('/all')
    getAll(){
        return this.aboutService.getAll();
    }
    @Get('/:language')
    getByLang(@Param('language') language: string){
        return this.aboutService.getLanguageAbout(language);
    }
    @Post('/create')
    newAbout(@Body('body') body: any){
        return this.aboutService.createAbout(body);
    }
    @Put('/update/:id')
    upAbout(@Param('id') id: number, @Body()  body:any){
        return this.aboutService.updateAbout(id,body)
    }

}
