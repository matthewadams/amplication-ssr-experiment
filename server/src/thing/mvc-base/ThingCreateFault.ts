import {ThingCreateInput} from "../base/ThingCreateInput";

class ThingCreateFault {
  data: ThingCreateInput
  objectReasons: any // Array<String>, reasons applying to input as a whole
  propertyReasons: any // { [propertyName]: String } reason for each offending property

  constructor(data: ThingCreateInput, objectReasons: Array<String> = [], propertyReasons: Array<String> = []) {
    this.data = data
    this.objectReasons = objectReasons
    this.propertyReasons = propertyReasons
  }
}

export {ThingCreateFault}
