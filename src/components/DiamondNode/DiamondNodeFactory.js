import { DiamondNodeWidget } from "./DiamondNodeWidget";
import { DiamondNodeModel } from "./DiamondNodeModel";
import * as React from "react";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";

export class DiamondNodeFactory extends AbstractReactFactory {
  constructor() {
    super("diamond");
  }

  generateReactWidget(event) {
    return (
      <DiamondNodeWidget engine={this.engine} size={50} node={event.model} />
    );
  }

  generateModel(event) {
    return new DiamondNodeModel();
  }
}
