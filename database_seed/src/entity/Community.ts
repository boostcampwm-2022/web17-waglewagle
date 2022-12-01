import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { CommunityUser } from './CommunityUser';
import { Keyword } from './Keyword';
import { KeywordUser } from './KeywordUser';

@Entity('community')
export class Community extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'bigint' })
  id: string;

  @Column('varchar', { name: 'summary', nullable: true, length: 1000 })
  summary: string | null;

  @Column('varchar', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @Column('bigint', { name: 'user_id', nullable: true })
  userId: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date | null;

  @ManyToOne(() => User, (user) => user.communities, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => CommunityUser, (communityUser) => communityUser.community)
  communityUsers: CommunityUser[];

  @OneToMany(() => Keyword, (keyword) => keyword.community)
  keywords: Keyword[];

  @OneToMany(() => KeywordUser, (keywordUser) => keywordUser.community)
  keywordUsers: KeywordUser[];
}
