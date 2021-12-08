import React from "react";
import createEngine, {
  DiagramModel,
  PortModelAlignment,
  DragNewLinkState,
  PortModel,
  //   RightAngleLinkFactory,
} from "@projectstorm/react-diagrams";

import { Action, InputType } from "@projectstorm/react-canvas-core";

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
import { SmartLinkFactory } from "./components/SmartLink/SmartLinkFactory";

const config = {
  allowLooseLinks: true,
  allowLinksFromLockedPorts: true,
};

function MyDiagram() {
  // force update canvas
  const forceUpdate = React.useReducer((bool) => !bool)[1];
  const engine = createEngine();
  const model = new DiagramModel();
  // engine.setModel(model);
  let linkRef = React.useRef();
  model.registerListener({
    nodesUpdated: () => {
      // console.log("Nodes updated");
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
              // console.log("Serialized Data", serializedData);
            },
          });
        });
    },
    eventDidFire: () => {
      console.log("Event Did fire");
      const serializedData = engine.getModel().serialize();
      localStorage.setItem(
        "React-diagram-example",
        JSON.stringify(serializedData)
      );
    },
    gridUpdated: () => {
      // console.log("Grid Updated");
    },
    linksUpdated: (e) => {
      console.log("On Link updated");
      linkRef = e;
      const links = engine
        .getModel()
        .getLinks()
        .map((linkModel) => {
          linkModel.registerListener({
            sourcePortChanged: () => {
              console.log("Link Source Port chnaged");
            },
            targetPortChanged: () => {
              console.log("Link Target Port chnaged");
            },
            selectionChanged: (e) => {
              console.log("Link selectionChanged");
            },
            entityRemoved: () => {
              console.log("Link entity Removed");
            },
          });
        });
      const serializedData = engine.getModel().serialize();
      localStorage.setItem(
        "React-diagram-example",
        JSON.stringify(serializedData)
      );
      //   engine.getLinks
    },
  });

  const onMouseUp = (event) => {
    if (linkRef.link) {
      const link = linkRef.link;
      if (link.sourcePort !== null && link.targetPort !== null) {
        const serializedData = engine.getModel().serialize();

        localStorage.setItem(
          "React-diagram-example",
          JSON.stringify(serializedData)
        );
      }
      linkRef.current = null;
    }
  };

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
  engine.getLinkFactories().registerListener(new SmartLinkFactory());
  const state = new DragNewLinkState();
  // state.fireMouseMoved(() => {
  //   console.log("First Mouse moved");
  // });
  state.registerAction(
    new Action({
      type: InputType.MOUSE_DOWN,
      fire: (event) => {
        console.log("I am getting called");
        // let port = engine.getMouseElement(event.event);
        // if (!config.allowLinksFromLockedPorts && port.isLocked()) {
        //   state.eject();
        //   return;
        // }
        // let link = port.createLinkModel();

        // // if no link is given, just eject the state
        // if (!link) {
        //   state.eject();
        //   return;
        // }
        // link.setSelected(true);
        // link.setSourcePort(port);
        // engine.getModel().addLink(link);
        // port.reportPosition();
      },
    })
  );
  engine.getStateMachine().pushState(state);
  // console.log(
  //   "New Diagram",
  //   JSON.parse(localStorage.getItem("React-diagram-example"))
  // );
  // model.deserializeModel(
  //   JSON.parse(localStorage.getItem("React-diagram-example")),
  //   engine
  // );
  // console.log("Model", model);
  engine.setModel(model);

  return <CanvasApp engine={engine} onMouseUp={onMouseUp} />;
}

export default MyDiagram;
