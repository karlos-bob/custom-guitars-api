import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CustomOrderController } from './custom-order.controller';
import { CustomOrderService } from './custom-order.service';

@Module({
  imports: [AuthModule],
  controllers: [CustomOrderController],
  providers: [CustomOrderService],
})
export class CustomOrderModule {}
