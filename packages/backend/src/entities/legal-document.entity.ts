import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('legal_documents')
export class LegalDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column('text', { array: true, nullable: true })
  tags: string[];

  @Column('text')
  documentType: 'case' | 'statute' | 'article';

  @Column('simple-array', { nullable: true })
  citations: string[];

  @Column('decimal', { array: true, nullable: true })
  embedding: number[];

  @ManyToOne(() => User, user => user.documents)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastAccessedAt: Date;

  @Column('jsonb', { nullable: true })
  metadata: {
    jurisdiction?: string;
    year?: number;
    court?: string;
    importance?: number;
  };
}
