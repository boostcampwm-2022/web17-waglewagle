import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Community } from './Community';
import { User } from './User';

@Entity('community_user')
export class CommunityUser extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'bigint' })
  id: string;

  @Column('varchar', { name: 'profile_image_url', nullable: true, length: 255 })
  profileImageUrl: string | null;

  @Column('varchar', {
    name: 'community_username',
    nullable: true,
    length: 255,
  })
  communityUsername: string | null;

  @Column('boolean', { name: 'is_first_visit', nullable: false, default: true })
  isFirstVisit: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date | null;

  @Column('bigint', { name: 'community_id', nullable: true })
  communityId: string | null;

  @Column('bigint', { name: 'user_id', nullable: true })
  userId: string | null;

  @ManyToOne(() => Community, (community) => community.communityUsers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'community_id', referencedColumnName: 'id' }])
  community: Community;

  @ManyToOne(() => User, (user) => user.communityUsers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
