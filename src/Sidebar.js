import React from "react";
import ReactJson from "react-json-view";
import { parseView } from "./initial-elements";

const Sidebar = ({ view, model }) => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <aside>
            <div className="description">
                You can drag these nodes to the pane on the right.
            </div>
            {/* <div
                className="dndnode input"
                onDragStart={(event) => onDragStart(event, "input")}
                draggable
            >
                Input Node
            </div>
            <div
                className="dndnode"
                onDragStart={(event) => onDragStart(event, "default")}
                draggable
            >
                Default Node
            </div>
            <div
                className="dndnode output"
                onDragStart={(event) => onDragStart(event, "output")}
                draggable
            >
                Output Node
            </div> */}
            <div
                className="dndnode"
                onDragStart={(event) => onDragStart(event, "editNode")}
                draggable
            >
                Editable
            </div>
            <div
                className="dndnode"
                onDragStart={(event) => onDragStart(event, "diamondNode")}
                draggable
            >
                Diamond
            </div>
            <div
                className="dndnode"
                onDragStart={(event) => onDragStart(event, "erdNode")}
                draggable
            >
                Erd
            </div>
            <div>View</div>
            <ReactJson src={view} />

            <div>Model</div>
            <ReactJson src={model} />
        </aside>
    );
};

export default Sidebar;
