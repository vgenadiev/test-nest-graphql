import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { SubscriptionsModule } from '../subscriptions.module';

@Module({
  imports: [SubscriptionsModule],
  controllers: [UsersController],
  providers: [UsersResolver, UsersService, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
