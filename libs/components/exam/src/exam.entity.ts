import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, DeepPartial, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Record } from './record/record.entity';

@ObjectType()
@Entity()
export class Exam {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Field(() => [Record])
  @OneToMany(() => Record, record => record.exam, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  records: Record[];

  @Field(() => String)
  @Column('varchar', { length: 32, name: 'user_id' })
  userId: string;

  @Field(() => String)
  @Column('varchar', { length: 200, name: 'file_url' })
  file_url: string;

  @Field(() => String)
  @Column('varchar', { length: 200, name: 'file_checksum' })
  file_checksum: string;

  @Field(() => String)
  @Column('varchar', { length: 60, name: 'external_file_id', nullable: true })
  external_file_id?: string;

  @Field(() => String)
  @Column('text', { name: 'summary' })
  summary: string;

  @Field(() => String)
  @Column('text', { name: 'recommendations' })
  recommendations: string;

  @Field(() => String) // Changed from Date to String for proper serialization
  @Column({ type: 'date', name: 'collected_date', nullable: true })
  collectedDate?: Date;

  @Field(() => String) // Changed from Date to String for proper serialization
  @CreateDateColumn({ type: 'timestamptz', name: 'create_dtm' })
  createdDate?: Date;

  @Field(() => String) // Changed from Date to String for proper serialization
  @UpdateDateColumn({ type: 'timestamptz', name: 'modify_dtm' })
  modifiedDate?: Date;

  constructor(entity: DeepPartial<Exam>) {
    Object.assign(this, entity);
  }
}
