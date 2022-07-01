import { Module } from "@nestjs/common";
import { ThingModuleBase } from "./base/thing.module.base";
import { ThingService } from "./thing.service";
import { ThingController } from "./thing.controller";
import { ThingResolver } from "./thing.resolver";

@Module({
  imports: [ThingModuleBase],
  controllers: [ThingController],
  providers: [ThingService, ThingResolver],
  exports: [ThingService],
})
export class ThingModule {}
