import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import config from './config/keys'
import { UserModule } from './user/user.module';
import { TodoModule } from './todos/todos.module';
@Module({
  imports: [MongooseModule.forRoot(config.mongoUrl, {
    useFindAndModify:false,useUnifiedTopology:true,useNewUrlParser:true
  }),
  GraphQLModule.forRoot({
    autoSchemaFile:'src/schema.gql'
  }),
  UserModule,
  TodoModule 
  ],
  controllers: [AppController ],
  providers:[AppService]
})
export class AppModule {}
