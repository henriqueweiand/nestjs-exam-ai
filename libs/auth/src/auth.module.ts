import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { ClerkClientProvider } from './clerk/clerk-client.provider';
import { ClerkStrategy } from './clerk/clerk.strategy';

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [ClerkStrategy, ClerkClientProvider],
  exports: [PassportModule, ClerkClientProvider],
})
export class AuthModule {}
