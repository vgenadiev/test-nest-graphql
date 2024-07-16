import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrUpdateUserInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  name: string;
}
