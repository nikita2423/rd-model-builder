import React from "react";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
// import { NodesTypesContainer } from "../nodes-types-container/NodesTypesContainer";
import { NodeTypeLabel } from "../NodeTypes/NodeTypes";
import { DiagramCanvas } from "../DiagramCanvas";
import { NodeModel } from "../CustomDiagramNodes/NodeModel";
import "./CanvasApp.css";
import { DiamondNodeModel } from "../DiamondNode/DiamondNodeModel";
import { ErdNodeModel } from "../ErdNode/ErdNodeModel";

export const CanvasApp = (props) => {
  // force update canvas
  const forceUpdate = React.useReducer((bool) => !bool)[1];

  const diagramEngine = props.engine;

  const onNodeDrop = (event) => {
    console.log(
      "On Node Drop",
      JSON.parse(event.dataTransfer.getData("storm-diagram-node"))
    );
    const data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"));
    let node;
    if (data.type === "rectangle") {
      node = new NodeModel({ color: "#e86c24", title: "Enter title" });
    } else if (data.type === "diamond") {
      node = new DiamondNodeModel();
    } else if (data.type === "erd") {
      node = new ErdNodeModel({
        table_name: "Table2",
        table: [
          { name: "row1" },
          { name: "row2" },
          { name: "row3" },
          { name: "row4" },
        ],
      });
    }

    const point = diagramEngine.getRelativeMousePoint(event);
    node.setPosition(point);

    diagramEngine.getModel().addNode(node);

    forceUpdate();
  };

  console.log("Engine", props.engine.getModel().getNodes());

  return (
    <div className="creator-body">
      <header className="creator-header"></header>

      <div className="creator-content">
        <div className="nodes-container">
          <NodeTypeLabel model={{ type: "rectangle" }} name="Rectangle" />
          <NodeTypeLabel model={{ type: "diamond" }} name="Diamond" />
          <NodeTypeLabel model={{ type: "erd" }} name="Table" />
          <button
            onClick={(e) => {
              diagramEngine.zoomToFit();
            }}
            style={{ marginTop: "50px" }}
          >
            Zoom to fit
          </button>
        </div>

        <div
          className="creator-layer"
          onDrop={(event) => onNodeDrop(event)}
          onDragOver={(event) => {
            event.preventDefault();
          }}
        >
          <DiagramCanvas>
            <CanvasWidget engine={diagramEngine} ac />
          </DiagramCanvas>
        </div>
      </div>
    </div>
  );
};
