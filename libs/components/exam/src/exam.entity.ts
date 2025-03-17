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
  })
  records: Record[];

  @Field(() => String)
  @Column('varchar', { length: 60, name: 'file_url' })
  file_url: string;

  @Field(() => String)
  @Column('varchar', { length: 60, name: 'file_checksum' })
  file_checksum: string;

  @Field(() => String)
  @Column('text', { name: 'summary' })
  summary: string;

  @Field(() => String)
  @Column('text', { name: 'recommendations' })
  recommendations: string;

  @Field(() => Date)
  @CreateDateColumn({ type: 'date', name: 'collected_date' })
  collectedDate: Date;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz', name: 'create_dtm' })
  createdDate?: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamptz', name: 'modify_dtm' })
  modifiedDate?: Date;

  constructor(entity: DeepPartial<Exam>) {
    Object.assign(this, entity);
  }
}
