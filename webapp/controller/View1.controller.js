sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("myapp.controller.View1", {
        onInit() {
            const oModel = new JSONModel({ tasks: [] });
            this.getView().setModel(oModel);
            this.byId("taskList").bindItems({
                path: "/tasks",
                template: this.byId("taskList").getItems()[0].clone()
            });
        },

        onAddTask() {
            const oInput = this.byId("taskInput");
            const sValue = oInput.getValue().trim();
            if (!sValue) return;

            const oModel = this.getView().getModel();
            const aTasks = oModel.getProperty("/tasks");
            aTasks.push({ title: sValue, done: false });
            oModel.setProperty("/tasks", aTasks);
            oInput.setValue("");
        },

        onToggleDone(oEvent) {
            const oItem = oEvent.getSource();
            const sPath = oItem.getBindingContext().getPath();
            const oModel = this.getView().getModel();
            const bDone = oModel.getProperty(sPath + "/done");
            oModel.setProperty(sPath + "/done", !bDone);
        },

        onDeleteTask(oEvent) {
            const oItem = oEvent.getParameter("listItem");
            const sPath = oItem.getBindingContext().getPath();
            const iIndex = parseInt(sPath.split("/").pop());
            const oModel = this.getView().getModel();
            const aTasks = oModel.getProperty("/tasks");
            aTasks.splice(iIndex, 1);
            oModel.setProperty("/tasks", aTasks);
        }
    });
});