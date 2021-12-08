import {
  DefaultPortModel,
  DefaultNodeModel,
  NodeModel,
} from "@projectstorm/react-diagrams";
import { BaseModelOptions } from "@projectstorm/react-canvas-core";
import { SmartPortModel } from "../SmartLink/SmartPortModel";

export class ErdNodeModel extends NodeModel {
  color;
  table;
  table_name;
  constructor(options) {
    super({
      ...options,
      type: "table",
    });
    this.color = options?.color || "red";
    this.table = options?.table || [];
    this.table_name = options?.table_name || "";

    //  in and out port

    for (let i of this.table) {
      this.addPort(
        new SmartPortModel({
          in: true,
          name: i.name,
        })
      );
      this.addPort(
        new SmartPortModel({
          in: false,
          name: i.name + "_out",
        })
      );
    }
  }

  getTableName() {
    return this.table_name;
  }
}
