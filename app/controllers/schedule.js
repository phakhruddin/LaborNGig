exports.openMainWindow = function(_tab) {
  _tab.open($.schedule_window);
  Ti.API.info("This is child widow schedule.js" +JSON.stringify(_tab));
  
  $.events.addEventListener ("click", function(e){
		Ti.API.info('index = ' + JSON.stringify(e.index));
		Ti.API.info("in open_button click event title :"+e.row.Title);
		CheckEvents();
	});
  
  $.createevent.addEventListener ("click", function(e){
		Ti.API.info('index = ' + JSON.stringify(e.index));
		Ti.API.info("in open_button click event title :"+e.row.Title);	
		CreateEvents();
	});
	
  $.createeventfuture.addEventListener ("click", function(e){
		Ti.API.info('index = ' + JSON.stringify(e.index));
		Ti.API.info("in open_button click event title :"+e.row.Title);	
		Alloy.Globals.createController('createevent',$.schedule_tab);
	});
	
  $.createmultipleevent.addEventListener ("click", function(e){
		Ti.API.info('index = ' + JSON.stringify(e.index));
		Ti.API.info("in open_button click event title :"+e.row.Title);	
		multiplepicker();
	});
	
  $.sharedcalendar.addEventListener ("click", function(e){
		Ti.API.info('index = ' + JSON.stringify(e.index));
		Ti.API.info("in open_button click event title :"+e.row.Title);
			googleAuthCalendar;
			console.log('Access Token for Calendar is: ' + googleAuthCalendar.getAccessToken());
			googleAuthCalendar.isAuthorized(function() {
				console.log('Access Token: ' + googleAuthCalendar.getAccessToken());
			}, function() {
				console.log('Authorized first, see next window: ');
			});
		Alloy.Globals.createController('sharedcalendar',$.schedule_tab);
	});
 
};

  var osname = Ti.Platform.osname;
  
  function CheckEvents() {
	var calendars = [];
	var selectedCalendarName;
	var selectedid;
	var pickerData = [];
	
	
	//**read events from calendar*******
	function performCalendarReadFunctions(){
	    var scrollView = Ti.UI.createScrollView({
	      backgroundColor: '#eee',
	      height: 500,
	      top: 20
	    });
	
	    var label = Ti.UI.createLabel({
	      backgroundColor: 'white',
	      text: 'Click on the button to display the events for the selected calendar',
	      textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	      top: 20
	    });
	    scrollView.add(label);
	
	    var selectableCalendars = Ti.Calendar.allCalendars;
	    for (var i = 0, ilen = selectableCalendars.length; i < ilen; i++) {
	      calendars.push({ name: selectableCalendars[i].name, id: selectableCalendars[i].id });
	      pickerData.push( Ti.UI.createPickerRow({ title: calendars[i].name }) );
	      if(i === 0){
	        selectedCalendarName = selectableCalendars[i].name;
	        selectedid = selectableCalendars[i].id;
	      }
	    }
	    
	    if(!calendars.length){
	      label.text = 'No calendars available. Select at least one in the native calendar before using this app';
	    } else {
	      label.text = 'Click button to view calendar events';
	      
	      var picker = Ti.UI.createPicker({
	        top:20
	      });
	      
	      picker.add(pickerData);
	      win.add(picker);
	      
	      picker.addEventListener('change', function(e){
	        for (var i = 0, ilen = calendars.length; i < ilen; i++) {
	          if(calendars[i].name === e.row.title){
	            selectedCalendarName = calendars[i].name;
	            selectedid = calendars[i].id;
	            Ti.API.info('Selected calendar that we are going to fetch is :: '+ selectedid + ' name:' + selectedCalendarName);
	          }
	        }
	      });
	      
	      var button = Ti.UI.createButton({
	        title: 'View events',
	        top: 20
	      });
	      win.add(button);
	      
	      button.addEventListener('click', function(e){
	        label.text = 'Generating...';
	        
	        var currentYear = new Date().getFullYear();
	        
	        var consoleString = '';
	        
	        function print(s) {
	          if (consoleString.length) {
	            consoleString = consoleString + '\n';
	          }
	          consoleString = consoleString + s;
	        }
	        
	        var calendar = Ti.Calendar.getCalendarById(selectedid);
	        Ti.API.info('Calendar was of type' + calendar);
	        Ti.API.info('calendar that we are going to fetch is :: '+ calendar.id + ' name:' + calendar.name);
	        
	        function printReminder(r) {
	            if (osname === 'android') {
	                var typetext = '[method unknown]';
	                if (r.method == Ti.Calendar.METHOD_EMAIL) {
	                    typetext = 'Email';
	                } else if (r.method == Ti.Calendar.METHOD_SMS) {
	                    typetext = 'SMS';
	                } else if (r.method == Ti.Calendar.METHOD_ALERT) {
	                    typetext = 'Alert';
	                } else if (r.method == Ti.Calendar.METHOD_DEFAULT) {
	                    typetext = '[default reminder method]';
	                }
	                print(typetext + ' reminder to be sent ' + r.minutes + ' minutes before the event');
	            }
	        }
	        
	        function printAlert(a) {
	            if (osname === 'android') {
	                print('Alert id ' + a.id + ' begin ' + a.begin + '; end ' + a.end + '; alarmTime ' + a.alarmTime + '; minutes ' + a.minutes);
	            } else if (osname === 'iphone' || osname === 'ipad') {
	                print('Alert absoluteDate ' + a.absoluteDate + ' relativeOffset ' + a.relativeOffset);
	            }
	        }
	        
	        function printEvent(event) {
	          if (event.allDay) {
	            print('Event: ' + event.title + '; ' + event.begin + ' (all day)');
	          } else {
	            print('Event: ' + event.title + '; ' + event.begin + ' ' + event.begin+ '-' + event.end);
	          }
	          
	          var reminders = event.reminders;
	          if (reminders && reminders.length) {
	            print('There is/are ' + reminders.length + ' reminder(s)');
	            for (var i = 0; i < reminders.length; i++) {
	                printReminder(reminders[i]);
	            }
	          }
	          print('hasAlarm? ' + event.hasAlarm);
	          var alerts = event.alerts;
	          if (alerts && alerts.length) {
	            for (var i = 0; i < alerts.length; i++) {
	              printAlert(alerts[i]);
	            }
	          }
	          
	          var status = event.status;
	          if (status == Ti.Calendar.STATUS_TENTATIVE) {
	            print('This event is tentative');
	          }
	          if (status == Ti.Calendar.STATUS_CONFIRMED) {
	            print('This event is confirmed');
	          }
	          if (status == Ti.Calendar.STATUS_CANCELED) {
	            print('This event was canceled');
	          }
	        }
	        
	        var events = calendar.getEventsInYear(currentYear);
	        if (events && events.length) {
	          print(events.length + ' event(s) in ' + currentYear);
	          print('');
	          for (var i = 0; i < events.length; i++) {
	            printEvent(events[i]);
	            print('');
	          }
	        } else {
	          print('No events');
	        }
	        
	        label.text = consoleString;
	      });
	    }
	
	    win.add(scrollView);
	}
	
	
	var win = Ti.UI.createWindow({
	  backgroundColor: 'white',
	  exitOnClose: true,
	  fullscreen: false,
	  layout: 'vertical',
	  title: 'Calendar'
	});
	
	if (osname === 'android') {
	    performCalendarReadFunctions();
	} else if (osname === 'iphone' || osname === 'ipad') {
	    if (Ti.Calendar.eventsAuthorization == Ti.Calendar.AUTHORIZATION_AUTHORIZED) {
	        performCalendarReadFunctions();
	    } else {
	        Ti.Calendar.requestEventsAuthorization(function(e){
	            if (e.success) {
	                performCalendarReadFunctions();
	            } else {
	                alert('Access to calendar is not allowed');
	            }
	        });
	    }
	}
	
	    if(Ti.Platform.osname == 'android'){
			alert("do nothing this is android");
	   	} else {
		   	var btnBack = Ti.UI.createButton({ 
				title: '< Back', 
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
				console.debug("closing map" +_tab);
		//		Ti.API.info("tab:" + JSON.stringify(_tab));
				win1.close();
		});
	   }; 
	   
	   	if(Ti.Platform.osname == 'android'){
			win.open();
		} else {
			win1.open();
		};
	
	//win.open();
	}

  function CreateEvents() {
    function printEventDetails(eventID) {
	    Ti.API.info('eventID:' + eventID);
	    var defCalendar = Ti.Calendar.defaultCalendar;
	    var eventFromCalendar = defCalendar.getEventById(eventID);
	    if (eventFromCalendar != null) {
	        Ti.API.info('Printing event values ::');
	        Ti.API.info('title : '+ eventFromCalendar.title);
	        Ti.API.info('notes : ' + eventFromCalendar.notes);
	        Ti.API.info('location:' + eventFromCalendar.location);
	        Ti.API.info('allDay ? :' + eventFromCalendar.allDay);
	        Ti.API.info('status : '+ eventFromCalendar.status);
	        Ti.API.info('availability : '+ eventFromCalendar.availability);
	        Ti.API.info('hasAlarm ? : '+ eventFromCalendar.hasAlarm);
	        Ti.API.info('id : '+ eventFromCalendar.id);
	        Ti.API.info('isDetached ? : '+ eventFromCalendar.isDetached);
	        Ti.API.info('begin : '+ eventFromCalendar.begin);
	        Ti.API.info('end : '+ eventFromCalendar.end);
	        var eventRule = eventFromCalendar.recurrenceRules;
	        Ti.API.info("recurrenceRules : " + eventRule);
	        for (var i = 0; i < eventRule.length; i++) {
	            Ti.API.info("Rule # "+ i);
	            Ti.API.info('frequency : ' + eventRule[i].frequency);
	            Ti.API.info('interval : ' + eventRule[i].interval);
	            Ti.API.info('daysofTheWeek : ' );
	            var daysofTheWeek = eventRule[i].daysOfTheWeek; 
	            for (var j = 0; j < daysofTheWeek.length; j++) {
	                Ti.API.info('{ dayOfWeek : '+ daysofTheWeek[j].dayOfWeek +'weekNumber : '+daysofTheWeek[j].week +'}, ');
	            }
	            Ti.API.info('firstDayOfTheWeek : ' + eventRule[i].firstDayOfTheWeek);
	            Ti.API.info('daysOfTheMonth : ');
	            var daysOfTheMonth = eventRule[i].daysOfTheMonth;
	            for(var j=0;j<daysOfTheMonth.length;j++) {
	                Ti.API.info(' ' + daysOfTheMonth[j]);
	            }
	            Ti.API.info('daysOfTheYear : ');
	            var daysOfTheYear = eventRule[i].daysOfTheYear;
	            for(var j=0;i<daysOfTheYear.length;j++) {
	                Ti.API.info(' ' + daysOfTheYear[j]);
	            }
	            Ti.API.info('weeksOfTheYear : ');
	            var weeksOfTheYear = eventRule[i].weeksOfTheYear;
	            for(var j=0;j<weeksOfTheYear.length;j++) {
	                Ti.API.info(' ' + weeksOfTheYear[j]);
	            }
	            Ti.API.info('monthsOfTheYear : ');
	            var monthsOfTheYear = eventRule[i].monthsOfTheYear;
	            for(var j=0;j<monthsOfTheYear.length;j++) {
	                Ti.API.info(' ' + monthsOfTheYear[j]);
	            }
	            Ti.API.info('daysOfTheYear : ');
	            var setPositions = eventRule[i].setPositions;
	            for(var j=0;j<setPositions.length;j++) {
	                Ti.API.info(' ' + setPositions[j]);
	            }
	        };
	        Ti.API.info('alerts : '+ eventFromCalendar.alerts);
	        var newAlerts = eventFromCalendar.alerts;
	        
	        for(var i=0 ; i < newAlerts.length ; i++) {
	            Ti.API.info('*****ALert '+ i);
	            Ti.API.info('absoluteDate :'+ newAlerts[i].absoluteDate);
	            Ti.API.info('relativeOffset ;' + newAlerts[i].relativeOffset);
	        }
	   }
	}
	function performCalendarWriteFunctions(){
	    var defCalendar = Ti.Calendar.defaultCalendar;
	    var date1 = new Date(new Date().getTime() + 3000),
	        date2 = new Date(new Date().getTime() + 900000);
	    Ti.API.info('Date1 : '+ date1 + 'Date2 : '+ date2);
	    var event1 = defCalendar.createEvent({
	                        title: 'Sample Event',
	                        notes: 'This is a test event which has some values assigned to it.',
	                        location: 'Appcelerator Inc',
	                        begin: date1,
	                        end: date2,
	                        availability: Ti.Calendar.AVAILABILITY_FREE,
	                        allDay: false,
	                });
	    var alert1 = event1.createAlert({
	                        absoluteDate: new Date(new Date().getTime() - (1000*60*20))
	                });
	    var alert2 = event1.createAlert({
	        relativeOffset:-(60*15)
	    });
	    var allAlerts = new Array(alert1,alert2);
	    event1.alerts = allAlerts;
	    var newRule = event1.createRecurenceRule({
	                        frequency: Ti.Calendar.RECURRENCEFREQUENCY_MONTHLY,
	                        interval: 1,
	                        daysOfTheWeek: [{dayOfWeek:1,week:2},{dayOfWeek:2}],
	                        end: {occurrenceCount:10}
	                });
	    Ti.API.info('newRule : '+ newRule);
	    event1.recurrenceRules = [newRule];
	    Ti.API.info('Going to save event now');
	    event1.save(Ti.Calendar.SPAN_THISEVENT);
	    Ti.API.info('Done with saving event,\n Now trying to retreive it.');
	    printEventDetails(event1.id);
	}
	
	if(Ti.Platform.osname == 'android'){
			var win = Ti.UI.createWindow({
	                        backgroundColor: 'transparent',
	                        title: 'Calendar'
	            });
	   	} else {
		   	var btnBack = Ti.UI.createButton({ 
				title: '< BACK',
				height:50,
			    width:"50%",
			        font: {
			        fontSize:24,
			        fontFamily:'Helvetica Neue',
			        fontWeight:'bold'
			    },
			    left:"25%",
			    right:"25%",
			    top:-50
			});
		   	var win1 = Titanium.UI.iOS.createNavigationWindow({
				Title: "Calendar",
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
	
	var label = Ti.UI.createLabel({
	                        text: 'Check console log',
	                        height: Ti.UI.size,
	                        width: Ti.UI.size
	            });
	if (osname === 'iphone' || osname === 'ipad') { win1.add(label);} else {win.add(label);}
	
	if(Ti.Calendar.eventsAuthorization == Ti.Calendar.AUTHORIZATION_AUTHORIZED) {
	    performCalendarWriteFunctions();
	} else {
	    Ti.Calendar.requestEventsAuthorization(function(e){
	            if (e.success) {
	                performCalendarWriteFunctions();
	            } else {
	                alert('Access to calendar is not allowed');
	            }
	        });
	}
	
	if (osname === 'iphone' || osname === 'ipad') { win1.add(label);} else {win.open();}
	
	
	}

  function multiplepicker(){
	// Appcelerator Titanium (JS) code to produce multiple selection type data entry in a single window.
// via @CJ_Reed
// and Dan Tamas : http://cssgallery.info/making-a-combo-box-in-titanium-appcelerator-code-and-video



	var win = Titanium.UI.createWindow({
		fullscreen: true,
		tabBarHidden : true,
		navBarHidden: false
	});	

 if(Ti.Platform.osname == 'android'){
		alert("do nothing this is android");
   	} else {
	   	var btnBack = Ti.UI.createButton({ 
			title: '< Back', 
			top: 5,
			left: 10
		});
	   	var win1 = Titanium.UI.iOS.createNavigationWindow({
			Title: "Event",
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

// build custom tableView data/layout
var array = [];
var titleRow = Titanium.UI.createTableViewRow({height:46, className:'titleRow'}); 
var valueRow = Titanium.UI.createTableViewRow({height:46, className:'valueRow'}); 
var dateRow = Titanium.UI.createTableViewRow({height:46, className:'dateRow'});
var enddateRow = Titanium.UI.createTableViewRow({height:46, className:'enddateRow'});
var titleLabel = Ti.UI.createLabel({color:'#000000', text:"Title", font:{fontSize:20, fontWeight:'bold'}, top:8, left:12, height:24, width:99});
var titleText = Titanium.UI.createTextField({value:"  ", color:'#336699', borderColor:'#888', borderWidth:1, font:{fontSize:16, fontWeight:'bold'},top:8, left:100, height:32, width:184});
var valueLabel = Ti.UI.createLabel({color:'#000000', text:"Labor", font:{fontSize:20, fontWeight:'bold'}, top:8, left:12, height:24, width:170});
var dateLabel = Ti.UI.createLabel({color:'#000000', text:"Start Date", font:{fontSize:20, fontWeight:'bold'}, top:8, left:12, height:24, width:170});
var valueData = Ti.UI.createLabel({color:'#3D4460', text:"", font:{fontSize:17, fontWeight:'normal'}, top:11, left:112, height:20, width:180, textAlign:'right'});	
var dateData = Ti.UI.createLabel({color:'#3D4460', text:"", font:{fontSize:17, fontWeight:'normal'}, top:11, left:102, height:20, width:180, textAlign:'right'});	
var enddateLabel = Ti.UI.createLabel({color:'#000000', text:"End Date", font:{fontSize:20, fontWeight:'bold'}, top:8, left:12, height:24, width:170});
var enddateData = Ti.UI.createLabel({color:'#3D4460', text:"", font:{fontSize:17, fontWeight:'normal'}, top:11, left:102, height:20, width:180, textAlign:'right'});	
titleRow.add(titleLabel);
titleRow.add(titleText);
valueRow.add(valueLabel);
valueRow.add(valueData);
dateRow.add(dateLabel);
dateRow.add(dateData);
enddateRow.add(enddateLabel);
enddateRow.add(enddateData);
array.push(titleRow);
array.push(valueRow);
array.push(dateRow);
array.push(enddateRow);

// view initialisation
var tableView = Titanium.UI.createTableView({data:array, style:Titanium.UI.iPhone.TableViewStyle.GROUPED});
var pickerView = Titanium.UI.createView({height:248,bottom:-248});
var datePickerView = Titanium.UI.createView({height:248,bottom:-248});
var enddatePickerView = Titanium.UI.createView({height:248,bottom:-248});

  var thelabor = Alloy.Collections.instance('labor');
  thelabor.fetch();
  var laborjson = thelabor.toJSON();
  console.log("laborjson.length "+laborjson.length);
  console.log("laborjson "+laborjson);
  console.log("laborjson[0].col2 "+laborjson[0].col2);
  
  
var labor = [ 'John', 'Alex', 'Marie', 'Eva' ];
var Values = [];
var pickerValues = [];
var picker = Titanium.UI.createPicker({top:0});
picker.selectionIndicator=true;

for( var i=0; i < laborjson.length; i++){
  var Values = Ti.UI.createPickerRow({
    title: laborjson[i].col2+' '+laborjson[i].col3
  });
  pickerValues.push(Values);
}

Ti.API.info("PickerValues are : "+JSON.stringify(pickerValues));
picker.add(pickerValues);
pickerView.add(picker);

// date picker initialisation
var datePicker = Titanium.UI.createPicker({top:0, type:Titanium.UI.PICKER_TYPE_DATE_AND_TIME});
datePicker.selectionIndicator=true;
datePickerView.add(datePicker);

var enddatePicker = Titanium.UI.createPicker({top:0, type:Titanium.UI.PICKER_TYPE_DATE_AND_TIME});
enddatePicker.selectionIndicator=true;
enddatePickerView.add(enddatePicker);

// animations
var slideIn =  Titanium.UI.createAnimation({bottom:-43});
var slideOut =  Titanium.UI.createAnimation({bottom:-251});

// event functions
tableView.addEventListener('click', function(eventObject){
	if (eventObject.rowData.className == "valueRow")
	{
		titleText.blur();
		datePickerView.animate(slideOut);
		enddatePickerView.animate(slideOut);	
		pickerView.animate(slideIn);		
	}
	else if (eventObject.rowData.className == "titleRow")
	{
		pickerView.animate(slideOut);
		datePickerView.animate(slideOut);
		enddatePickerView.animate(slideOut);
		titleText.focus();	
	}
	else if (eventObject.rowData.className == "dateRow")
	{
		pickerView.animate(slideOut);
		datePickerView.animate(slideIn);
		enddatePickerView.animate(slideOut);
		titleText.blur();	
	}
	else if (eventObject.rowData.className == "enddateRow")
	{
		pickerView.animate(slideOut);
		datePickerView.animate(slideOut);
		enddatePickerView.animate(slideIn);
		titleText.blur();	
	};
});

datePicker.addEventListener('change',function(e)
{
	dateData.text = e.value;
	tableView.setData(array);
	Ti.API.info("dateData: "+JSON.stringify(dateData));
});

enddatePicker.addEventListener('change',function(e)
{
	enddateData.text = e.value;
	tableView.setData(array);
	Ti.API.info("enddateData: "+JSON.stringify(enddateData));
});

picker.addEventListener('change',function(e)
{
	valueData.text = picker.getSelectedRow(0).title;;
	tableView.setData(array);
});

titleText.addEventListener('focus',function() {
	pickerView.animate(slideOut);
	datePickerView.animate(slideOut);
	enddatePickerView.animate(slideOut);
});

// build display
win.add(tableView);
win.add(pickerView);
win.add(datePickerView);
win.add(enddatePickerView);

	if(Ti.Platform.osname == 'android'){
		win.open();
	} else {
		win1.open();
	};

}

var GoogleAuth = require('googleAuth');
var googleAuthCalendar = new GoogleAuth({
	clientId : '306793301753-8ej6duert04ksb3abjutpie916l8hcc7.apps.googleusercontent.com',
	clientSecret : 'fjrsVudiK3ClrOKWxO5QvXYL',
	propertyName : 'googleToken',
	scope : ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly'],
	quiet: false
});
