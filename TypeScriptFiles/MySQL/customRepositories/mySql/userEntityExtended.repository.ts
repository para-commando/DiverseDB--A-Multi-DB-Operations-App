// helps to extend the base model with custom methods/functionality
import { MysqlDataSource } from '../../Configs/mySqlOrmConfig';
import { User } from '../../entities/mySql/entity';
export const UserRepository = MysqlDataSource.getRepository(User).extend({
  findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder('user')
      .where('user.firstName = :firstName', { firstName })
      .andWhere('user.lastName = :lastName', { lastName })
      .getMany();
  },
});


