
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

$.inventory.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	Alloy.Globals.getData('1zq6rj-qHxYUkHY1jK2k_25I8_xWYrVOowbsp6VblixA','inventory');
  	var tabViewOneChildController = Alloy.createController("inventory");
  	tabViewOneChildController.openMainWindow($.tab_one);	
});

$.proposal.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	Alloy.Globals.getData('1H95ytL9cA1f3YU1Hag4GAtMUV98NyBcYqzyP04BDSwk','proposal');
  	var tabViewOneChildController = Alloy.createController("proposal");
  	tabViewOneChildController.openMainWindow($.tab_one);	
});

$.enterdata.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	var tabViewOneController = Alloy.createController("enterdata");
	tabViewOneController.openMainWindow($.tab_one);	
});

$.google.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	var tabViewOneController = Alloy.createController("google");
	tabViewOneController.openMainWindow($.tab_one);	
});