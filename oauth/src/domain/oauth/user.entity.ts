import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
    nullable: true,
    unique: true,
    length: 255,
  })
  username: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date | null;
}
