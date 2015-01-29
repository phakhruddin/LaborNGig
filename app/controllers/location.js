exports.openMainWindow = function(_tab) {
  _tab.open($.location_window);
  Ti.API.info("This is child widow checking _tab : " +JSON.stringify(_tab));
  
  $.updateloc.addEventListener ("click", function(e){
		Alloy.Globals.openDetail(e);
		Alloy.Globals.CheckLoc();
	});
  
  $.checkloc.addEventListener ("click", function(e){
		Alloy.Globals.openDetail(e);
		var scheduleController = Alloy.createController("labor");
		scheduleController.openMainWindow($.tab_two);	
	});
	
};