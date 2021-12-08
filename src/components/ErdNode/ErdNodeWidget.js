import * as React from "react";
import {
  DiagramEngine,
  PortWidget,
  PortModel,
} from "@projectstorm/react-diagrams-core";
import styled from "@emotion/styled";
import clsx from "clsx";

export const Table = styled.div`
  border: 1px solid #000;
  border-radius: 5px;
  width: 100%;
  min-width: 240px;
  height: 100%;
  position: relative;
  box-shadow: 0 10px 10px 0 rgba(48, 49, 51, 0.1);
  background-color: white;
`;

export const Node1 = styled.div`
  border: 1px solid #000;
  width: 100%;
  height: 33px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  &:hover: {
    background: theme.palette.grey[100];
  }
`;

export const Circle = styled.div`
  cursor: pointer;
  width: 5px;
  height: 16px;
  min-height: 16px;
  background: #fff;
  cursor: pointer;
  &:hover {
    background: #ddd;
  }
`;

const ErdNodeWidget = (props) => {
  const [tableName, setTableName] = React.useState();
  //   const classes = useStyles();
  const renameNode = (id, name) => {
    // Set new name
    console.log("Node Id", id);
    setTableName(name);
    props.engine.model.getNode(id).options.table_name = name;
    // // Rerender diagram
    props.engine.repaintCanvas();
  };

  React.useEffect(() => {
    if (props.node.table_name) {
      setTableName(props.node.table_name);
    }
  }, []);
  return (
    <div>
      <Table>
        <div
          variant="body2"
          style={{
            color: "white",
            background: "#3b82f6",
            textAlign: "center",
            height: "30px",
            fontWeight: 600,
            padding: "3px 0px 0px 6px",
            fontSize: "12px",
          }}
        >
          <input
            value={tableName}
            onFocus={(e) => e.currentTarget.select()}
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              renameNode(props.node.options.id, e.target.value);
            }}
          />
        </div>
        <table style={{ width: "100%" }}>
          {props.node.table.map((value, index) => {
            return (
              <tr key={index}>
                <PortWidget
                  engine={props.engine}
                  port={
                    props.node.getPort(value.name) ||
                    new PortModel({ name: "" })
                  }
                >
                  <Circle />
                </PortWidget>
                <td>
                  <div style={{ width: "100%" }}>
                    <input value={value.name} style={{ maxWidth: "100px" }} />
                  </div>
                </td>
                <td>
                  <div style={{ width: "100%" }}>
                    {" "}
                    <input value={value.name} style={{ maxWidth: "100px" }} />
                  </div>
                </td>
                <td>
                  <div style={{ width: "100%" }}>
                    {" "}
                    <input value={value.name} style={{ maxWidth: "100px" }} />
                  </div>
                </td>

                <PortWidget
                  engine={props.engine}
                  port={
                    props.node.getPort(value.name + "_out") ||
                    new PortModel({ name: "" })
                  }
                  style={{ position: "absolute", right: "0px" }}
                >
                  <Circle />
                </PortWidget>
              </tr>
            );
          })}
        </table>
        <button>Add</button>
      </Table>
    </div>
  );
};

export default ErdNodeWidget;
