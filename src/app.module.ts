import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [OrdersModule, UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_host,
    port: process.env.DB_port ? + process.env.DB_port : 5433,
    username: 'postgres',
    password: '12345',
    database: 'roles',
    entities: [],
    synchronize: true,
    migrationsRun: true,
    logging: true,
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
