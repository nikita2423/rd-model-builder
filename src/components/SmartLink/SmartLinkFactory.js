import { DefaultLinkFactory } from "@projectstorm/react-diagrams-defaults";
import { PathFindingLinkModel } from "@projectstorm/react-diagrams-routing";
// import { CustomDefaultLinkModel } from "../../links/CustomDefaultLinkModel";
// import { ListenerHandle } from "@projectstorm/react-canvas-core";

export class SmartLinkFactory extends DefaultLinkFactory {
  static NAME = "custom-default-factory";
  listener;

  constructor() {
    super(SmartLinkFactory.NAME);
  }

  generateModel(event) {
    return new PathFindingLinkModel();
  }
}
