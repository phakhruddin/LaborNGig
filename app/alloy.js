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
	clientId : '761394311941.apps.googleusercontent.com',
	clientSecret : 'KEKKU3--QVk849MHtmAJTToU',
	propertyName : 'googleToken',
	quiet: false,
	scope : [ 'https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/tasks.readonly' ]
});

Alloy.Globals.UpdateMap = function(latitude,longitude) {
	
		console.log(" json _tab :"+JSON.stringify(_tab));
	console.log(" json args :"+JSON.stringify(args));
	var latitude = args.latitude || 42.432276;
	var longitude = args.longitude || -87.952004;
	var title = args.title || "Waukegan Toll Plaza 21";
	var subtitle = args.hwy || 'I-94 Gurnee, IL';
	
  if(Ti.Platform.osname == 'android'){
  		var Map = Titanium.Map;
  		
  		var tollPlaza0 = Map.createAnnotation({
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
	    annotations:[tollPlaza0]
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
	        alert( "latitude :"+e.coords.latitude+" longitude : "+e.coords.longitude);
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
			for (var i=0; i < +json.feed.entry.length; i++) {
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
