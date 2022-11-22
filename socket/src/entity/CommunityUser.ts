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
import { User } from './User';

@Index('FK4b48vumvac983v91mjyg6703c', ['communityId'], {})
@Index('FKsc11b5rx1kpf1n7lfl2j3x33v', ['userId'], {})
@Entity('community_user')
export class CommunityUser {
  @Column('bigint', { primary: true, name: 'id' })
  id: string;

  @Column('varchar', { name: 'profile_image_url', nullable: true, length: 255 })
  profileImageUrl: string | null;

  @Column('varchar', {
    name: 'community_username',
    nullable: true,
    length: 255,
  })
  communityUsername: string | null;

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
