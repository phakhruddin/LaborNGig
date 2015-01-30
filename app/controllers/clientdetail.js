var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
  _tab.open($.clientdetail_window);
  Ti.API.info("This is child widow checking _tab on clientdetail : " +JSON.stringify(_tab));
  Ti.API.info(" input details : "+JSON.stringify(args));
};

var someDummy = Alloy.Models.dummy;
console.log("stringify dummy :"+JSON.stringify(someDummy));
someDummy.set('id', '1234');
someDummy.fetch();

var data = args.title.split(':');
var name = data[0];
var firstname = data[1];
var lastname = data[2];
var fullname = firstname+" "+lastname;
var company = data[3];
var phone = data[4];
var email = data[5];
var address = data[6];
var invoice = data[7];
var project = data[8];

someDummy.set('fullname', fullname);
someDummy.set('company', company);
someDummy.set('phone', phone);
someDummy.set('email', email);
someDummy.set('address', address);
someDummy.set('firstname', firstname);
someDummy.set('lastname', lastname);
someDummy.set('name', name);
someDummy.set('invoice', invoice);
someDummy.set('project', project);