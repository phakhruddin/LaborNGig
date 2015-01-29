exports.openMainWindow = function(_tab) {
  _tab.open($.labor_window);
  Ti.API.info("This is child widow checking _tab : " +JSON.stringify(_tab));
  
};