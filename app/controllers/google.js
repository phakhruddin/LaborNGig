exports.openMainWindow = function(_tab) {
  _tab.open($.google_window);
  Ti.API.info("This is child widow of " +JSON.stringify(_tab));
	//var url = "https://spreadsheets.google.com/feeds/list/1ECkNoyzgeSu8WkVs3kBnlY8MjJRIAc787nVs6IJsA9w/od6/private/basic?hl=en_US&alt=json";
	//googlegetData(url);
	
	$.sync.addEventListener('click', function() {
		googleAuth.isAuthorized(function() {
			Ti.API.info('Access Token: ' + googleAuth.getAccessToken());
			//user is authorized so do something... just dont forget to add accessToken to your requests
			
		}, function() {
			//authorize first
			Ti.API.info('Authorized first, see next window: ');
			Alloy.Globals.LaunchWindowGoogleAuth();
		});
	});
	
	$.logout.addEventListener('click', function() {
		Ti.API.info('Logout: ');
		googleAuth.deAuthorize();
		});
	
	$.sheet.addEventListener('click', function() {
		googleAuthSheet.isAuthorized(function() {
			Ti.API.info('Access Token for SSheet: ' + googleAuthSheet.getAccessToken());
			var url = 'https://spreadsheets.google.com/feeds/list/1ECkNoyzgeSu8WkVs3kBnlY8MjJRIAc787nVs6IJsA9w/od6/private/full';
			googlegetData(url);		
		}, function() {
			//authorize first
			googleAuthSheet.authorize();
			/*
			var win = Titanium.UI.createWindow({
				fullscreen: false,
				tabBarHidden : false,
				navBarHidden: false,
				height: "85%",
				modal: true
			});	
			var btnBack = Ti.UI.createButton({ 
				title: '< Back', 
				top: 5,
				left: 10
			});
	   		var win1 = Titanium.UI.iOS.createNavigationWindow({
				Title: "Authentication",
				backgroundColor: "transparent",
		   	  	window: win,
		   	  	height: "85%"
	    	});
	    	var view = Titanium.UI.createView({
				   borderRadius:10,
				   backgroundColor:'red',
				   width:50,
				   height:50
			});	    	
	    	btnBack.addEventListener("click", function(_tab) { 
				console.debug("closing window" +_tab);
		//		Ti.API.info("tab:" + JSON.stringify(_tab));
				win1.close();
			});
			Ti.API.info('Authorized first: ');
			//view.add(googleAuthSheet.authorize());							
			win1.add(googleAuthSheet.authorize());
			win1.add(btnBack);	
			//window.add(view);
			win1.open({modal:true});	*/		

		});
	});
	
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
		googleAuthSheet.isAuthorized(function() {
			var token = googleAuthSheet.getAccessToken();
			Ti.API.info('Access Token for SSheet: ' +token );
			var sid ='1ECkNoyzgeSu8WkVs3kBnlY8MjJRIAc787nVs6IJsA9w';
	  		var url = Titanium.App.Properties.getString('url');
	    	Ti.API.info('Get data for : ' +url);
	    	googlegetData(url);
		}, function() {
			//authorize first
			Ti.API.info('Authorized first: ');
			googleAuthSheet.authorize();
		});
		 	});
		 	
};

var GoogleAuth = require('googleAuth');
var googleAuth = new GoogleAuth({
	clientId : '306793301753-8ej6duert04ksb3abjutpie916l8hcc7.apps.googleusercontent.com',
	clientSecret : 'fjrsVudiK3ClrOKWxO5QvXYL',
	propertyName : 'googleToken',
	scope : ['https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/tasks.readonly'],
	quiet: false
	//scope : ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds'],
});
//do some action...

var googleAuthSheet = new GoogleAuth({
	clientId : '306793301753-8ej6duert04ksb3abjutpie916l8hcc7.apps.googleusercontent.com',
	clientSecret : 'fjrsVudiK3ClrOKWxO5QvXYL',
	propertyName : 'googleToken',
	scope : ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly'],
	quiet: false
});

function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

function googlegetData(url) {	

	var thefile = "googleoauth2test1.txt";
	var thetextfile = "googleoauth2test1nonJSON.txt";
	var data = [];
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
			// parse the retrieved data, turning it into a JavaScript object
	    	json = JSON.parse(this.responseText);
	    	Ti.Api.Info("json data after download : " +json);
	    	var file = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, thefile
			);
		    file.write(this.responseText);
			} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
				Ti.API.info("this response text is: " +this.responseText);
				var xml = Titanium.XML.parseString(this.responseText);
				Ti.API.info("this xml is: " +xml);
				var feed = xml.documentElement.getElementsByTagName("feed");
				var entry = xml.documentElement.getElementsByTagName("entry");
				//var name = xml.documentElement.getElementsByTagName("gsx:name");
				//var address = xml.documentElement.getElementsByTagName("gsx:address");
				Ti.API.info("this entry length is: " +entry.length);
				for (i=1;i<entry.length;i++){
					var name = entry.item(i).getElementsByTagName("gsx:col1").item(0).text;
					var address = entry.item(i).getElementsByTagName("gsx:col6").item(0).text;
					Ti.API.info("this entry "+i+" name is: " +name);
					Ti.API.info("this entry "+i+" address is: " +address);
					data.push({"name":name,"address":address});
				}
				var file = Ti.Filesystem.getFile(
					Ti.Filesystem.tempDirectory, thetextfile
				);
				file.write(this.responseText); //write to file for future debug
			}
		}
	});
	xhr.onerror = function(e){
		alert(e);
	};
	xhr.open("GET", url);
	xhr.send();
	Ti.API.info(" Data were successfuly downloaded from "+url+". Please proceed.");
};