import {
  LinkModel,
  PortModel,
  DefaultLinkModel,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";

import { SmartLinkFactory } from "../SmartLink/SmartLinkFactory";

export class DiamondPortModel extends PortModel {
  constructor(alignment) {
    super({
      type: "diamond",
      name: alignment,
      alignment: alignment,
    });
  }

  createLinkModel() {
    let factory = new SmartLinkFactory();
    return factory.generateModel({});
  }
}
