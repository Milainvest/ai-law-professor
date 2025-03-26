import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { LegalDocument } from './legal-document.entity.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  hashedPassword: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'enum', enum: ['student', 'professor', 'admin'], default: 'student' })
  role: 'student' | 'professor' | 'admin';

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => LegalDocument, document => document.user)
  documents: LegalDocument[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt: Date;
}
