// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

//default var
			
Alloy.Globals.writeFile = function (content, filename){
			var file = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, filename
			);
			file.write(content+"\n");
};			

Alloy.Globals.appendFile = function (content, filename){
			var file = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, filename
			);
			file.append(content+"\n");
};

Alloy.Globals.GoogleAuth_module = require('googleAuth');

Alloy.Globals.googleAuth = new Alloy.Globals.GoogleAuth_module({
	//clientId : '219575370718-u3vb42f04899h02es4mj4uh34otgr5pe.apps.googleusercontent.com',
	clientId : '693726333078-uncq4tte4lo9vfbhl6569d3uduvnn8fd.apps.googleusercontent.com',
	clientSecret : 'CrWBzHVXAWykCWJwDT1EY-1I',
	propertyName : 'googleToken',
	quiet: false,
	scope : [ 'https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/tasks.readonly' ]
});

Alloy.Globals.UpdateMap = function(latitude,longitude,title) {
	
	var latitude = latitude;
	var longitude = longitude;
	var subtitle = "None";
	console.log("map obtained with latitude: "+latitude+" longitude: "+longitude);
	
  if(Ti.Platform.osname == 'android'){
  		var Map = Titanium.Map;
  		
  		var name = Map.createAnnotation({
	    latitude:latitude,
	    longitude:longitude,
	    title:title,
	    pincolor:Map.ANNOTATION_RED,
	    myid:1 // Custom property to uniquely identify this annotation.
		});

  		var mapview = Map.createView({
	    mapType: Titanium.Map.STANDARD_TYPE,
	    region: {latitude:latitude, longitude:longitude,
	            latitudeDelta:0.01, longitudeDelta:0.01},
	    animate:true,
	    regionFit:true,
	    userLocation:true,
	    annotations:[name]
	});
  	} else {
		var Map = require('ti.map');
		
		var tollPlaza0 = Map.createAnnotation({
	    latitude:latitude,
	    longitude:longitude,
	    title:title,
	    pincolor:Map.ANNOTATION_RED,
	    myid:1 // Custom property to uniquely identify this annotation.
		});
	
		var mapview = Map.createView({
	    mapType: Map.NORMAL_TYPE,
	    region: {latitude:latitude, longitude:longitude,
	            latitudeDelta:0.01, longitudeDelta:0.01},
	    animate:true,
	    regionFit:true,
	    userLocation:true,
	    annotations:[tollPlaza0]
	});
	}
	var win = Titanium.UI.createWindow({
		fullscreen: true,
		tabBarHidden : true,
		navBarHidden: false
	});	
//	Ti.API.info("mapview:" + JSON.stringify(mapview));
	
    if(Ti.Platform.osname == 'android'){
		alert("do nothing this is android");
   	} else {
	   	var btnBack = Ti.UI.createButton({ 
			title: '< Back', 
			top: 5,
			left: 10
		});
	   	var win1 = Titanium.UI.iOS.createNavigationWindow({
			Title: "MAP",
			backgroundColor: "transparent",
	   	  	window: win
	    });
	    win1.add(btnBack);
	    btnBack.addEventListener("click", function(_tab) { 
			console.debug("closing map" +_tab);
	//		Ti.API.info("tab:" + JSON.stringify(_tab));
			win1.close();
	});
   }; 
	// Handle click events on any annotations on this map.
	listener = function(evt){Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);};
	mapview.addEventListener('click', listener);
	win.add(mapview);
	//win.open();
	if(Ti.Platform.osname == 'android'){
		win.open();
	} else {
		win1.open();
	};

};

Alloy.Globals.CheckLoc = function(){
	if (Ti.Geolocation.locationServicesEnabled) {
	Titanium.Geolocation.purpose = 'Get Current Location';
	Titanium.Geolocation.getCurrentPosition(function(e) {
	    if (e.error) {
	        Ti.API.error('Error: ' + e.error);
	    } else {
	        Ti.API.info(e.coords);
	        var coordslat =  e.coords.latitude;
	        alert("Thanks for updating your location. loc details: latitude :"+e.coords.latitude+" longitude : "+e.coords.longitude);
	        }
	    });
	} else {
	    alert('Please enable location services');
	}
};

Alloy.Globals.openDetail = function(e){
	Ti.API.info('all info = ' + JSON.stringify(e));
	Ti.API.info('index = ' + JSON.stringify(e.index));
	Ti.API.info("in open_button click event title :"+e.row.Title);
};

Alloy.Globals.getData = function(sid,type) {	
	var url = "https://spreadsheets.google.com/feeds/list/"+sid+"/od6/public/basic?hl=en_US&alt=json";
	var thefile = "gss"+sid+".txt";
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
			// parse the retrieved data, turning it into a JavaScript object
	    	json = JSON.parse(this.responseText);
	    	//Ti.Api.Info("json data after download : " +json);
	    	var file = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, thefile
			);
			if(file.exists() && file.writeable) {
			    var success = file.deleteFile();
			    Ti.API.info((success==true) ? 'success' : 'fail'); // outputs 'success'
			}
			file.write(this.responseText);
			(type == 'client') && Alloy.Collections.client.deleteAll();
			(type == 'project') && Alloy.Collections.project.deleteAll();
			(type == 'inventory') && Alloy.Collections.inventory.deleteAll();
			(type == 'invoice') && Alloy.Collections.invoice.deleteAll();
			(type == 'supplier') && Alloy.Collections.supplier.deleteAll();
			(type == 'proposal') && Alloy.Collections.proposal.deleteAll();
			(type == 'labor') && Alloy.Collections.labor.deleteAll();
			for (var i=1; i < +json.feed.entry.length; i++) {
				var dataModel = Alloy.createModel(type,{
					col1 :  json.feed.entry[i].title.$t || "none",
					col2 : json.feed.entry[i].content.$t.split(',')[0] && json.feed.entry[i].content.$t.split(',')[0].split(':')[1] || "none",
					col3 : json.feed.entry[i].content.$t.split(',')[1] && json.feed.entry[i].content.$t.split(',')[1].split(':')[1] || "none",
					col4 : json.feed.entry[i].content.$t.split(',')[2] && json.feed.entry[i].content.$t.split(',')[2].split(':')[1] || "none",
					col5 : json.feed.entry[i].content.$t.split(',')[3] && json.feed.entry[i].content.$t.split(',')[3].split(':')[1] || "none",
					col6 : json.feed.entry[i].content.$t.split(',')[4] && json.feed.entry[i].content.$t.split(',')[4].split(':')[1] || "none",
					col7 : json.feed.entry[i].content.$t.split(',')[5] && json.feed.entry[i].content.$t.split(',')[5].split(':')[1] || "none",
					col8 : json.feed.entry[i].content.$t.split(',')[6] && json.feed.entry[i].content.$t.split(',')[6].split(':')[1] || "none",
					col9 : json.feed.entry[i].content.$t.split(',')[7] && json.feed.entry[i].content.$t.split(',')[7].split(':')[1] || "none",
					col10 :  json.feed.entry[i].content.$t.split(',')[8] && json.feed.entry[i].content.$t.split(',')[8].split(':')[1] || "none",
					col11 : json.feed.entry[i].content.$t.split(',')[9] && json.feed.entry[i].content.$t.split(',')[9].split(':')[1] || "none",
					col12 :  json.feed.entry[i].content.$t.split(',')[10] && json.feed.entry[i].content.$t.split(',')[10].split(':')[1] || "none",
					col13 :  json.feed.entry[i].content.$t.split(',')[11] && json.feed.entry[i].content.$t.split(',')[11].split(':')[1] || "none",
					col14 :  json.feed.entry[i].content.$t.split(',')[12] && json.feed.entry[i].content.$t.split(',')[12].split(':')[1] || "none",
					col15 :  json.feed.entry[i].content.$t.split(',')[13] && json.feed.entry[i].content.$t.split(',')[13].split(':')[1] || "none",
					col16 :  json.feed.entry[i].content.$t.split(',')[13] && json.feed.entry[i].content.$t.split(',')[13].split(':')[1] || "none",		
				});			
				dataModel.save();
			}
			//
			} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
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

Alloy.Globals.createController = function(controller,sourcetab){
		var newController = Alloy.createController(controller);
		newController.openMainWindow('$.'+sourcetab);
};

Alloy.Globals.getPrivateData = function(sid,type) {	
	var data = [];
	var url = "https://spreadsheets.google.com/feeds/list/"+sid+"/od6/private/full";
	var thefile = "gss"+sid+".xml";
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
			var xml = Titanium.XML.parseString(this.responseText);
			console.log("response txt is: "+this.responseText);
			console.log("this xml is: " +xml);	   
			var feed = xml.documentElement.getElementsByTagName("feed");
			var entry = xml.documentElement.getElementsByTagName("entry"); 
			console.log("this entry length is: " +entry.length);
			for (i=1;i<entry.length;i++){
				var col1 = entry.item(i).getElementsByTagName("gsx:col1").item(0).text;
				var col2 = entry.item(i).getElementsByTagName("gsx:col2").item(0).text;
				data.push({"identification":col1,"next column":col2});
				console.log("updating database with data :"+JSON.stringify(data));
				var dataModel = Alloy.createModel(type,{
					col1 :  entry.item(i).getElementsByTagName("gsx:col1").item(0).text || "none",
					col2 : entry.item(i).getElementsByTagName("gsx:col2").item(0).text || "none",
					col3 :  entry.item(i).getElementsByTagName("gsx:col3").item(0).text || "none",
					col4 :  entry.item(i).getElementsByTagName("gsx:col4").item(0).text || "none",
					col5 :  entry.item(i).getElementsByTagName("gsx:col5").item(0).text || "none",
					col6 :  entry.item(i).getElementsByTagName("gsx:col6").item(0).text || "none",
					col7 :  entry.item(i).getElementsByTagName("gsx:col7").item(0).text || "none",
					col8 :  entry.item(i).getElementsByTagName("gsx:col8").item(0).text || "none",
					col9 :  entry.item(i).getElementsByTagName("gsx:col9").item(0).text || "none",
					col10 :  entry.item(i).getElementsByTagName("gsx:col10").item(0).text || "none",
					col11 :  entry.item(i).getElementsByTagName("gsx:col11").item(0).text || "none",
					col12 :  entry.item(i).getElementsByTagName("gsx:col12").item(0).text || "none",
					col13 :  entry.item(i).getElementsByTagName("gsx:col13").item(0).text || "none",
					col14 :  entry.item(i).getElementsByTagName("gsx:col14").item(0).text || "none",
					col15 :  entry.item(i).getElementsByTagName("gsx:col15").item(0).text || "none",
					col16 :  entry.item(i).getElementsByTagName("gsx:col16").item(0).text || "none",		
				});	
				}
			var file = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, thefile
			);
			if(file.exists() && file.writeable) {
			    var success = file.deleteFile();
			    Ti.API.info((success==true) ? 'success' : 'fail'); // outputs 'success'
			}
			file.write(this.responseText);
			console.log("checking data " +JSON.stringify(data));
			//
			} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
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

Alloy.Globals.xmlToJson = function(xml) {	
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

var GoogleAuth = require('googleAuth');
var googleAuthSheet = new GoogleAuth({
	clientId : '306793301753-8ej6duert04ksb3abjutpie916l8hcc7.apps.googleusercontent.com',
	clientSecret : 'fjrsVudiK3ClrOKWxO5QvXYL',
	propertyName : 'googleToken',
	scope : ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds'],
	quiet: false
});

Alloy.Globals.LaunchWindowGoogleAuth = function() {
			//authorize first
			var win = Titanium.UI.createWindow({
				fullscreen: false,
				tabBarHidden : false,
				navBarHidden: false,
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
		   	  	window: win
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
			view.add(googleAuthSheet.authorize());			
			win1.add(btnBack);
			window.add(view);
			win1.open({modal:true});			

	};
	
	Alloy.Globals.checkGoogleisAuthorized = function () {
		googleAuthSheet.isAuthorized(function() {
		console.log('Access Token: ' + googleAuthSheet.getAccessToken());
	}, function() {
		console.log('Authorized first, see next window: ');
		Alloy.Globals.LaunchWindowGoogleAuth();
	});

	};	