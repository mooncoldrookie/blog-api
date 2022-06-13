import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import SysConfig from "../../../../entities/admin/sys-config.entity";

@Module({
  imports:[TypeOrmModule.forFeature([SysConfig])],
  controllers: [SettingsController],
  providers: [SettingsService]
})
export class SettingsModule {}
