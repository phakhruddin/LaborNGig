exports.openMainWindow = function(_tab) {
  _tab.open($.project_window);
  Ti.API.info("This is child widow schedule.js" +JSON.stringify(_tab));

};