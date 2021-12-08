import {
  LinkModel,
  PortModel,
  DefaultLinkModel,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";

import { SmartLinkFactory } from "./SmartLinkFactory";

export class SmartPortModel extends PortModel {
  constructor(options) {
    super({
      type: "smart-link",
      in: options.in,
      name: options.name,
    });
  }

  createLinkModel() {
    let factory = new SmartLinkFactory();
    return factory.generateModel({});
  }
}
