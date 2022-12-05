import { RoleEnum } from './../enum/role.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Community } from './Community';
import { CommunityUser } from './CommunityUser';
import { Keyword } from './Keyword';
import { KeywordUser } from './KeywordUser';
import { Thread } from './Thread';

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

  @Column('datetime', {
    name: 'last_activity',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastActivity: Date;

  @Column('varchar', { name: 'email' })
  email: string;

  @Column('varchar', { name: 'role', nullable: false, default: () => RoleEnum.USER })
  role: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date | null;

  @OneToMany(() => Community, (community) => community.user)
  communities: Community[];

  @OneToMany(() => CommunityUser, (communityUser) => communityUser.user)
  communityUsers: CommunityUser[];

  @OneToMany(() => Keyword, (keyword) => keyword.author)
  keywords: Keyword[];

  @OneToMany(() => KeywordUser, (keywordUser) => keywordUser.user)
  keywordUsers: KeywordUser[];

  @OneToMany(() => Thread, (thread) => thread.author)
  threads: Thread[];
}
