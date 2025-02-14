// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// import { User } from '../entity/user.entity';
// import * as jwt from 'jsonwebtoken';

// interface userFromJwt {
//   id: number;
//   email: string;
//   name: string;
//   iat: number;
//   exp: number;
// }

// @Injectable()
// export class GqlAuthGuard implements CanActivate {
//   constructor(@InjectRepository(User) private user: Repository<User>) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const ctx = GqlExecutionContext.create(context);

//     const validAcessToken = ctx.getContext().req.headers.authorization.toString().split(' ')[1];
//     if (!validAcessToken) {
//       throw new Error('No acess token');
//     }

//     const inputJwtUser = <userFromJwt>jwt.verify(validAcessToken, 'my-secret');
//     // console.log(inputJwtUser.email + ' ' + inputJwtUser.name);
//     const curUserFromDB = await this.user.findOne({ email: inputJwtUser.email });
//     // console.log(curUser.email);
//     console.log(inputJwtUser.email + ' ' + curUserFromDB.email);
//     console.log(inputJwtUser.exp);
//     console.log(inputJwtUser.iat);

//     if (curUserFromDB.email != inputJwtUser.email) {
//       return false;
//     } else {
//       return true;
//     }
//   }

//   async getCurrentUser(email: string) {
//     return this.user.find({ email: email });
//   }
// }
