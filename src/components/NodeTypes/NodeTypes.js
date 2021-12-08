import React from "react";
import "./NodeTypes.css";

// Nodes Labels (left panel)
export const NodeTypeLabel = (props) => {
  return (
    <div
      className="node-type-label"
      color={props.color}
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData(
          "storm-diagram-node",
          JSON.stringify(props.model)
        );
      }}
    >
      {props.name}
    </div>
  );
};
