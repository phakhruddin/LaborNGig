var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
  _tab.open($.invoicedetail_window);
  Ti.API.info("This is child widow checking _tab on : " +JSON.stringify(_tab));
  Ti.API.info(" input details : "+JSON.stringify(args));
};

var someDummy = Alloy.Models.dummy;
console.log("stringify dummy :"+JSON.stringify(someDummy));
someDummy.set('id', '1234');
someDummy.fetch();

var data = args.title.split(':');
var invoicenumber = data[0];
var fullname = data[1];
var customernumber = data[2];
var total = data[3];
var balance = data[4];
var paid = data[5];
var lastpaiddate = data[6];
var followupdate = data[7];
var phone = data[8];
var email = data[9];
var duedate = data[10];
var notes = data[11];

someDummy.set('invoicenumber', invoicenumber);
someDummy.set('fullname', fullname);
someDummy.set('customernumber', customernumber);
someDummy.set('phone', phone);
someDummy.set('email', email);
someDummy.set('total', total);
someDummy.set('balance', balance);
someDummy.set('paid', paid);
someDummy.set('lastpaiddate', lastpaiddate);
someDummy.set('followupdate', followupdate);
someDummy.set('duedate', duedate);
someDummy.set('notes', notes);