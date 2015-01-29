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
    this.__controllerPath = "tabViewOneChild";
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
    $.__views.child_window = Ti.UI.createWindow({
        id: "child_window",
        title: "Curr Coordinates"
    });
    $.__views.child_window && $.addTopLevelView($.__views.child_window);
    $.__views.__alloyId14 = Ti.UI.createLabel({
        text: "Current Location",
        top: "20",
        fontSize: "100dp",
        id: "__alloyId14"
    });
    $.__views.child_window.add($.__views.__alloyId14);
    $.__views.check_loc = Ti.UI.createButton({
        title: "Press to Check Location",
        id: "check_loc"
    });
    $.__views.child_window.add($.__views.check_loc);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function(_tab) {
        _tab.open($.child_window);
        console.debug("This is child widow tabViewOneChild.js" + _tab);
        $.check_loc.addEventListener("click", function() {});
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;