import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UserNotFound, UserNotFoundResponseUnion } from './responses';
import { UsersService } from './users.service';
import { CreateOrUpdateUserInput } from './dto/user';
import { User } from './entities/user.entity';
import { PubsubService } from '../subscriptions.module';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly service: UsersService,
    private readonly _pubSubService: PubsubService,
  ) {}

  @Mutation(() => UserNotFoundResponseUnion)
  async createOrUpdateUser(@Args('input') data: CreateOrUpdateUserInput) {
    const item = await this.service.createOrUpdate(data);

    if (!item) {
      return new UserNotFound({ itemIdentifier: data.id });
    }

    this._pubSubService.publish('userAdded', { userAdded: item });

    return item;
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.service.findAll();
  }

  @Query(() => UserNotFoundResponseUnion, { name: 'user' })
  async findItem(@Args('id', { type: () => String }) id: string) {
    const item = await this.service.findItem(id);
    if (!item) {
      return new UserNotFound({ itemIdentifier: id });
    }

    return item;
  }

  @Mutation(() => UserNotFoundResponseUnion, { name: 'removeUser' })
  async removeUser(@Args('id', { type: () => String }) id: string) {
    const item = await this.service.remove(id);
    if (!item) {
      return new UserNotFound({ itemIdentifier: id });
    }

    return item;
  }

  @Subscription(() => User, { nullable: true })
  userAdded() {
    return this._pubSubService.asyncIterator('userAdded');
  }
}
