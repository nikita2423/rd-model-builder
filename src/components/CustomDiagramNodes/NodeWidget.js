import * as React from "react";
import clsx from "clsx";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import { NodeModel } from "./NodeModel";

// export interface NodeWidgetProps {
//   node: NodeModel;
//   engine: DiagramEngine;
// }

// export interface NodeWidgetState {}

// class NodeAbstractWidget extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return (
//       <div className={clsx("custom-node-port")}>
//         {!this.props.node.source && (
//           <PortWidget
//             engine={this.props.engine}
//             port={this.props.node.getPort("In")}
//             className={clsx("circle-porter", "circle-porter-in")}
//           >
//             <div className={clsx("circle-port")} />
//           </PortWidget>
//         )}
//         {this.props.node.content}
//         <PortWidget
//           engine={this.props.engine}
//           port={this.props.node.getPort("Out")}
//           className={clsx("circle-porter", "circle-porter-out")}
//         >
//           <div className={clsx("circle-port")} />
//         </PortWidget>
//       </div>
//     );
//   }
// }

// class NodeFunctionWidget extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return (
//       <>
//         {this.props.node.inputs.length > 0 && (
//           <div className="custom-node-subheader">{"Inputs"}</div>
//         )}
//         {this.props.node.inputs.map((input, index) => (
//           <div
//             key={"i-" + index}
//             className={clsx("custom-node-port", "custom-node-port-in")}
//           >
//             <PortWidget
//               engine={this.props.engine}
//               port={this.props.node.getPort(input)}
//               className={clsx("circle-porter", "circle-porter-in")}
//             >
//               <div className={clsx("circle-port")} />
//             </PortWidget>
//             {input}
//           </div>
//         ))}

//         {this.props.node.outputs.length > 0 && (
//           <div className="custom-node-subheader">{"Outputs"}</div>
//         )}
//         {this.props.node.outputs.map((output, index) => (
//           <div
//             key={"o-" + index}
//             className={clsx("custom-node-port", "custom-node-port-out")}
//           >
//             {output}
//             <PortWidget
//               engine={this.props.engine}
//               port={this.props.node.getPort(output)}
//               className={clsx("circle-porter", "circle-porter-out")}
//             >
//               <div className={clsx("circle-port")} />
//             </PortWidget>
//           </div>
//         ))}
//       </>
//     );
//   }
// }

export class NodeWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerTitle: "",
    };
  }

  componentDidMount() {
    if (this.props.node.title) {
      this.setState({
        headerTitle: this.props.node.title,
      });
    }
  }

  renameNode = (id, name) => {
    // Set new name
    this.props.engine.model.getNode(id).options.title = name;
    this.props.engine.model.getNode(id).title = name;
    // // Rerender diagram
    console.log("Node Data", this.props.engine.model.getNode(id));
    setTimeout(() => {
      this.props.engine.repaintCanvas();
      const serializedData = this.props.engine.getModel().serialize();
      localStorage.setItem(
        "React-diagram-example",
        JSON.stringify(serializedData)
      );
      console.log("Serialized Data", serializedData);
    });
  };

  render() {
    const { headerTitle } = this.state;
    return (
      <div
        className="custom-node"
        style={{ backgroundColor: "#3b82f6" }}
        onDrag={() => {
          console.log("On Drag and node");
        }}
        onDragEnd={() => {
          console.log("On Frag End");
        }}
      >
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("in")}
          className={clsx("circle-porter", "circle-porter-in")}
        >
          <div className={clsx("circle-port")} />
        </PortWidget>
        <div className="custom-node-header">
          <textarea
            value={headerTitle}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();

              this.setState({
                headerTitle: e.target.value,
              });
              this.renameNode(this.props.node.options.id, e.target.value);
            }}
            onFocus={(e) => e.currentTarget.select()}
            onMouseDown={(e) => e.stopPropagation()}
          />
        </div>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("out")}
          className={clsx("circle-porter", "circle-porter-out")}
        >
          <div className={clsx("circle-port")} />
        </PortWidget>
        {/* {this.props.node.content ? (
          <NodeAbstractWidget
            node={this.props.node}
            engine={this.props.engine}
          />
        ) : (
          <NodeFunctionWidget
            node={this.props.node}
            engine={this.props.engine}
          />
        )} */}
      </div>
    );
  }
}
