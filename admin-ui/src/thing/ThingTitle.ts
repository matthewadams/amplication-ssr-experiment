import { Thing as TThing } from "../api/thing/Thing";

export const THING_TITLE_FIELD = "name";

export const ThingTitle = (record: TThing): string => {
  return record.name || record.id;
};
