exports.openMainWindow = function(_tab) {
  _tab.open($.enterinvoice_window);
  Ti.API.info("This is child widow schedule.js" +JSON.stringify(_tab));

};