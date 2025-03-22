import { Field, ObjectType } from '@nestjs/graphql';
import { Record } from './record.entity';

@ObjectType()
export class RecordGroup {
  @Field(() => String)
  name: string;

  @Field(() => [Record])
  records: Record[];
}
