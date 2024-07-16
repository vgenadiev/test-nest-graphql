import { PubSub } from 'graphql-subscriptions';
import { Injectable, Module } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';

@Injectable()
export abstract class PubsubService extends PubSubEngine {}

export const PUB_SUB: symbol = Symbol('PUB_SUB');

@Module({
  imports: [],
  providers: [
    {
      provide: PUB_SUB,
      useFactory: () => {
        return new PubSub();
      },
      inject: [],
    },
    {
      provide: PubsubService,
      useFactory: (pubsub) => pubsub,
      inject: [PUB_SUB],
    },
  ],
  exports: [PubsubService],
})
export class SubscriptionsModule {}
