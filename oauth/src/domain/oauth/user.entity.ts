import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEnum } from '../../enum/roll.enum';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'bigint' })
  id: string;

  @Column('varchar', { name: 'oauth_key', nullable: true, length: 255 })
  oauthKey: string | null;

  @Column('varchar', { name: 'oauth_method', length: 255 })
  oauthMethod: string;

  @Column('varchar', { name: 'profile_image_url', nullable: true, length: 255 })
  profileImageUrl: string | null;

  @Column('varchar', {
    name: 'username',
    unique: true,
    length: 255,
  })
  username: string | null;

  @Column('varchar', { name: 'role', nullable: false, default: () => RoleEnum.USER })
  role: string;

  @Column('varchar', { name: 'email' })
  email: string;

  @Column('datetime', {
    name: 'last_activity',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastActivity: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date | null;
}
