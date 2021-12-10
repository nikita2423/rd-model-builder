import { Handle, Position } from "react-flow-renderer";
const EntityRelationshipItem = ({
    data,
    onChangeErdCellValue,
    addForeignKey,
    node,
}) => {
    const itemId = data?.id;
    return (
        <div style={{ position: "relative" }}>
            <Handle
                type="source"
                position={Position.Left}
                onConnect={(params) => {
                    console.log("handle onConnect left From", params);
                    addForeignKey(params);
                }}
                style={{
                    top: "40%",
                    left: -14,
                    transform: "translate(0, -50%)",
                    background: "blue",
                }}
                id={`ain-${itemId}`}
            />
            <Handle
                type="target"
                position={Position.Left}
                onConnect={(params) =>
                    console.log("handle onConnect Left To", params)
                }
                style={{
                    top: "70%",
                    left: -14,
                    transform: "translate(0, -50%)",
                    background: "red",
                }}
                id={`aout-${itemId}`}
            />
            <div>
                <input
                    value={data.col1}
                    onChange={(e) => {
                        onChangeErdCellValue(e, node, data.id, "col1");
                    }}
                />
                <input
                    value={data.col2}
                    onChange={(e) => {
                        onChangeErdCellValue(e, node, data.id, "col2");
                    }}
                />
            </div>
            {/* Table Row */}
            <Handle
                type="source"
                position={Position.Right}
                onConnect={(params) => {
                    console.log("handle onConnect Right from", params);
                    addForeignKey(params);
                }}
                style={{
                    top: "40%",
                    transform: "translate(0, -50%)",
                    background: "blue",
                    right: -14,
                }}
                id={`bin-${itemId}`}
            />
            <Handle
                type="target"
                position={Position.Right}
                onConnect={(params) =>
                    console.log("handle onConnect Right to", params)
                }
                style={{
                    top: "70%",
                    transform: "translate(0, -50%)",
                    background: "red",
                    right: -14,
                }}
                id={`bout-${itemId}`}
            />
        </div>
    );
};

export default EntityRelationshipItem;
