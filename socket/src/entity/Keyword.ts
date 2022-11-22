import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Community } from './Community';
import { KeywordUser } from './KeywordUser';
import { Thread } from './Thread';

@Index('UK3y3onjk6m272bw4dvh00eih8f', ['keyword', 'communityId'], {
  unique: true,
})
@Index('FK2ik49kpsr60x3lp4ffo4k23k1', ['authorId'], {})
@Entity('keyword')
export class Keyword {
  @Column('bigint', { primary: true, name: 'id' })
  id: string;

  @Column('varchar', { name: 'keyword', nullable: true, length: 255 })
  keyword: string | null;

  @Column('bigint', { name: 'author_id', nullable: true })
  authorId: string | null;

  @Column('bigint', { name: 'community_id', nullable: true })
  communityId: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date | null;

  @ManyToOne(() => User, (user) => user.keywords, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'author_id', referencedColumnName: 'id' }])
  author: User;

  @ManyToOne(() => Community, (community) => community.keywords, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'community_id', referencedColumnName: 'id' }])
  community: Community;

  @OneToMany(() => KeywordUser, (keywordUser) => keywordUser.keyword)
  keywordUsers: KeywordUser[];

  @OneToMany(() => Thread, (thread) => thread.keyword)
  threads: Thread[];
}
