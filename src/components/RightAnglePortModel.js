import {
  DefaultPortModel,
  RightAngleLinkModel,
} from "@projectstorm/react-diagrams";
export class RightAnglePortModel extends DefaultPortModel {
  createLinkModel(factory) {
    return new RightAngleLinkModel();
  }
}
