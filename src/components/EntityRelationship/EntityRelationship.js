import { Handle, Position } from "react-flow-renderer";
import EntityRelationshipItem from "./EntityRelationshipItem";
const EntityRelationship = (props) => {
    const { data } = props;
    const { onChangeErdCellValue, addForeignKey, onChange } = data;
    const list = data?.list;
    const onAdd = (e) => {
        data?.addColumns(e, props);
    };

    const onChangeUpdate = (e) => {
        data.onChange(e, props);
    };

    console.log("Add Foreign Key", addForeignKey);
    return (
        <div className="custom-node" style={{ backgroundColor: "#3b82f6" }}>
            <div>
                <input value={data.label} onChange={onChangeUpdate} />
            </div>
            <div style={{ textAlign: "right" }}>
                <button onClick={onAdd}>ADD</button>
            </div>

            {list.map((item) => {
                return (
                    <EntityRelationshipItem
                        data={item}
                        onChangeErdCellValue={onChangeErdCellValue}
                        addForeignKey={addForeignKey}
                        node={props}
                    />
                );
            })}
        </div>
    );
};

export default EntityRelationship;
