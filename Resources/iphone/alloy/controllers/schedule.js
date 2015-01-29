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
    this.__controllerPath = "schedule";
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
    $.__views.schedule_window = Ti.UI.createWindow({
        id: "schedule_window",
        title: "Calendar"
    });
    $.__views.schedule_window && $.addTopLevelView($.__views.schedule_window);
    var __alloyId10 = [];
    $.__views.events = Ti.UI.createTableViewRow({
        id: "events",
        backgroundColor: "transparent",
        opacity: "0",
        Title: "events"
    });
    __alloyId10.push($.__views.events);
    $.__views.label_events = Ti.UI.createLabel({
        id: "label_events",
        color: "orange",
        top: "5",
        left: "50",
        text: "Check Events >"
    });
    $.__views.events.add($.__views.label_events);
    $.__views.createevent = Ti.UI.createTableViewRow({
        id: "createevent",
        backgroundColor: "transparent",
        opacity: "0",
        Title: "createevent"
    });
    __alloyId10.push($.__views.createevent);
    $.__views.label_createevent = Ti.UI.createLabel({
        id: "label_createevent",
        color: "orange",
        top: "5",
        left: "50",
        text: "Create Event >"
    });
    $.__views.createevent.add($.__views.label_createevent);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId10,
        id: "table",
        backgroundImage: "page3_750x1334-emboss.png"
    });
    $.__views.schedule_window.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function(_tab) {
        function CheckEvents() {
            function performCalendarReadFunctions() {
                var scrollView = Ti.UI.createScrollView({
                    backgroundColor: "#eee",
                    height: 500,
                    top: 20
                });
                var label = Ti.UI.createLabel({
                    backgroundColor: "white",
                    text: "Click on the button to display the events for the selected calendar",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    top: 20
                });
                scrollView.add(label);
                var selectableCalendars = Ti.Calendar.allCalendars;
                for (var i = 0, ilen = selectableCalendars.length; ilen > i; i++) {
                    calendars.push({
                        name: selectableCalendars[i].name,
                        id: selectableCalendars[i].id
                    });
                    pickerData.push(Ti.UI.createPickerRow({
                        title: calendars[i].name
                    }));
                    if (0 === i) {
                        selectedCalendarName = selectableCalendars[i].name;
                        selectedid = selectableCalendars[i].id;
                    }
                }
                if (calendars.length) {
                    label.text = "Click button to view calendar events";
                    var picker = Ti.UI.createPicker({
                        top: 20
                    });
                    picker.add(pickerData);
                    win.add(picker);
                    picker.addEventListener("change", function(e) {
                        for (var i = 0, ilen = calendars.length; ilen > i; i++) if (calendars[i].name === e.row.title) {
                            selectedCalendarName = calendars[i].name;
                            selectedid = calendars[i].id;
                            Ti.API.info("Selected calendar that we are going to fetch is :: " + selectedid + " name:" + selectedCalendarName);
                        }
                    });
                    var button = Ti.UI.createButton({
                        title: "View events",
                        top: 20
                    });
                    win.add(button);
                    button.addEventListener("click", function() {
                        function print(s) {
                            consoleString.length && (consoleString += "\n");
                            consoleString += s;
                        }
                        function printReminder(r) {
                            if ("android" === osname) {
                                var typetext = "[method unknown]";
                                r.method == Ti.Calendar.METHOD_EMAIL ? typetext = "Email" : r.method == Ti.Calendar.METHOD_SMS ? typetext = "SMS" : r.method == Ti.Calendar.METHOD_ALERT ? typetext = "Alert" : r.method == Ti.Calendar.METHOD_DEFAULT && (typetext = "[default reminder method]");
                                print(typetext + " reminder to be sent " + r.minutes + " minutes before the event");
                            }
                        }
                        function printAlert(a) {
                            "android" === osname ? print("Alert id " + a.id + " begin " + a.begin + "; end " + a.end + "; alarmTime " + a.alarmTime + "; minutes " + a.minutes) : ("iphone" === osname || "ipad" === osname) && print("Alert absoluteDate " + a.absoluteDate + " relativeOffset " + a.relativeOffset);
                        }
                        function printEvent(event) {
                            print(event.allDay ? "Event: " + event.title + "; " + event.begin + " (all day)" : "Event: " + event.title + "; " + event.begin + " " + event.begin + "-" + event.end);
                            var reminders = event.reminders;
                            if (reminders && reminders.length) {
                                print("There is/are " + reminders.length + " reminder(s)");
                                for (var i = 0; i < reminders.length; i++) printReminder(reminders[i]);
                            }
                            print("hasAlarm? " + event.hasAlarm);
                            var alerts = event.alerts;
                            if (alerts && alerts.length) for (var i = 0; i < alerts.length; i++) printAlert(alerts[i]);
                            var status = event.status;
                            status == Ti.Calendar.STATUS_TENTATIVE && print("This event is tentative");
                            status == Ti.Calendar.STATUS_CONFIRMED && print("This event is confirmed");
                            status == Ti.Calendar.STATUS_CANCELED && print("This event was canceled");
                        }
                        label.text = "Generating...";
                        var currentYear = new Date().getFullYear();
                        var consoleString = "";
                        var calendar = Ti.Calendar.getCalendarById(selectedid);
                        Ti.API.info("Calendar was of type" + calendar);
                        Ti.API.info("calendar that we are going to fetch is :: " + calendar.id + " name:" + calendar.name);
                        var events = calendar.getEventsInYear(currentYear);
                        if (events && events.length) {
                            print(events.length + " event(s) in " + currentYear);
                            print("");
                            for (var i = 0; i < events.length; i++) {
                                printEvent(events[i]);
                                print("");
                            }
                        } else print("No events");
                        label.text = consoleString;
                    });
                } else label.text = "No calendars available. Select at least one in the native calendar before using this app";
                win.add(scrollView);
            }
            var calendars = [];
            var selectedCalendarName;
            var selectedid;
            var pickerData = [];
            var win = Ti.UI.createWindow({
                backgroundColor: "white",
                exitOnClose: true,
                fullscreen: false,
                layout: "vertical",
                title: "Calendar"
            });
            "android" === osname ? performCalendarReadFunctions() : ("iphone" === osname || "ipad" === osname) && (Ti.Calendar.eventsAuthorization == Ti.Calendar.AUTHORIZATION_AUTHORIZED ? performCalendarReadFunctions() : Ti.Calendar.requestEventsAuthorization(function(e) {
                e.success ? performCalendarReadFunctions() : alert("Access to calendar is not allowed");
            }));
            if ("android" == Ti.Platform.osname) alert("do nothing this is android"); else {
                var btnBack = Ti.UI.createButton({
                    title: "< Back",
                    top: 20,
                    left: 10
                });
                var win1 = Titanium.UI.iOS.createNavigationWindow({
                    Title: "Labor&Gig",
                    backgroundColor: "transparent",
                    window: win
                });
                win1.add(btnBack);
                btnBack.addEventListener("click", function(_tab) {
                    console.debug("closing map" + _tab);
                    win1.close();
                });
            }
            "android" == Ti.Platform.osname ? win.open() : win1.open();
        }
        function CreateEvents() {
            function printEventDetails(eventID) {
                Ti.API.info("eventID:" + eventID);
                var defCalendar = Ti.Calendar.defaultCalendar;
                var eventFromCalendar = defCalendar.getEventById(eventID);
                if (null != eventFromCalendar) {
                    Ti.API.info("Printing event values ::");
                    Ti.API.info("title : " + eventFromCalendar.title);
                    Ti.API.info("notes : " + eventFromCalendar.notes);
                    Ti.API.info("location:" + eventFromCalendar.location);
                    Ti.API.info("allDay ? :" + eventFromCalendar.allDay);
                    Ti.API.info("status : " + eventFromCalendar.status);
                    Ti.API.info("availability : " + eventFromCalendar.availability);
                    Ti.API.info("hasAlarm ? : " + eventFromCalendar.hasAlarm);
                    Ti.API.info("id : " + eventFromCalendar.id);
                    Ti.API.info("isDetached ? : " + eventFromCalendar.isDetached);
                    Ti.API.info("begin : " + eventFromCalendar.begin);
                    Ti.API.info("end : " + eventFromCalendar.end);
                    var eventRule = eventFromCalendar.recurrenceRules;
                    Ti.API.info("recurrenceRules : " + eventRule);
                    for (var i = 0; i < eventRule.length; i++) {
                        Ti.API.info("Rule # " + i);
                        Ti.API.info("frequency : " + eventRule[i].frequency);
                        Ti.API.info("interval : " + eventRule[i].interval);
                        Ti.API.info("daysofTheWeek : ");
                        var daysofTheWeek = eventRule[i].daysOfTheWeek;
                        for (var j = 0; j < daysofTheWeek.length; j++) Ti.API.info("{ dayOfWeek : " + daysofTheWeek[j].dayOfWeek + "weekNumber : " + daysofTheWeek[j].week + "}, ");
                        Ti.API.info("firstDayOfTheWeek : " + eventRule[i].firstDayOfTheWeek);
                        Ti.API.info("daysOfTheMonth : ");
                        var daysOfTheMonth = eventRule[i].daysOfTheMonth;
                        for (var j = 0; j < daysOfTheMonth.length; j++) Ti.API.info(" " + daysOfTheMonth[j]);
                        Ti.API.info("daysOfTheYear : ");
                        var daysOfTheYear = eventRule[i].daysOfTheYear;
                        for (var j = 0; i < daysOfTheYear.length; j++) Ti.API.info(" " + daysOfTheYear[j]);
                        Ti.API.info("weeksOfTheYear : ");
                        var weeksOfTheYear = eventRule[i].weeksOfTheYear;
                        for (var j = 0; j < weeksOfTheYear.length; j++) Ti.API.info(" " + weeksOfTheYear[j]);
                        Ti.API.info("monthsOfTheYear : ");
                        var monthsOfTheYear = eventRule[i].monthsOfTheYear;
                        for (var j = 0; j < monthsOfTheYear.length; j++) Ti.API.info(" " + monthsOfTheYear[j]);
                        Ti.API.info("daysOfTheYear : ");
                        var setPositions = eventRule[i].setPositions;
                        for (var j = 0; j < setPositions.length; j++) Ti.API.info(" " + setPositions[j]);
                    }
                    Ti.API.info("alerts : " + eventFromCalendar.alerts);
                    var newAlerts = eventFromCalendar.alerts;
                    for (var i = 0; i < newAlerts.length; i++) {
                        Ti.API.info("*****ALert " + i);
                        Ti.API.info("absoluteDate :" + newAlerts[i].absoluteDate);
                        Ti.API.info("relativeOffset ;" + newAlerts[i].relativeOffset);
                    }
                }
            }
            function performCalendarWriteFunctions() {
                var defCalendar = Ti.Calendar.defaultCalendar;
                var date1 = new Date(new Date().getTime() + 3e3), date2 = new Date(new Date().getTime() + 9e5);
                Ti.API.info("Date1 : " + date1 + "Date2 : " + date2);
                var event1 = defCalendar.createEvent({
                    title: "Sample Event",
                    notes: "This is a test event which has some values assigned to it.",
                    location: "Appcelerator Inc",
                    begin: date1,
                    end: date2,
                    availability: Ti.Calendar.AVAILABILITY_FREE,
                    allDay: false
                });
                var alert1 = event1.createAlert({
                    absoluteDate: new Date(new Date().getTime() - 12e5)
                });
                var alert2 = event1.createAlert({
                    relativeOffset: -900
                });
                var allAlerts = new Array(alert1, alert2);
                event1.alerts = allAlerts;
                var newRule = event1.createRecurenceRule({
                    frequency: Ti.Calendar.RECURRENCEFREQUENCY_MONTHLY,
                    interval: 1,
                    daysOfTheWeek: [ {
                        dayOfWeek: 1,
                        week: 2
                    }, {
                        dayOfWeek: 2
                    } ],
                    end: {
                        occurrenceCount: 10
                    }
                });
                Ti.API.info("newRule : " + newRule);
                event1.recurrenceRules = [ newRule ];
                Ti.API.info("Going to save event now");
                event1.save(Ti.Calendar.SPAN_THISEVENT);
                Ti.API.info("Done with saving event,\n Now trying to retreive it.");
                printEventDetails(event1.id);
            }
            if ("android" == Ti.Platform.osname) var win = Ti.UI.createWindow({
                backgroundColor: "white",
                title: "Calendar"
            }); else {
                var btnBack = Ti.UI.createButton({
                    title: "< BACK",
                    height: 50,
                    width: "50%",
                    font: {
                        fontSize: 24,
                        fontFamily: "Helvetica Neue",
                        fontWeight: "bold"
                    },
                    left: "25%",
                    right: "25%",
                    top: -50
                });
                var win1 = Titanium.UI.iOS.createNavigationWindow({
                    Title: "Calendar",
                    backgroundColor: "transparent",
                    window: win
                });
                win1.add(btnBack);
                btnBack.addEventListener("click", function(_tab) {
                    console.debug("closing map" + _tab);
                    win1.close();
                });
            }
            var label = Ti.UI.createLabel({
                text: "Check console log",
                height: Ti.UI.size,
                width: Ti.UI.size
            });
            "iphone" === osname || "ipad" === osname ? win1.add(label) : win.add(label);
            Ti.Calendar.eventsAuthorization == Ti.Calendar.AUTHORIZATION_AUTHORIZED ? performCalendarWriteFunctions() : Ti.Calendar.requestEventsAuthorization(function(e) {
                e.success ? performCalendarWriteFunctions() : alert("Access to calendar is not allowed");
            });
            "iphone" === osname || "ipad" === osname ? win1.add(label) : win.open();
        }
        _tab.open($.schedule_window);
        Ti.API.info("This is child widow schedule.js" + JSON.stringify(_tab));
        $.events.addEventListener("click", function(e) {
            Ti.API.info("index = " + JSON.stringify(e.index));
            Ti.API.info("in open_button click event title :" + e.row.Title);
            CheckEvents();
        });
        $.createevent.addEventListener("click", function(e) {
            Ti.API.info("index = " + JSON.stringify(e.index));
            Ti.API.info("in open_button click event title :" + e.row.Title);
            CreateEvents();
        });
        var osname = Ti.Platform.osname;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;