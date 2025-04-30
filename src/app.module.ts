import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Article } from './articles/entities/article.entity';
import { ArticlesModule } from './articles/articles.module';

@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      TypeOrmModule.forRoot({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        synchronize: true,
        autoLoadEntities: true,
        entities: [Article],
        ssl: {
          rejectUnauthorized: false, // required for Neon
        },
      }),

      ArticlesModule
    ],
  controllers: [],
  providers: [],
})

export class AppModule {}
