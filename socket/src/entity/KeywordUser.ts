import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Community } from './Community';
import { Keyword } from './Keyword';
import { User } from './User';

@Index('FKde4ofvrnhohtcvb1yaag3doct', ['communityId'], {})
@Index('FKlqjerts6c6lcml0n06053x3ls', ['keywordId'], {})
@Index('FKnifacyv4qur5wp3nyj8ykb6gs', ['userId'], {})
@Entity('keyword_user')
export class KeywordUser {
  @Column('bigint', { primary: true, name: 'id' })
  id: string;

  @Column('bigint', { name: 'community_id', nullable: true })
  communityId: string | null;

  @Column('bigint', { name: 'keyword_id', nullable: true })
  keywordId: string | null;

  @Column('bigint', { name: 'user_id', nullable: true })
  userId: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date | null;

  @ManyToOne(() => Community, (community) => community.keywordUsers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'community_id', referencedColumnName: 'id' }])
  community: Community;

  @ManyToOne(() => Keyword, (keyword) => keyword.keywordUsers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'keyword_id', referencedColumnName: 'id' }])
  keyword: Keyword;

  @ManyToOne(() => User, (user) => user.keywordUsers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
