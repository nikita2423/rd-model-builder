import React, { useState, useRef, useEffect } from "react";
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    removeElements,
    Controls,
} from "react-flow-renderer";
import nextId from "react-id-generator";

import Sidebar from "./Sidebar";
import EditableNode from "./components/EditableNode/EditableNode";

import "./App.css";
import { parseModel, parseNodes, parseView } from "./initial-elements";
import Diamond from "./components/Diamond/Diamond";
import EntityRelationship from "./components/EntityRelationship/EntityRelationship";

// const initialElements = [
//     {
//         id: "1",
//         type: "input",
//         data: { label: "input node" },
//         position: { x: 250, y: 5 },
//     },
// ];

let id = 0;
const getId = () => `dndnode_${nextId()}`;

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState([]);
    const [view, setView] = useState({});
    const [model, setModel] = useState({});
    const onConnect = (params) => setElements((els) => addEdge(params, els));
    const onElementsRemove = (elementsToRemove) => {
        console.log("Elements Remove", elementsToRemove);
        setElements((els) => removeElements(elementsToRemove, els));
    };

    const onLoad = (_reactFlowInstance) => {
        console.log("I am checking ");
        setReactFlowInstance(_reactFlowInstance);
    };

    const onDragOver = (event) => {
        console.log("I am checking 2");
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };

    const onNodeDrag = (event, node) => {
        const nodeId = node.id;
        setElements((es) =>
            es.map((ele) => {
                if (ele.id === nodeId) {
                    ele.position = node.position;
                }

                return {
                    ...ele,
                    data: {
                        ...ele.data,
                    },
                };
            })
        );
    };

    const onDrop = (event) => {
        event.preventDefault();

        const reactFlowBounds =
            reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData("application/reactflow");
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        const id = `${type}_${nextId()}`;
        console.log("Id", id);
        let newNode = {
            id: id,
            type,
            position,
            data: { label: `${type} node`, onChange: onChange },
        };
        if (type === "erdNode") {
            newNode = {
                ...newNode,
                data: {
                    label: "Enter Table Name",
                    list: [
                        {
                            col1: "",
                            col2: "",
                            id: `${id}:${nextId()}`,
                        },
                    ],
                    addColumns: addColumns,
                    onChangeErdCellValue: onChangeErdCellValue,
                    addForeignKey: addForeignKey,
                    onChange: onChange,
                },
            };
        }
        setElements((es) => es.concat(newNode));
    };

    const addColumns = (e, node) => {
        const nodeId = node.id;
        setElements((es) =>
            es.map((ele) => {
                console.log("Element Id", ele.id, nodeId);
                if (ele.id === nodeId) {
                    ele.data.list.push({
                        col1: "",
                        col2: "",
                        id: `${nodeId}:${nextId()}`,
                    });
                }

                return {
                    ...ele,
                    data: {
                        ...ele.data,
                    },
                };
            })
        );
    };

    const onChangeErdCellValue = (e, node, cellId, colKey) => {
        const nodeId = node.id;
        setElements((es) =>
            es.map((ele) => {
                console.log("Element Id", ele.id, nodeId);
                if (ele.id === nodeId) {
                    ele.data.list.map((cell) => {
                        if (cell.id === cellId) {
                            console.log("Cell", cell, cellId);
                            cell[colKey] = e.target.value;
                        }
                    });
                }

                return {
                    ...ele,
                    data: {
                        ...ele.data,
                    },
                };
            })
        );
    };

    const onChange = (e, node) => {
        const nodeId = node.id;

        setElements((es) =>
            es.map((ele) => {
                console.log("Element Id", ele.id, nodeId);
                if (ele.id === nodeId) {
                    ele.data.label = e.target.value;
                }

                return {
                    ...ele,
                    data: {
                        ...ele.data,
                    },
                };
            })
        );
    };

    useEffect(() => {
        setElements(
            parseNodes(
                onChange,
                addColumns,
                onChangeErdCellValue,
                addForeignKey
            )
        );
    }, []);

    useEffect(() => {
        localStorage.setItem("react-diagrams-data", JSON.stringify(elements));
        const view = parseView();
        const model = parseModel();
        localStorage.setItem(
            "react-diagrams-data-view",
            JSON.stringify(parseView())
        );
        setView(view);
        setModel(model);
    }, [elements]);

    const addForeignKey = (params) => {
        const sourceId = params?.source;
        const sourceHandle = params?.sourceHandle;
        const targetId = params?.target;
        const targetHandle = params?.targetHandle;
        const targetHandleSplit = targetHandle.split("-");
        setElements((es) =>
            es.map((ele) => {
                if (ele.id === targetId) {
                    ele.data.list.map((cell) => {
                        console.log("Cell asdasc", cell, targetHandleSplit[1]);
                        if (cell.id === targetHandleSplit[1]) {
                            cell["col1"] = "FK";
                        }
                    });
                }

                return {
                    ...ele,
                    data: {
                        ...ele.data,
                    },
                };
            })
        );
    };

    const removeForeignKey = (params) => {};

    return (
        <div className="dndflow">
            <ReactFlowProvider>
                <Sidebar view={view} model={model} />
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        elements={elements}
                        onConnect={onConnect}
                        onElementsRemove={onElementsRemove}
                        onLoad={onLoad}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        nodeTypes={{
                            editNode: EditableNode,
                            diamondNode: Diamond,
                            erdNode: EntityRelationship,
                        }}
                        onNodeDrag={onNodeDrag}
                    >
                        <Controls />
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
        </div>
    );
};

export default DnDFlow;
