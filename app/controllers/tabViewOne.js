
function openDetail(e) {
	Ti.API.info('index = ' + JSON.stringify(e.index));
	Ti.API.info("in open_button click event title :"+e.row.Title);
}


$.location.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
  	var tabViewOneChildController = Alloy.createController("location");
  	tabViewOneChildController.openMainWindow($.tab_one);	
});

$.project.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	Alloy.Globals.getData('1FMGrlYtWL6SUQuD-RynfEU_1kf5Yf6__ysrWsY2aAJI','project');
  	var tabViewOneChildController = Alloy.createController("project");
  	tabViewOneChildController.openMainWindow($.tab_one);	
});

$.schedule.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	var scheduleController = Alloy.createController("schedule");
 	scheduleController.openMainWindow($.tab_one);
});
 	
$.client.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	Alloy.Globals.getData('1ECkNoyzgeSu8WkVs3kBnlY8MjJRIAc787nVs6IJsA9w','client');
	var scheduleController = Alloy.createController("client");
	scheduleController.openMainWindow($.tab_one);	
});

$.invoice.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	Alloy.Globals.getData('1-Wz7Apn4AvVpfqcNyMgfqyKA8OAoLNy5Bl0d_jQ9IZk','invoice');
	var scheduleController = Alloy.createController("invoice");
	scheduleController.openMainWindow($.tab_one);	
});

$.supplier.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	var scheduleController = Alloy.createController("supplier");
	scheduleController.openMainWindow($.tab_one);	
});
