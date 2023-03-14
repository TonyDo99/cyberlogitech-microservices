import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkspaceEntity } from './workspace.entity';

@Entity({ name: 'tb_user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly _id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    comment: 'email of user',
  })
  public readonly email: string;

  @Exclude()
  @Column({
    type: 'varchar',
    nullable: false,
    comment: 'password of user',
  })
  public readonly password: string;

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
    comment: 'refreshtoken',
  })
  public readonly refreshToken: string;

  @CreateDateColumn()
  public readonly createdDate: Date | string;

  @UpdateDateColumn()
  public readonly updatedDate: Date | string;

  @OneToMany(() => WorkspaceEntity, (ref) => ref.hostWorkspace)
  public readonly workplaces: WorkspaceEntity[];
}
