import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import {ThingService} from "./thing.service";
import {ThingUiControllerBase} from "./mvc-base/thing.ui.controller.base";

@swagger.ApiTags("things")
@common.Controller("things")
export class ThingUiController extends ThingUiControllerBase {
  constructor(
    protected readonly service: ThingService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
