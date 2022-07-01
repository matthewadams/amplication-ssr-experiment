import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ThingService } from "./thing.service";
import { ThingControllerBase } from "./base/thing.controller.base";

@swagger.ApiTags("things")
@common.Controller("things")
export class ThingController extends ThingControllerBase {
  constructor(
    protected readonly service: ThingService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
