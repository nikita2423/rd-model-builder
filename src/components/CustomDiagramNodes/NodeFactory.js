import * as React from "react";
import { NodeModel } from "./NodeModel";
import { NodeWidget } from "./NodeWidget";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";

export class NodeFactory extends AbstractReactFactory {
  constructor() {
    super("ts-custom-node");
  }

  generateModel(initialConfig) {
    return new NodeModel();
  }

  generateReactWidget(event) {
    return <NodeWidget engine={this.engine} node={event.model} />;
  }
}
