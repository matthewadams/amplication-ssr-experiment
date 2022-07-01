import { ThingWhereUniqueInput } from "./ThingWhereUniqueInput";
import { ThingUpdateInput } from "./ThingUpdateInput";

export type UpdateThingArgs = {
  where: ThingWhereUniqueInput;
  data: ThingUpdateInput;
};
