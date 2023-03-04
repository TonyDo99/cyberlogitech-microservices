import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

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

  // TODO Might be set this column become relation n - n with tb_mail_invite
  @Column({
    type: 'jsonb',
    array: false,
    default: [],
    comment: 'email members invited to workspace',
  })
  public readonly invites: string[];

  @Column({
    type: 'varchar',
    name: 'color for default avatar workspace',
    nullable: true,
  })
  public readonly color: string;

  @ManyToOne(() => UserEntity, (ref) => ref.workplaces)
  @JoinColumn({
    referencedColumnName: '_id',
  })
  public readonly hostWorkspace: UserEntity;
}
