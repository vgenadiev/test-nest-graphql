import { createUnionType } from '@nestjs/graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './entities/user.entity';

@ObjectType()
export class UserNotFound {
  constructor(partial?: Partial<UserNotFound>) {
    Object.assign(this, partial);
  }

  @Field(() => String)
  itemIdentifier: string;

  @Field(() => String)
  itemType?: string;
}

export const UserNotFoundResponseUnion = createUnionType({
  name: 'UserNotFoundResponseUnion',
  types: () => [User, UserNotFound],
});
