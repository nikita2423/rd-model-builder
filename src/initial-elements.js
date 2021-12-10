/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import uuid from "react-uuid";

export const parseNodes = (
    onChange,
    addColumns,
    onChangeErdCellValue,
    addForeignKey
) => {
    let updatedElementList = [];
    if (localStorage.getItem("react-diagrams-data")) {
        const elementsList = JSON.parse(
            localStorage.getItem("react-diagrams-data")
        );

        if (elementsList) {
            elementsList.map((element) => {
                if (element.type === "editNode") {
                    element.data.onChange = onChange;
                }
                if (element.type === "erdNode") {
                    element.data.addColumns = addColumns;
                    element.data.onChangeErdCellValue = onChangeErdCellValue;
                    element.data.addForeignKey = addForeignKey;
                    element.data.onChange = onChange;
                }
                updatedElementList.push(element);
            });
        }
    }

    return updatedElementList;
};

export const parseView = () => {
    const views = [];
    const relationships = [];
    if (localStorage.getItem("react-diagrams-data")) {
        const elementsList = JSON.parse(
            localStorage.getItem("react-diagrams-data")
        );

        if (elementsList) {
            elementsList.map((element) => {
                if (element.type) {
                    views.push(element);
                } else {
                    relationships.push(element);
                }
            });
        }
    }
    return {
        views,
        relationships,
    };
};

export const parseModel = () => {
    const models = [];
    const relationships = [];
    if (localStorage.getItem("react-diagrams-data")) {
        const elementsList = JSON.parse(
            localStorage.getItem("react-diagrams-data")
        );

        if (elementsList) {
            elementsList.map((element) => {
                if (element.type) {
                    const type = element.type;
                    if (type === "erdNode") {
                        let fields = [];
                        element.data.list.forEach((item) => {
                            if (item.col2) {
                                fields.push({
                                    name: item.col2,
                                    type: "string",
                                    key: item.col1,
                                });
                            }
                        });
                        models.push({
                            id: uuid(),
                            viewId: element.id,
                            name: element.data.label,
                            type: "erd",
                            fields,
                        });
                    } else {
                        models.push({
                            id: uuid(),
                            viewId: element.id,
                            name: element.data.label,
                            type: "string",
                        });
                    }
                } else {
                    relationships.push({
                        id: element.id,
                        relationType: "belongsTo",
                        sourceId: element.source,
                        targetId: element.target,
                    });
                }
            });
        }
    }
    return {
        models,
        relationships,
    };
};
