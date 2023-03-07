import { Inject, Injectable } from '@nestjs/common';
import * as sendGrid from '@sendgrid/mail';
import { CreateWorkSpaceDto } from 'libs/common/dto/workspace/create-workspace.dto';
import { IWorkSpaceUseCase } from './usecase/workspace.interface';

@Injectable()
export class WorkSpacesService {
  constructor(
    @Inject(IWorkSpaceUseCase)
    private readonly workSpaceUseCase: IWorkSpaceUseCase,
  ) {}

  async createWorkSpace(createWorkSpaceDto: CreateWorkSpaceDto) {
    this.sendingMail(createWorkSpaceDto.invited);
    return await this.workSpaceUseCase.createWorkSpace(createWorkSpaceDto);
  }

  sendingMail(invites: string[]) {
    const msg: sendGrid.MailDataRequired = {
      to: invites, // Change to your recipient
      from: 'dotanphat20@gmail.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sendGrid
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
