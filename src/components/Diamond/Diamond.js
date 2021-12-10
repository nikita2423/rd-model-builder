import { Handle, Position } from "react-flow-renderer";
const Diamond = (props) => {
    const { data } = props;

    return (
        <div
            className={"diamond-node"}
            style={{
                position: "relative",
                width: 50,
                height: 50,
            }}
        >
            <svg
                width={50}
                height={50}
                dangerouslySetInnerHTML={{
                    __html:
                        `
          <g id="Layer_2">
            <polygon fill="#3b82f6" stroke="white"
             stroke-width="3" stroke-miterlimit="10" points="10,` +
                        50 / 2 +
                        ` ` +
                        50 / 2 +
                        `,10 ` +
                        (50 - 10) +
                        `,` +
                        50 / 2 +
                        ` ` +
                        50 / 2 +
                        `,` +
                        (50 - 10) +
                        ` "/>
          </g>
        `,
                }}
            />
            <Handle
                type="source"
                position={Position.Left}
                onConnect={(params) => console.log("handle onConnect", params)}
                style={{
                    background: "blue",
                    top: 50 / 2 - 8,
                    left: -8,
                    position: "absolute",
                }}
                id="diamond-a-in"
            />
            <Handle
                type="target"
                position={Position.Left}
                onConnect={(params) => console.log("handle onConnect", params)}
                style={{
                    background: "red",
                    top: 50 / 2 - 2,
                    left: -8,
                    position: "absolute",
                }}
                id="diamond-a-out"
            />
            <Handle
                type="source"
                position={Position.Top}
                onConnect={(params) => console.log("handle onConnect", params)}
                style={{
                    background: "blue",
                    left: 50 / 2 - 8,
                    top: -8,
                    position: "absolute",
                }}
                id="diamond-b-in"
            />
            <Handle
                type="source"
                position={Position.Top}
                onConnect={(params) => console.log("handle onConnect", params)}
                style={{
                    background: "red",
                    left: 50 / 2 - 2,
                    top: -8,
                    position: "absolute",
                }}
                id="diamond-b-out"
            />
            <Handle
                type="source"
                position={Position.RIGHT}
                onConnect={(params) => console.log("handle onConnect", params)}
                style={{
                    background: "blue",
                    left: 50 - 8,
                    top: 50 / 2 - 8,
                    position: "absolute",
                }}
                id="diamond-c"
            />
            <Handle
                type="source"
                position={Position.RIGHT}
                onConnect={(params) => console.log("handle onConnect", params)}
                style={{
                    background: "red",
                    left: 50 - 8,
                    top: 50 / 2 - 2,
                    position: "absolute",
                }}
                id="diamond-c-out"
            />
            <Handle
                type="source"
                position={Position.BOTTOM}
                onConnect={(params) => console.log("handle onConnect", params)}
                style={{
                    background: "blue",
                    left: 50 / 2 - 8,
                    top: 50 - 8,
                    position: "absolute",
                }}
                id="diamond-d-out"
            />
            <Handle
                type="source"
                position={Position.BOTTOM}
                onConnect={(params) => console.log("handle onConnect", params)}
                style={{
                    background: "red",
                    left: 50 / 2 - 8,
                    top: 50 - 2,
                    position: "absolute",
                }}
                id="diamond-d-out"
            />

            {/* <PortWidget
                style={{
                    top: 50 / 2 - 8,
                    left: -8,
                    position: "absolute",
                }}
                port={this.props.node.getPort(PortModelAlignment.LEFT)}
                engine={this.props.engine}
            >
                <Port />
            </PortWidget> */}
            {/* <PortWidget
                style={{
                    left: 50 / 2 - 8,
                    top: -8,
                    position: "absolute",
                }}
                port={this.props.node.getPort(PortModelAlignment.TOP)}
                engine={this.props.engine}
            >
                <Port />
            </PortWidget> */}
            {/* <PortWidget
                style={{
                    left: 50 - 8,
                    top: 50 / 2 - 8,
                    position: "absolute",
                }}
                port={this.props.node.getPort(PortModelAlignment.RIGHT)}
                engine={this.props.engine}
            >
                <Port />
            </PortWidget> */}
            {/* <PortWidget
                style={{
                    left: 50 / 2 - 8,
                    top: 50 - 8,
                    position: "absolute",
                }}
                port={this.props.node.getPort(PortModelAlignment.BOTTOM)}
                engine={this.props.engine}
            >
                <Port />
            </PortWidget> */}
        </div>
    );
};

export default Diamond;
