import {
  NodeModel as StormNodeModel,
  DefaultPortModel,
  RightAngleLinkModel,
} from "@projectstorm/react-diagrams";

import { RightAnglePortModel } from "../RightAnglePortModel";
import { SmartPortModel } from "../SmartLink/SmartPortModel";

// export interface NodeModelOptions extends BaseModelOptions {
//   color?: string;
//   title?: string;
//   content?: string;
//   source?: boolean;
//   inputs?: string[];
//   outputs?: string[];
// }

export class NodeModel extends StormNodeModel {
  // color: string;
  // title: string;
  // content: string | undefined;
  // source: boolean;
  // inputs: string[];
  // outputs: string[];

  constructor(options) {
    super({
      ...options,
      type: "ts-custom-node",
    });
    console.log("Options", options);
    this.options.color = options?.color || "White";
    this.options.title = options?.title || "Node";
    this.options.content = options?.content || undefined;
    this.options.source = options?.source || false;
    this.options.inputs = options?.inputs || [];
    this.options.outputs = options?.outputs || [];

    // setup an in and out port
    this.addPort(
      new SmartPortModel({
        in: true,
        name: "in",
      })
    );
    this.addPort(
      new SmartPortModel({
        in: false,
        name: "out",
      })
    );

    // setup an in and out port
    // if (this.content && !this.source) {
    //   this.addPort(
    //     new DefaultPortModel({
    //       in: true,
    //       name: "In",
    //     })
    //   );
    // } else {
    //   for (let i = 0; i < this.inputs.length; i++) {
    //     this.addPort(
    //       new DefaultPortModel({
    //         in: true,
    //         name: this.inputs[i],
    //       })
    //     );
    //   }
    // }

    // if (options.content) {
    //   this.addPort(
    //     new DefaultPortModel({
    //       in: false,
    //       name: "Out",
    //     })
    //   );
    // } else {
    //   for (let i = 0; i < this.outputs.length; i++) {
    //     this.addPort(
    //       new DefaultPortModel({
    //         in: false,
    //         name: this.outputs[i],
    //       })
    //     );
    //   }
    // }
  }

  serialize() {
    return {
      ...super.serialize(),
      options: {
        color: this.color,
        title: this.title,
        content: this.content,
        source: this.source,
        inputs: this.inputs,
        outputs: this.outputs,
      },
    };
  }

  deserialize(event) {
    super.deserialize(event);
    this.options.color = event.data.color;
    this.options.title = event.data.title;
    this.options.content = event.data.content;
    this.options.source = event.data.source;
    this.options.inputs = event.data.inputs;
    this.options.outputs = event.data.outputs;
  }
}
