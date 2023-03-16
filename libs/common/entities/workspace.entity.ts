import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { MailEntity } from './mail.entity';

@Entity({ name: 'tb_workspace' })
export class WorkspaceEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly _id: string;

  @Column({ type: 'varchar', nullable: false, comment: 'name of workspace' })
  public readonly workspaceName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: 'avatar workspace',
  })
  public readonly avatar: string;

  @Column({
    type: 'int',
    default: 1,
    comment: 'groups members in workspace',
  })
  public readonly members: number;

  @Column({
    type: 'varchar',
    name: 'color for default avatar workspace',
    nullable: true,
  })
  public readonly color: string;

  @CreateDateColumn()
  public readonly createdDate: Date | string;

  @UpdateDateColumn()
  public readonly updatedDate: Date | string;

  @OneToMany(() => MailEntity, (ref) => ref.workspace_id, {
    cascade: true,
  })
  public readonly invitedMail: MailEntity[];

  @ManyToOne(() => UserEntity, (ref) => ref.workplaces, {
    cascade: true,
  })
  @JoinColumn({
    referencedColumnName: '_id',
  })
  public readonly hostWorkspace: UserEntity;
}
