import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateOrUpdateUserInput } from './dto/user';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async findById(id: string): Promise<User> {
    return await this.findOne({
      where: {
        id,
      },
    });
  }

  public async findUsersByNames(names: string[]): Promise<User[]> {
    return await this.find({
      where: { name: In(names) },
    });
  }

  public async findAllItems(): Promise<User[]> {
    return await this.find({ order: { name: 'ASC' } });
  }

  public async createOrUpdate(
    data: CreateOrUpdateUserInput,
  ): Promise<User | null> {
    const { id, ...rest } = data;
    let user: User;
    if (id) {
      const item = await this.findOne({ where: { id } });
      if (!item) {
        return null;
      }
      user = await this.create({
        ...item,
        ...rest,
      });
    } else {
      user = await this.create({
        ...rest,
      });
    }

    return await this.save(user);
  }
}
