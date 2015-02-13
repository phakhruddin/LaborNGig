exports.openMainWindow = function(_tab) {
  _tab.open($.sharedcalendar_window);
  Ti.API.info("This is child widow: " +JSON.stringify(_tab));
  Alloy.Globals.getPrivateData('1WUtkBcD1q3ezozI98w0sq42rl1TwIOTMq25Yayj-sEk','master');
  var url = "https://www.google.com/calendar/feeds/idevice.net%40gmail.com/private-bda51ec0064db35a76e6bd97730497e8/basic";
  getSharedCalendarData(url);
  
  	$.save_url_button.addEventListener('click', function(_e) {
	    $.url_tf.blur();
	    var url = $.url_tf.value;
	    var name = "test1";
	    Ti.API.info("url entered is: "+url);
	    Titanium.App.Properties.setString('url',url);
	    Ti.API.info("url obtained is: "+Titanium.App.Properties.getString('url',"none"));
	    $.save_url_button.hide();
    });

	$.url_tf.addEventListener("focus", function(){
 		$.save_url_button.show();
    });
    
    $.getdatainput.addEventListener('click', function() {
    	var url = Titanium.App.Properties.getString('url',"none");
		getSharedCalendarData(url);
 	});
 	
 	 $.url1.addEventListener('click', function() {
    	getUrlMaster();
		//getSharedCalendarData(url);
 	});
		 	
};

var GoogleAuth = require('googleAuth');
var googleAuthCalendar = new GoogleAuth({
	clientId : '306793301753-8ej6duert04ksb3abjutpie916l8hcc7.apps.googleusercontent.com',
	clientSecret : 'fjrsVudiK3ClrOKWxO5QvXYL',
	propertyName : 'googleToken',
	scope : ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly'],
	quiet: false
});


var url = "https://www.google.com/calendar/feeds/idevice.net%40gmail.com/private-bda51ec0064db35a76e6bd97730497e8/basic";

var getSharedCalendarData = function(url) {	
	Ti.API.info("URL is: "+url);
	var thefile = "calendar.txt";
	var data = [];
	//Alloy.Globals.checkGoogleisAuthorized();
	//Alloy.Globals.checkNetworkAndGoogleAuthorized('1gnkP116nsTVxtrw6d_mXVdOiesQEPH7LVUIyHUfx9EE');
	googleAuthCalendar;
	console.log('Access Token for Calendar is: ' + googleAuthCalendar.getAccessToken());
	googleAuthCalendar.isAuthorized(function() {
		console.log('Access Token: ' + googleAuthCalendar.getAccessToken());
		
		var xhr = Ti.Network.createHTTPClient({
		    onload: function(e) {
		    try {
				console.log("response txt is: "+this.responseText);
				var file = Ti.Filesystem.getFile(
					Ti.Filesystem.tempDirectory, thefile
				);
				if(file.exists() && file.writeable) {
				    var success = file.deleteFile();
				    Ti.API.info((success==true) ? 'success' : 'fail'); // outputs 'success'
				}
				file.write(this.responseText);
				} catch(e){
					Ti.API.info("cathing e: "+JSON.stringify(e));
				}
			}
		});
		xhr.onerror = function(e){
			//alert(e);
			alert("Unable to connect to the network. The info displayed here is NOT the latest.");
			console.log("response txt after failure is: "+this.responseText);
		};
		xhr.open("GET", url);
		xhr.send();
		Ti.API.info(" Data were successfuly downloaded from "+url+". Please proceed.");
		
	}, function() {
		console.log('Authorized first, see next window: ');
	});
	var url = " ";
};


function getUrlMaster(){
  var master = Alloy.Collections.instance('master');
  master.fetch();
  var masterjson = master.toJSON();
  console.log("masterjson.length "+masterjson.length);
  console.log("masterjson "+masterjson);
  console.log("masterjson[0].col2 "+masterjson[0].col2);
  for( var i=0; i < masterjson.length; i++){
    console.log("url"+i+" is : "+masterjson[i].col2);
    var url = masterjson[i].col2+"?access_token="+googleAuthCalendar.getAccessToken();
    getSharedCalendarData(url);
  }
}
