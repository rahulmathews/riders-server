import { join } from 'path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { HealthResolver } from './resolvers/health.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: process.env.NODE_ENV !== 'production',
      introspection: process.env.NODE_ENV !== 'production',
      context: ({ req }: { req: Record<string, unknown> }) => ({ req }),
      formatError: (error) => {
        // Remove stack trace in production
        if (process.env.NODE_ENV === 'production') {
          delete error.extensions?.stacktrace;
        }
        return error;
      },
    }),
  ],
  providers: [HealthResolver],
})
export class AppGraphQLModule {}
