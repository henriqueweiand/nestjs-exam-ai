import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, DeepPartial, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exam } from '../exam.entity';

@ObjectType()
@Entity()
export class Record {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Field(() => Exam)
  @ManyToOne(() => Exam, exam => exam.records, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'exam_id' })
  exam: Exam;

  @Field(() => String)
  @Column({ name: 'exam_id' })
  examId: string;

  @Field(() => String)
  @Column('varchar', { name: 'name' })
  name: string;

  @Field(() => String)
  @Column('varchar', { name: 'value' })
  value: string;

  @Field(() => String)
  @Column('varchar', { name: 'unit' })
  unit: string;

  @Field(() => String)
  @Column('varchar', { name: 'normal_range' })
  normalRange: string;

  @Field(() => String)
  @Column('varchar', { name: 'group' })
  group: string;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz', name: 'create_dtm' })
  createdDate?: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamptz', name: 'modify_dtm' })
  modifiedDate?: Date;

  constructor(entity: DeepPartial<Record>) {
    Object.assign(this, entity);
  }
}
