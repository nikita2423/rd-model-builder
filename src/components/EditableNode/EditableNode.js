import { Handle, Position } from "react-flow-renderer";
const EditableNode = (props) => {
    const { data } = props;
    const onChange = (e) => {
        data.onChange(e, props);
    };
    return (
        <div className="custom-node" style={{ backgroundColor: "#3b82f6" }}>
            <Handle
                type="source"
                position={Position.Left}
                onConnect={(params) => console.log("handle onConnect", params)}
                style={{ background: "blue", top: "30%" }}
                id="a"
            />
            <Handle
                type="target"
                position={Position.Left}
                onConnect={(params) => console.log("handle onConnect", params)}
                style={{ background: "red", top: "70%" }}
                id="b"
            />
            <input value={data.label} onChange={onChange} />
            <Handle
                type="source"
                position={Position.Right}
                onConnect={(params) => console.log("handle onConnect", params)}
                style={{ background: "blue", top: "30%" }}
                id="c"
            />
            <Handle
                type="target"
                position={Position.Right}
                onConnect={(params) => console.log("handle onConnect", params)}
                style={{ background: "red", top: "70%" }}
                id="d"
            />
        </div>
    );
};

export default EditableNode;
