import { RpcException } from '@nestjs/microservices';
import * as nodemailer from 'nodemailer';

export interface IMailParams {
  user: string;
  pass: string;
  template: string;
  receivers: string | string[];
  subject: string;
}

export const subjectMail = (text: string): Promise<string> =>
  new Promise((resolve) => resolve(text));

export const sendingMail = async ({
  user,
  pass,
  subject,
  receivers,
  template,
}: IMailParams) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
    });

    const info = await transporter.sendMail({
      from: user,
      to: receivers,
      subject,
      html: template,
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  } catch (error) {
    throw new RpcException(error);
  }
};
