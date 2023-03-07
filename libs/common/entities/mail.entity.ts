import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkspaceEntity } from './workspace.entity';

export enum STATUS_SENT {
  SUCCESS = 'success',
  FAILED = 'failed',
  PENDING = 'pending',
}

@Entity({ name: 'tb_mail' })
export class MailEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly _id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: 'Invited email address',
  })
  public readonly invited: string;

  @Column({
    type: 'varchar',
    enum: STATUS_SENT,
    default: STATUS_SENT.PENDING,
    comment: 'Status sending email',
  })
  public readonly status: STATUS_SENT;

  @CreateDateColumn()
  public readonly createdDate: Date | string;

  @UpdateDateColumn()
  public readonly updatedDate: Date | string;

  @ManyToOne(() => WorkspaceEntity, (ref) => ref.invitedMail)
  @JoinColumn({
    referencedColumnName: '_id',
  })
  public readonly workspace_id: WorkspaceEntity;
}
