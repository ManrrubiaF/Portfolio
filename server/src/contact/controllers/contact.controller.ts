import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express'
import { ContactService } from '../services/contact.service';

@Controller('contact')
export class ContactController {
    constructor(
        private contactService: ContactService
    ) { }


    @Get()
    getContactInfo() {
        return this.contactService.getInfo();
    }
    @Post('mail')
    async sendMail(@Res() res: Response, @Body() body: any) {
        try {
            const emailStatus = await this.contactService.contactMailer(body);
            return res.send(emailStatus);
        } catch (error) {
            return res.status(500).send({ error: error.message }); // Maneja los errores adecuadamente
        }
    }
    @Patch('/:id')
    update(@Body() body: any, @Param('id') id:number){
        return this.contactService.updateInfo(id, body)
    }
    

}
