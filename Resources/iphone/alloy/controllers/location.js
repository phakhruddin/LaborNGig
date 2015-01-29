function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "location";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.location_window = Ti.UI.createWindow({
        id: "location_window",
        title: "Location"
    });
    var __alloyId8 = [];
    $.__views.updateloc = Ti.UI.createTableViewRow({
        id: "updateloc",
        backgroundColor: "transparent",
        opacity: "0",
        Title: "updateloc"
    });
    __alloyId8.push($.__views.updateloc);
    $.__views.label_updateloc = Ti.UI.createLabel({
        id: "label_updateloc",
        color: "green",
        top: "5",
        left: "50",
        text: "Update Your Location >"
    });
    $.__views.updateloc.add($.__views.label_updateloc);
    $.__views.checkloc = Ti.UI.createTableViewRow({
        id: "checkloc",
        backgroundColor: "transparent",
        opacity: "0",
        Title: "checkloc"
    });
    __alloyId8.push($.__views.checkloc);
    $.__views.label_checkloc = Ti.UI.createLabel({
        id: "label_checkloc",
        color: "green",
        top: "5",
        left: "50",
        text: "Check Field Tech Location >"
    });
    $.__views.checkloc.add($.__views.label_checkloc);
    $.__views.location_table = Ti.UI.createTableView({
        data: __alloyId8,
        id: "location_table",
        backgroundImage: "page3_750x1334-emboss.png"
    });
    $.__views.location_window.add($.__views.location_table);
    $.__views.tab_two = Ti.UI.createTab({
        window: $.__views.location_window,
        id: "tab_two",
        title: "LOC"
    });
    $.__views.tab_two && $.addTopLevelView($.__views.tab_two);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function(_tab) {
        _tab.open($.location_window);
        Ti.API.info("This is child widow checking _tab : " + JSON.stringify(_tab));
        $.updateloc.addEventListener("click", function(e) {
            Alloy.Globals.openDetail(e);
            Alloy.Globals.CheckLoc();
        });
        $.checkloc.addEventListener("click", function(e) {
            Alloy.Globals.openDetail(e);
            var scheduleController = Alloy.createController("labor");
            scheduleController.openMainWindow($.tab_two);
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;