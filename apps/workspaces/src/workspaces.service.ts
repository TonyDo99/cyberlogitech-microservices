import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { CreateWorkSpaceDto } from 'libs/common/dto/workspace/create-workspace.dto';
import {
  IMailParams,
  sendingMail,
  subjectMail,
} from 'libs/common/mail/sendingMail';
import { join } from 'path';
import { IWorkSpaceUseCase } from './usecase/workspace.interface';
import * as ejs from 'ejs';

@Injectable()
export class WorkSpacesService {
  constructor(
    @Inject(IWorkSpaceUseCase)
    private readonly workSpaceUseCase: IWorkSpaceUseCase,

    private readonly configService: ConfigService,
  ) {}

  async createWorkSpace(createWorkSpaceDto: CreateWorkSpaceDto) {
    const subject = await subjectMail(
      `Join the ${createWorkSpaceDto.hostWorkspace} Workspace ClickUp team?`,
    );

    const mailParams: IMailParams = {
      user: this.configService.get('MAIL_USER'),
      pass: this.configService.get('MAIL_PASSWORD'),
      subject,
      receivers: createWorkSpaceDto.invited,
      template: ejs.render(
        readFileSync(
          join(process.cwd(), 'libs/common', 'mail', 'template/invite.ejs'),
          {
            encoding: 'utf8',
          },
        ),
        {
          host: createWorkSpaceDto.hostWorkspace,
        },
      ),
    };

    sendingMail(mailParams);
    return await this.workSpaceUseCase.createWorkSpace(createWorkSpaceDto);
  }
}
