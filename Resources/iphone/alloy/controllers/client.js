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
    this.__controllerPath = "client";
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
    $.__views.client_window = Ti.UI.createWindow({
        id: "client_window",
        title: "Client List"
    });
    $.__views.client_window && $.addTopLevelView($.__views.client_window);
    var __alloyId0 = [];
    $.__views.client_row = Ti.UI.createTableViewRow({
        id: "client_row",
        backgroundColor: "transparent",
        opacity: "0",
        Title: "client"
    });
    __alloyId0.push($.__views.client_row);
    $.__views.client_table = Ti.UI.createTableView({
        data: __alloyId0,
        id: "client_table",
        backgroundImage: "page3_750x1334-emboss.png"
    });
    $.__views.client_window.add($.__views.client_table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function(_tab) {
        _tab.open($.client_window);
        Ti.API.info("This is child widow schedule.js" + JSON.stringify(_tab));
        Alloy.Globals.getData("1ECkNoyzgeSu8WkVs3kBnlY8MjJRIAc787nVs6IJsA9w");
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;