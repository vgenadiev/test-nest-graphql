import { Injectable } from '@nestjs/common';
import { CreateOrUpdateUserInput } from './dto/user';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async findById(id: string): Promise<User> {
    return await this.repository.findById(id);
  }

  async createOrUpdate(
    submitedData: CreateOrUpdateUserInput,
  ): Promise<User | null> {
    return await this.repository.createOrUpdate(submitedData);
  }
  async findAll(): Promise<User[]> {
    return await this.repository.findAllItems();
  }

  async findItem(id: string): Promise<User> {
    return await this.repository.findById(id);
  }

  async remove(id: string): Promise<User> {
    const item = await this.repository.findById(id);
    if (!item) {
      return null;
    }
    await this.repository.delete(id);

    return item;
  }
}
