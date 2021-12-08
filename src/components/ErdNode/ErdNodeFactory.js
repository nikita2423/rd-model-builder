import * as React from "react";
import { ErdNodeModel } from "./ErdNodeModel";
import ErdNodeWidget from "./ErdNodeWidget";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";

export class ErdFactory extends AbstractReactFactory {
  // props;
  constructor(props) {
    super("table");
    // this.props = props;
  }

  generateModel(initialConfig) {
    return new ErdNodeModel();
  }

  generateReactWidget(event) {
    return (
      <ErdNodeWidget
        // table={this.props}
        engine={this.engine}
        node={event.model}
      />
    );
  }
}
