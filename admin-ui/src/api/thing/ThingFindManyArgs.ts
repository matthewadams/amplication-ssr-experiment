import { ThingWhereInput } from "./ThingWhereInput";
import { ThingOrderByInput } from "./ThingOrderByInput";

export type ThingFindManyArgs = {
  where?: ThingWhereInput;
  orderBy?: Array<ThingOrderByInput>;
  skip?: number;
  take?: number;
};
