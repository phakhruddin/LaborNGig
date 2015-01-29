var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.writeFile = function(content, filename) {
    var file = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, filename);
    file.write(content + "\n");
};

Alloy.Globals.appendFile = function(content, filename) {
    var file = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, filename);
    file.append(content + "\n");
};

Alloy.Globals.GoogleAuth_module = require("googleAuth");

Alloy.Globals.googleAuth = new Alloy.Globals.GoogleAuth_module({
    clientId: "761394311941.apps.googleusercontent.com",
    clientSecret: "KEKKU3--QVk849MHtmAJTToU",
    propertyName: "googleToken",
    quiet: false,
    scope: [ "https://www.googleapis.com/auth/tasks", "https://www.googleapis.com/auth/tasks.readonly" ]
});

Alloy.Globals.UpdateMap = function(latitude, longitude) {
    console.log(" json _tab :" + JSON.stringify(_tab));
    console.log(" json args :" + JSON.stringify(args));
    var latitude = args.latitude || 42.432276;
    var longitude = args.longitude || -87.952004;
    var title = args.title || "Waukegan Toll Plaza 21";
    args.hwy || "I-94 Gurnee, IL";
    if ("android" == Ti.Platform.osname) {
        var Map = Titanium.Map;
        var tollPlaza0 = Map.createAnnotation({
            latitude: latitude,
            longitude: longitude,
            title: title,
            pincolor: Map.ANNOTATION_RED,
            myid: 1
        });
        var mapview = Map.createView({
            mapType: Titanium.Map.STANDARD_TYPE,
            region: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: .01,
                longitudeDelta: .01
            },
            animate: true,
            regionFit: true,
            userLocation: true,
            annotations: [ tollPlaza0 ]
        });
    } else {
        var Map = require("ti.map");
        var tollPlaza0 = Map.createAnnotation({
            latitude: latitude,
            longitude: longitude,
            title: title,
            pincolor: Map.ANNOTATION_RED,
            myid: 1
        });
        var mapview = Map.createView({
            mapType: Map.NORMAL_TYPE,
            region: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: .01,
                longitudeDelta: .01
            },
            animate: true,
            regionFit: true,
            userLocation: true,
            annotations: [ tollPlaza0 ]
        });
    }
    var win = Titanium.UI.createWindow({
        fullscreen: true,
        tabBarHidden: true,
        navBarHidden: false
    });
    if ("android" == Ti.Platform.osname) alert("do nothing this is android"); else {
        var btnBack = Ti.UI.createButton({
            title: "< Back",
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
            console.debug("closing map" + _tab);
            win1.close();
        });
    }
    listener = function(evt) {
        Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
    };
    mapview.addEventListener("click", listener);
    win.add(mapview);
    "android" == Ti.Platform.osname ? win.open() : win1.open();
};

Alloy.Globals.CheckLoc = function() {
    if (Ti.Geolocation.locationServicesEnabled) {
        Titanium.Geolocation.purpose = "Get Current Location";
        Titanium.Geolocation.getCurrentPosition(function(e) {
            if (e.error) Ti.API.error("Error: " + e.error); else {
                Ti.API.info(e.coords);
                {
                    e.coords.latitude;
                }
                alert("latitude :" + e.coords.latitude + " longitude : " + e.coords.longitude);
            }
        });
    } else alert("Please enable location services");
};

Alloy.Globals.openDetail = function(e) {
    Ti.API.info("index = " + JSON.stringify(e.index));
    Ti.API.info("in open_button click event title :" + e.row.Title);
};

Alloy.Globals.getData = function(sid) {
    var url = "https://spreadsheets.google.com/feeds/list/" + sid + "/od6/public/basic?hl=en_US&alt=json";
    var thefile = "gss" + sid + ".txt";
    var xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            try {
                json = JSON.parse(this.responseText);
                var file = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, thefile);
                if (file.exists() && file.writeable) {
                    var success = file.deleteFile();
                    Ti.API.info(true == success ? "success" : "fail");
                }
                file.write(this.responseText);
                Alloy.Collections.client.deleteAll();
                for (var i = 0; i < +json.feed.entry.length; i++) {
                    var dataModel = Alloy.createModel("client", {
                        name: json.feed.entry[i].title.$t || "none",
                        firstname: json.feed.entry[0].content.$t.split(",")[0].split(":")[1] || "none",
                        lastname: json.feed.entry[0].content.$t.split(",")[1].split(":")[1] || "none",
                        company: json.feed.entry[0].content.$t.replace(/.*company:/g, "").replace(/, phone:.*/, "") || "none",
                        phone: json.feed.entry[0].content.$t.split(",")[3].split(":")[1] || "none",
                        email: json.feed.entry[0].content.$t.split(",")[4].split(":")[1] || "none",
                        address: json.feed.entry[0].content.$t.replace(/.*address:/g, "").replace(/, data1:.*/, "") || "none",
                        data1: json.feed.entry[0].content.$t.split(",")[6].split(":")[1] || "none",
                        data2: json.feed.entry[0].content.$t.split(",")[7].split(":")[1] || "none",
                        data3: json.feed.entry[0].content.$t.split(",")[8].split(":")[1] || "none",
                        data4: json.feed.entry[0].content.$t.split(",")[9].split(":")[1] || "none",
                        data5: "none",
                        data6: "none",
                        data7: "none",
                        data8: "none",
                        data9: "none"
                    });
                    dataModel.save();
                }
            } catch (e) {
                Ti.API.info("cathing e: " + JSON.stringify(e));
            }
        }
    });
    xhr.onerror = function(e) {
        alert(e);
    };
    xhr.open("GET", url);
    xhr.send();
    alert(" Data were successfuly downloaded from " + url + ". Please proceed.");
};

Alloy.createController("index");