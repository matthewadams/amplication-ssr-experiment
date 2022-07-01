import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ThingServiceBase } from "./base/thing.service.base";

@Injectable()
export class ThingService extends ThingServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
