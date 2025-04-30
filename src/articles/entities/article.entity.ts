import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'articles', schema: 'content' })
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ nullable: true })
  author?: string;

  @Column('text', { array: true, nullable: true })
  tags?: string[];

  @CreateDateColumn()
  createdAt: Date;
}
