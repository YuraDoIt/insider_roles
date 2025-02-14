import { Module } from '@nestjs/common';
import { AuthServiceTsService } from './auth.service.ts.service';

@Module({
  providers: [AuthServiceTsService]
})
export class UsersModule {}
