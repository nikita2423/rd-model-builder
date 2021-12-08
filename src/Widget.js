import React from "react";
import createEngine, {
  DiagramModel,
  PortModelAlignment,
  //   RightAngleLinkFactory,
} from "@projectstorm/react-diagrams";

import {
  RightAngleLinkFactory,
  RightAngleLinkModel,
} from "@projectstorm/react-diagrams-routing";

import "./App.css";

import { NodeFactory } from "./components/CustomDiagramNodes/NodeFactory";
import { CanvasApp } from "./components/CanvasApp/CanvasApp";
import { DiamondNodeFactory } from "./components/DiamondNode/DiamondNodeFactory";
import { SimplePortFactory } from "./components/DiamondNode/SimplePortFactory";
import { DiamondPortModel } from "./components/DiamondNode/DiamondPortModel";
import { ErdFactory } from "./components/ErdNode/ErdNodeFactory";
function MyDiagram() {
  // force update canvas
  const forceUpdate = React.useReducer((bool) => !bool)[1];
  const engine = createEngine({ registerDefaultZoomCanvasAction: false });
  const model = new DiagramModel();
  // engine.setModel(model);

  model.registerListener({
    nodesUpdated: () => {
      console.log("Nodes updated");
      const serializedData = engine.getModel().serialize();
      localStorage.setItem(
        "React-diagram-example",
        JSON.stringify(serializedData)
      );
      const models = engine
        .getModel()
        .getNodes()
        .map((model) => {
          model.registerListener({
            positionChanged: () => {
              const serializedData = engine.getModel().serialize();
              localStorage.setItem(
                "React-diagram-example",
                JSON.stringify(serializedData)
              );
              console.log("Serialized Data", serializedData);
            },
          });
        });
    },
    eventDidFire: () => {
      console.log("Event Did fire");
    },
    gridUpdated: () => {
      console.log("Grid Updated");
    },
    linksUpdated: () => {
      console.log("On Link updated");
      const serializedData = engine.getModel().serialize();
      localStorage.setItem(
        "React-diagram-example",
        JSON.stringify(serializedData)
      );
      //   engine.getLinks
    },
  });

  const models = model.getModels();
  models.forEach((item) => {
    item.registerListener({
      eventDidFire: () => {
        console.log("Node Event Did fire");
      },
      selectionChanged: () => {
        console.log("Node Selection chnaged");
      },
      positionChanged: () => {
        console.log("On Position chnaged");
      },
    });
  });

  // Create custom node
  engine.getNodeFactories().registerFactory(new NodeFactory());
  //   engine.getNodeFactories().registerFactory(new RightAngleLinkFactory());
  engine.getLinkFactories().registerFactory(new RightAngleLinkFactory());

  engine
    .getPortFactories()
    .registerFactory(
      new SimplePortFactory(
        "diamond",
        (config) => new DiamondPortModel(PortModelAlignment.LEFT)
      )
    );
  engine.getNodeFactories().registerFactory(new DiamondNodeFactory());
  engine.getNodeFactories().registerFactory(new ErdFactory());
  console.log(
    "New Diagram",
    JSON.parse(localStorage.getItem("React-diagram-example"))
  );
  // model.deserializeModel(
  //   JSON.parse(localStorage.getItem("React-diagram-example")),
  //   engine
  // );
  // console.log("Model", model);
  engine.setModel(model);

  return <CanvasApp engine={engine} />;
}

export default MyDiagram;
