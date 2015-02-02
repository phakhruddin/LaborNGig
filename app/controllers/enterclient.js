exports.openMainWindow = function(_tab) {
  _tab.open($.enterclient_window);
  Ti.API.info("This is child widow schedule.js" +JSON.stringify(_tab));
  
  	$.save_clientlastname_button.addEventListener('click', function(_e) {
    $.clientlastname_tf.blur();
    var clientlastname = $.clientlastname_tf.value;
    var name = "test1";
    Ti.API.info("clientlastname entered is: "+clientlastname);
    Titanium.App.Properties.setString('clientlastname',clientlastname);
    Ti.API.info("clientlastname obtained is: "+Titanium.App.Properties.getString('clientlastname',"none"));
    $.save_clientlastname_button.hide();
 });

	$.clientlastname_tf.addEventListener("focus", function(){
 	$.save_clientlastname_button.show();
 });

	$.save_clientfirstname_button.addEventListener('click', function(_e) {
    $.clientfirstname_tf.blur();
    var clientfirstname = $.clientfirstname_tf.value;
    var name = "test1";
    Ti.API.info("clientfirstname entered is: "+clientfirstname);
    Titanium.App.Properties.setString('clientfirstname',clientfirstname);
    Ti.API.info("clientfirstname obtained is: "+Titanium.App.Properties.getString('clientfirstname',"none"));
    $.save_clientfirstname_button.hide();
 });

	$.clientfirstname_tf.addEventListener("focus", function(){
 	$.save_clientfirstname_button.show();
 });

	$.save_clientemail_button.addEventListener('click', function(_e) {
    $.clientemail_tf.blur();
    var clientemail = $.clientemail_tf.value;
    var name = "test1";
    Ti.API.info("clientemail entered is: "+clientemail);
    Titanium.App.Properties.setString('clientemail',clientemail);
    Ti.API.info("clientemail obtained is: "+Titanium.App.Properties.getString('clientemail',"none"));
    $.save_clientemail_button.hide();
 });

	$.clientemail_tf.addEventListener("focus", function(){
 	$.save_clientemail_button.show();
 });

	$.save_clientphone_button.addEventListener('click', function(_e) {
    $.clientphone_tf.blur();
    var clientphone = $.clientphone_tf.value;
    var name = "test1";
    Ti.API.info("clientphone entered is: "+clientphone);
    Titanium.App.Properties.setString('clientphone',clientphone);
    Ti.API.info("clientphone obtained is: "+Titanium.App.Properties.getString('clientphone',"none"));
    $.save_clientphone_button.hide();
 });

	$.clientphone_tf.addEventListener("focus", function(){
 	$.save_clientphone_button.show();
 });

	$.save_clientstreetaddress_button.addEventListener('click', function(_e) {
    $.clientstreetaddress_tf.blur();
    var clientstreetaddress = $.clientstreetaddress_tf.value;
    var name = "test1";
    Ti.API.info("clientstreetaddress entered is: "+clientstreetaddress);
    Titanium.App.Properties.setString('clientstreetaddress',clientstreetaddress);
    Ti.API.info("clientstreetaddress obtained is: "+Titanium.App.Properties.getString('clientstreetaddress',"none"));
    $.save_clientstreetaddress_button.hide();
 });

	$.clientstreetaddress_tf.addEventListener("focus", function(){
 	$.save_clientstreetaddress_button.show();
 });

	$.save_clientcity_button.addEventListener('click', function(_e) {
    $.clientcity_tf.blur();
    var clientcity = $.clientcity_tf.value;
    var name = "test1";
    Ti.API.info("clientcity entered is: "+clientcity);
    Titanium.App.Properties.setString('clientcity',clientcity);
    Ti.API.info("clientcity obtained is: "+Titanium.App.Properties.getString('clientcity',"none"));
    $.save_clientcity_button.hide();
 });

	$.clientcity_tf.addEventListener("focus", function(){
 	$.save_clientcity_button.show();
 });

	$.save_clientstate_button.addEventListener('click', function(_e) {
    $.clientstate_tf.blur();
    var clientstate = $.clientstate_tf.value;
    var name = "test1";
    Ti.API.info("clientstate entered is: "+clientstate);
    Titanium.App.Properties.setString('clientstate',clientstate);
    Ti.API.info("clientstate obtained is: "+Titanium.App.Properties.getString('clientstate',"none"));
    $.save_clientstate_button.hide();
 });

	$.clientstate_tf.addEventListener("focus", function(){
 	$.save_clientstate_button.show();
 });

	$.save_clientproject_button.addEventListener('click', function(_e) {
    $.clientproject_tf.blur();
    var clientproject = $.clientproject_tf.value;
    var name = "test1";
    Ti.API.info("clientproject entered is: "+clientproject);
    Titanium.App.Properties.setString('clientproject',clientproject);
    Ti.API.info("clientproject obtained is: "+Titanium.App.Properties.getString('clientproject',"none"));
    $.save_clientproject_button.hide();
 });

	$.clientproject_tf.addEventListener("focus", function(){
 	$.save_clientproject_button.show();
 });

 $.submit_button.addEventListener("click", function(){
 	var now = new Date();
 	var clientlastname = Titanium.App.Properties.getString('clientlastname',"none");
 	var clientfirstname = Titanium.App.Properties.getString('clientfirstname',"none");
 	var clientphone = Titanium.App.Properties.getString('clientphone',"none");
 	var clientemail = Titanium.App.Properties.getString('clientemail',"none");
 	var clientstreetaddress = Titanium.App.Properties.getString('clientstreetaddress',"none");
 	var clientcity = Titanium.App.Properties.getString('clientcity',"none");
 	var clientstate = Titanium.App.Properties.getString('clientstate',"none");
 	var clientproject = Titanium.App.Properties.getString('clientproject',"none");
 	alert("On "+now+" : Info on: "+clientfirstname+" "+clientlastname+" with "+clientphone+" and email "+clientemail+" at "+clientstreetaddress+", "+clientcity+", "+clientstate+". submitted");
 	var fcsv = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'enterclient.csv');
 	var ftxt = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'enterclient.txt');
	fcsv.write(now+", "+clientfirstname+", "+clientlastname+", "+clientphone+", "+clientemail+", "+clientstreetaddress+", "+clientcity+", "+clientstate+'\n', true); // write to the file
	ftxt.write(now+", "+clientfirstname+", "+clientlastname+", "+clientphone+", "+clientemail+", "+clientstreetaddress+", "+clientcity+", "+clientstate+'\n', true); // write to the file
 });

};