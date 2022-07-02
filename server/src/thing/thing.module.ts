import {Module} from "@nestjs/common";
import {ThingModuleBase} from "./base/thing.module.base";
import {ThingService} from "./thing.service";
import {ThingController} from "./thing.controller";
import {ThingUiController} from "./thing.ui.controller";
import {ThingResolver} from "./thing.resolver";

@Module({
  imports: [ThingModuleBase],
  controllers: [ThingController, ThingUiController],
  providers: [ThingService, ThingResolver],
  exports: [ThingService],
})
export class ThingModule {
}
