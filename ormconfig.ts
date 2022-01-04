import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'usetup',
  entities: ['dist/**/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: ['dist/migration/*.ts'],
  cli: {
    migrationsDir: 'src/database/migration',
  },
};

export default config;
