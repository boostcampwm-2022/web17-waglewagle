import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { Keyword } from './Keyword';
import { User } from './User';

@Entity('thread')
export class Thread extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'bigint' })
  id: string;

  @Column('varchar', { name: 'content', nullable: true, length: 5000 })
  content: string | null;

  @Column('bigint', { name: 'author_id', nullable: true })
  authorId: string | null;

  @Column('bigint', { name: 'keyword_id', nullable: true })
  keywordId: string | null;

  @Column('bigint', { name: 'parent_thread_id', nullable: true })
  parentThreadId: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date | null;

  @ManyToOne(() => Keyword, (keyword) => keyword.threads, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'keyword_id', referencedColumnName: 'id' }])
  keyword: Keyword;

  @ManyToOne(() => User, (user) => user.threads, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'author_id', referencedColumnName: 'id' }])
  author: User;

  @ManyToOne(() => Thread, (thread) => thread.threads, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'parent_thread_id', referencedColumnName: 'id' }])
  parentThread: Thread;

  @OneToMany(() => Thread, (thread) => thread.parentThread)
  threads: Thread[];
}
