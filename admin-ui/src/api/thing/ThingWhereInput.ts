import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type ThingWhereInput = {
  id?: StringFilter;
  name?: StringNullableFilter;
};
