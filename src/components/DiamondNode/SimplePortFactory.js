import { DiagramEngine, PortModel } from "@projectstorm/react-diagrams";
import { AbstractModelFactory } from "@projectstorm/react-canvas-core";

export class SimplePortFactory extends AbstractModelFactory {
  cb;

  constructor(type, cb) {
    super(type);
    this.cb = cb;
  }

  generateModel(event) {
    return this.cb(event.initialConfig);
  }
}
