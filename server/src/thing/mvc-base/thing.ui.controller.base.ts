import * as common from "@nestjs/common";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import {isRecordNotFoundError} from "../../prisma.util";
import * as errors from "../../errors";
import {Request, Response} from "express";
import {plainToClass} from "class-transformer";
import {ApiNestedQuery} from "../../decorators/api-nested-query.decorator";
import {ThingService} from "../thing.service";
import {AclValidateRequestInterceptor} from "../../interceptors/aclValidateRequest.interceptor";
import {AclFilterResponseInterceptor} from "../../interceptors/aclFilterResponse.interceptor";
import {ThingCreateInput} from "../base/ThingCreateInput";
import {ThingWhereInput} from "../base/ThingWhereInput";
import {ThingWhereUniqueInput} from "../base/ThingWhereUniqueInput";
import {ThingFindManyArgs} from "../base/ThingFindManyArgs";
import {ThingUpdateInput} from "../base/ThingUpdateInput";
import {Thing} from "../base/Thing";
import {Render, Res} from "@nestjs/common";
import {ThingCreateFault} from "./ThingCreateFault";

// TODO: mount this controller on '/ui/things'; currently only accessible at '/api/things/ui/things'

// @common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class ThingUiControllerBase {
  constructor(
    protected readonly service: ThingService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
  }

  // @common.UseInterceptors(AclValidateRequestInterceptor)
  // @nestAccessControl.UseRoles({
  //   resource: "Thing",
  //   action: "create",
  //   possession: "any",
  // })
  @common.Post('ui/things')
  async create(@common.Body() data: ThingCreateInput, @Res() res: Response) {
    // redirect after post:
    //  on success: redirect to GET /things/{id}?created=true
    //  on error: redirect to GET /things?editable=true&data=<urlEncodedJsonOfThing>
    let it
    try {
      it = await this.service.create({
        data: data,
        select: {
          createdAt: true,
          id: true,
          name: true,
          updatedAt: true,
        },
      });
      res.redirect(`/ui/things/${it.id}?created=true`)
    } catch (e) {
      console.error(e.message)
      res.redirect(`/ui/things/new?data=${encodeURI(JSON.stringify(data))}`)
    }
  }

  // @common.UseInterceptors(AclValidateRequestInterceptor)
  // @nestAccessControl.UseRoles({
  //   resource: "Thing",
  //   action: "create",
  //   possession: "any",
  // })
  @common.Post('ui/things/:id/deletions')
  async delete(
    @Res() res: Response,
    @common.Param() params: ThingWhereUniqueInput,
    @common.Query('on-success') onSuccess?: string,
    @common.Query('on-failure') onFailure?: string
  ) {
    // redirect after post:
    //  on success: redirect to GET ${onSuccess} || /ui/things?id=${id}&deleted=true
    //  on error: redirect to GET ${onFailure} || /ui/things/${id}&deleted=false&fault=...
    let it
    try {
      it = await this.service.delete({where: params})
      res.redirect(onSuccess || `/ui/things/${it.id}?deleted=true`)
    } catch (e) {
      console.error(e.message)
      // TODO: support idempotent deletion -- if it was already deleted, consider that success
      res.redirect(onFailure || `/ui/things/${params.id}?deleted=false&fault=${encodeURI(JSON.stringify(e))}`)
    }
  }

  // @common.UseInterceptors(AclFilterResponseInterceptor)
  // @nestAccessControl.UseRoles({
  //   resource: "Thing",
  //   action: "read",
  //   possession: "any",
  // })
  @common.Get('ui/things')
  @ApiNestedQuery(ThingFindManyArgs)
  @Render('things/things')
  async findMany(@common.Req() request: Request): Promise<Thing[]> {
    const args = plainToClass(ThingFindManyArgs, request.query);
    return this.service.findMany({
      ...args,
      select: {
        createdAt: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
  }

  // @common.UseInterceptors(AclFilterResponseInterceptor)
  // @nestAccessControl.UseRoles({
  //   resource: "Thing",
  //   action: "read",
  //   possession: "own",
  // })
  @common.Get("ui/things/:id")
  @Render('things/thing')
  async findOne(@common.Param() params: ThingWhereUniqueInput,): Promise<Thing | null> {
    switch (params.id) {
      case 'new':
        // TODO: render form with appropriate defaults with action of POST /things
        return null
    }

    const result = await this.service.findOne({
      where: params,
      select: {
        createdAt: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }
}
