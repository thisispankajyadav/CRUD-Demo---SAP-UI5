sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("CRUDDemo.controller.View1", {
		onInit: function()
		{
                var odataModel = this.getOwnerComponent().getModel();
                odataModel.read("/Categories",{
                    success:function(oData,oResponse){
                        MessageBox.success("Success");
                        
                    },
                    error: function(oError){
                        MessageBox.error("Error");
                    }
                });
                this.getView().setModel(odataModel);
		},
		
		updateData: function() {
			var list = this.getView().byId("list");
                var selItem = list.getSelectedItem();
                var title = selItem.getTitle();
                var description = selItem.getDescription();
                var Name = this.getView().byId("nameinput").getValue();
                var payload = {
                    ID: parseInt(title),
                    Name: Name
                };

                var path = "/Categories(" + title + ")";
                var odataModel = this.getView().getModel();
                // @ts-ignore
                odataModel.update(path,payload,{
                    success: function(data,response){
                        MessageBox.success("Successfully Updated");
                    },
                    error: function(error){
                        MessageBox.error("Error while updating the data");
                    }
                });
		},
		
		createData:function(){
			var ID = this.getView().byId("idinput").getValue();
                var Name = this.getView().byId("nameinput").getValue();
                var data = {
                    ID: parseInt(ID),
                    Name: Name
                };
                var odataModel = this.getView().getModel();
                odataModel.create("/Categories", data, {
                    success: function(data, response){
                        MessageBox.success("Data successfully created");
                    },
                    error: function(error){
                        MessageBox.error("Error while creating the data");
                    }
                });
		},
		
		deleteData: function(){
			 var list = this.getView().byId("list");
                var selItem = list.getSelectedItem();
                var title = selItem.getTitle();
                var path = "/Categories(" + title + ")"; ///Categories(3);
                var odataModel = this.getView().getModel();
                odataModel.remove(path,{
                    success: function(data,response){
                        MessageBox.success("Deleted data");
                    },
                    error: function(error){
                        MessageBox.error("Deletion failed");
                    }
                });
		}
	});
});