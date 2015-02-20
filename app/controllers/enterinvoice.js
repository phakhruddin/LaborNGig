exports.openMainWindow = function(_tab) {
  _tab.open($.enterinvoice_window);
  Ti.API.info("This is child widow schedule.js" +JSON.stringify(_tab));
    Alloy.Globals.checkNetworkAndGoogleAuthorized('1gnkP116nsTVxtrw6d_mXVdOiesQEPH7LVUIyHUfx9EE');
	//Alloy.Globals.checkGoogleisAuthorized();

	/*$.save_clientfirstname_button.addEventListener('click', function(_e) {
    $.clientfirstname_tf.blur();
    var clientfirstname = $.clientfirstname_tf.value;
    Ti.API.info("clientfirstname entered is: "+clientfirstname);
    Titanium.App.Properties.setString('clientfirstname',clientfirstname);
    Ti.API.info("clientfirstname obtained is: "+Titanium.App.Properties.getString('clientfirstname',"none"));
    $.save_clientfirstname_button.hide();
 });*/
/*
 	$.submit_button.addEventListener("click", function(){
		
 	var now = new Date();
 	var clientlastname = Titanium.App.Properties.getString('clientlastname',"none");
 	var clientfirstname = Titanium.App.Properties.getString('clientfirstname',"none");
 	var clientphone = Titanium.App.Properties.getString('clientphone',"none");
 	var clientemail = Titanium.App.Properties.getString('clientemail',"none");
 	var clientstreetaddress = Titanium.App.Properties.getString('clientstreetaddress',"none");
 	var clientcity = Titanium.App.Properties.getString('clientcity',"none");
 	var clientstate = Titanium.App.Properties.getString('clientstate',"none");
 	var clientproject = Titanium.App.Properties.getString('clientproject',"none");
 	var clientcompany = Titanium.App.Properties.getString('clientcompany',"none");
 	alert("On "+now+" : Info on: "+clientfirstname+" "+clientlastname+" with "+clientphone+" and email "+clientemail+" at "+clientstreetaddress+", "+clientcity+", "+clientstate+". submitted");
 	var fcsv = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'enterclient.csv');
 	var ftxt = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'enterclient.txt');
	fcsv.write(now+", "+clientfirstname+", "+clientlastname+", "+clientphone+", "+clientemail+", "+clientstreetaddress+", "+clientcity+", "+clientstate+'\n', true); // write to the file
	ftxt.write(now+", "+clientfirstname+", "+clientlastname+", "+clientphone+", "+clientemail+", "+clientstreetaddress+", "+clientcity+", "+clientstate+'\n', true); // write to the file
	var xmldatastring = '<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
	+'<gsx:col1>'+clientfirstname+'</gsx:col1><gsx:col2>'+clientfirstname+'</gsx:col2><gsx:col3>'
	+clientlastname+'</gsx:col3><gsx:col4>'+clientcompany+'</gsx:col4><gsx:col5>'
	+clientphone+'</gsx:col5><gsx:col6>'+clientemail+'</gsx:col6><gsx:col7>'+clientstreetaddress+'</gsx:col7><gsx:col8>'+clientcity+'</gsx:col8><gsx:col9>'+clientstate
	+'</gsx:col9><gsx:col10>'+'USA'+'</gsx:col10><gsx:col11>'+'NA'+'</gsx:col11><gsx:col12>NA</gsx:col12><gsx:col13>NA</gsx:col13><gsx:col14>NA</gsx:col14><gsx:col15>NA</gsx:col15><gsx:col16>NA</gsx:col16></entry>';
	Ti.API.info('xmldatastring to POST: '+xmldatastring);
	var xhr =  Titanium.Network.createHTTPClient({
    onload: function() {
    	try {
    		Ti.API.info(this.responseText); 
    	} catch(e){
    		Ti.API.info("cathing e: "+JSON.stringify(e));
    	}     
    },
    onerror: function(e) {
    	Ti.API.info("error e: "+JSON.stringify(e));
        alert("Danger, Will Robinson!"); 
    }
});
	xhr.open("POST", 'https://spreadsheets.google.com/feeds/list/1ECkNoyzgeSu8WkVs3kBnlY8MjJRIAc787nVs6IJsA9w/od6/private/full');
	xhr.setRequestHeader("Content-type", "application/atom+xml");
	xhr.setRequestHeader("Authorization", 'Bearer '+ Alloy.Globals.googleAuthSheet.getAccessToken());
	xhr.send(xmldatastring);
	Ti.API.info('done POSTed');


 });*/
};

function addRows(){
 console.log("JSON stringify e : " +JSON.stringify(e));
// Defining new row
var newRow = Ti.UI.createTableViewRow({
title : 'Row ' + ($.enterinvoice_table.data[0].rowCount + 1)
});
 
// Adding row to the table view
$.enterinvoice_table.appendRow(newRow);
}

$.enterinvoice_table.addEventListener('click', function(e){
	console.log("JSON stringify after table row is clicked : " +JSON.stringify(e));
});

var count = 3;
Titanium.App.Properties.setInt('count',count);



function addItem(e,itemTextField){
	var count = Titanium.App.Properties.getInt('count',3);
    console.log("count :" +count);
	//log
	console.log("JSON stringify e : " +JSON.stringify(e));
	Ti.API.info("data length " +$.enterinvoice_table.data.length);		
	Ti.API.info("table data 0 "+$.enterinvoice_table.data[0]);
	Ti.API.info("table row count : "+$.enterinvoice_table.data[0].rowCount);
	console.log("JSON stringify table data 0 : " +JSON.stringify($.enterinvoice_table.data[0]));
	/*
	for (i=0;i<$.enterinvoice_table.data[0].rowCount;i++) {			
		Ti.API.info($.enterinvoice_table.data[0].rows[i]);		
		console.log("JSON stringify table 0 row "+i+' : ' +JSON.stringify($.enterinvoice_table.data[0].rows[i]));
	}*/
	var itemval = count - 1;
	// Defining new test field
	var itemLabellist = Ti.UI.createLabel({
		id:"tflabellist" , 
		text:'item ' + itemval+' : ',
		font : {
			fontSize: '14',
			fontweight : 'normal'
		},
		left: '20',
		top: '10',
		color: "#3B708A"
		});
	var itemTextField = Titanium.UI.createTextField({
		id:"itemlist_tf",
		borderColor : 'white', // border color
    	width: Ti.UI.FILL,
    	left:'80',
    	top: '12',
    	font: {fontSize: '14'}
		});
	var itemLabelqty = Ti.UI.createLabel({
		id:"tflabelqty" , 
		text:'qty : ',
		font : {
			fontSize: '14',
			fontweight : 'normal'
		},
		top: '30',
		left: '20',
		color: "#3B708A"
		});
	var itemTextFieldqty = Titanium.UI.createTextField({
		id:"itemqty_tf",
		borderColor : 'white', // border color
    	top: '32',
    	left: '60',
    	width: '40',
    	hintText: '1',
    	font: {fontSize: '14'}
		});
	var itemLabelprice = Ti.UI.createLabel({
		id:"tflabelqty" , 
		text:'price : ',
		font : {
			fontSize: '14',
			fontweight : 'normal'
		},
		top: '30',
		left: '150',
		keyboardType: 'Ti.UI.KEYBOARD_NUM_PAD',
		color: "#3B708A"
		});
	var itemTextFieldprice = Titanium.UI.createTextField({
		id:"itemprice_tf",
		borderColor : 'white', // border color
       	top: '32',
		left: '200',
		hintText: '160',
		keyboardType: 'Ti.UI.KEYBOARD_NUM_PAD',
    	font: {fontSize: '14'}
		});
	// Defining new row
	var newRow = Ti.UI.createTableViewRow({
		height: '60'
	});
	newRow.add(itemLabellist);
	newRow.add(itemTextField);
	newRow.add(itemLabelqty);
	newRow.add(itemTextFieldqty);
	newRow.add(itemLabelprice);
	newRow.add(itemTextFieldprice);
    
	// Adding row to the table view
	$.enterinvoice_table.insertRowAfter(count,newRow);
	var count = count+1;
	console.log("new count :" +count);
	Titanium.App.Properties.setInt('count',count);
	
	itemTextField.addEventListener('blur', function(_e) {
 	var clientproject = itemTextField.value;
 	Ti.API.info("clientproject entered in dyn field is: "+clientproject);
 	console.log("e JSON of textfield: "+JSON.stringify(_e));
 });
	
}

$.itemlist_tf.addEventListener('blur', function(_e) {
    var clientproject = $.itemlist_tf.value;
    Ti.API.info("clientproject entered is: "+clientproject);
    Titanium.App.Properties.setString('clientproject',clientproject);
    Ti.API.info("clientproject obtained is: "+Titanium.App.Properties.getString('clientproject',"none"));
    console.log("e JSON of textfield: "+JSON.stringify(_e));
 });
 
 var itemvalue =[];
 function saveHandler(){
 	console.log("saving all data ");
 	var tabledata = [];	
 	for (i=0;i<$.enterinvoice_table.data[0].rowCount;i++) {		
 		console.log("children count : "	+$.enterinvoice_table.data[0].rows[i].children.length);
 		for (j=0;j<+$.enterinvoice_table.data[0].rows[i].children.length;j++) { 			
			//Ti.API.info($.enterinvoice_table.data[0].rows[i].children[0]);		
			console.log("JSON stringify table 0 row "+i+' : ' +JSON.stringify($.enterinvoice_table.data[0].rows[i]));
			console.log("JSON stringify table 0 row "+i+'w/children '+j+' : ' +JSON.stringify($.enterinvoice_table.data[0].rows[i].children[j]));
			tabledata.push({data1:$.enterinvoice_table.data[0].rows[i].children[j].id || "none",data2:$.enterinvoice_table.data[0].rows[i].children[j].value || "none"});
			console.log("tabledata are: "+JSON.stringify(tabledata));
		};
	};
	//once tabledata is populated, find submission value
	var item = [];
	var itemqty = [];
	var itemprice = [];
	for (i=0;i<tabledata.length;i++){
		if (tabledata[i].data1 == "clientfirstname_tf") { var clientfirstname = tabledata[i].data2; };
		if (tabledata[i].data1 == "clientlastname_tf") { var clientlastname = tabledata[i].data2; };
		if (tabledata[i].data1 == "clientphone_tf") { var clientphone = tabledata[i].data2; };
		if (tabledata[i].data1 == "clientemail_tf") { var clientemail = tabledata[i].data2; };
		if (tabledata[i].data1 == "clientstreetaddress_tf") { var clientstreetaddress = tabledata[i].data2; };
		if (tabledata[i].data1 == "clientcity_tf") { var clientcity = tabledata[i].data2; };
		if (tabledata[i].data1 == "clientstate_tf") { var clientstate = tabledata[i].data2; };
		if (tabledata[i].data1 == "clientcompany_tf") { var clientcompany = tabledata[i].data2; };
		if (tabledata[i].data1 == "itemlist_tf") {  item.push({ descr:tabledata[i].data2 }); };
		if (tabledata[i].data1 == "itemqty_tf") {  itemqty.push({ descr:tabledata[i].data2 }); };
		if (tabledata[i].data1 == "itemprice_tf") {  itemprice.push({ descr:tabledata[i].data2 }); };
	}
	console.log("item: "+JSON.stringify(item));
	console.log("itemqty: "+JSON.stringify(itemqty));
	console.log("itemprice: "+JSON.stringify(itemprice));
 };
 
 function submit() {		
 	var now = new Date();
 	var clientlastname = Titanium.App.Properties.getString('clientlastname',"none");
 	var clientfirstname = Titanium.App.Properties.getString('clientfirstname',"none");
 	var clientphone = Titanium.App.Properties.getString('clientphone',"none");
 	var clientemail = Titanium.App.Properties.getString('clientemail',"none");
 	var clientstreetaddress = Titanium.App.Properties.getString('clientstreetaddress',"none");
 	var clientcity = Titanium.App.Properties.getString('clientcity',"none");
 	var clientstate = Titanium.App.Properties.getString('clientstate',"none");
 	var clientproject = Titanium.App.Properties.getString('clientproject',"none");
 	var clientcompany = Titanium.App.Properties.getString('clientcompany',"none");
 	alert("On "+now+" : Info on: "+clientfirstname+" "+clientlastname+" with "+clientphone+" and email "+clientemail+" at "+clientstreetaddress+", "+clientcity+", "+clientstate+". submitted");
 	var fcsv = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'enterclient.csv');
 	var ftxt = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'enterclient.txt');
	fcsv.write(now+", "+clientfirstname+", "+clientlastname+", "+clientphone+", "+clientemail+", "+clientstreetaddress+", "+clientcity+", "+clientstate+'\n', true); // write to the file
	ftxt.write(now+", "+clientfirstname+", "+clientlastname+", "+clientphone+", "+clientemail+", "+clientstreetaddress+", "+clientcity+", "+clientstate+'\n', true); // write to the file
	var xmldatastring = '<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
	+'<gsx:col1>'+clientfirstname+'</gsx:col1><gsx:col2>'+clientfirstname+'</gsx:col2><gsx:col3>'
	+clientlastname+'</gsx:col3><gsx:col4>'+clientcompany+'</gsx:col4><gsx:col5>'
	+clientphone+'</gsx:col5><gsx:col6>'+clientemail+'</gsx:col6><gsx:col7>'+clientstreetaddress+'</gsx:col7><gsx:col8>'+clientcity+'</gsx:col8><gsx:col9>'+clientstate
	+'</gsx:col9><gsx:col10>'+'USA'+'</gsx:col10><gsx:col11>'+'NA'+'</gsx:col11><gsx:col12>NA</gsx:col12><gsx:col13>NA</gsx:col13><gsx:col14>NA</gsx:col14><gsx:col15>NA</gsx:col15><gsx:col16>NA</gsx:col16></entry>';
	Ti.API.info('xmldatastring to POST: '+xmldatastring);
	var xhr =  Titanium.Network.createHTTPClient({
    onload: function() {
    	try {
    		Ti.API.info(this.responseText); 
    	} catch(e){
    		Ti.API.info("cathing e: "+JSON.stringify(e));
    	}     
    },
    onerror: function(e) {
    	Ti.API.info("error e: "+JSON.stringify(e));
        alert("Danger, Will Robinson!"); 
    }
});
	xhr.open("POST", 'https://spreadsheets.google.com/feeds/qty/1ECkNoyzgeSu8WkVs3kBnlY8MjJRIAc787nVs6IJsA9w/od6/private/full');
	xhr.setRequestHeader("Content-type", "application/atom+xml");
	xhr.setRequestHeader("Authorization", 'Bearer '+ Alloy.Globals.googleAuthSheet.getAccessToken());
	xhr.send(xmldatastring);
	Ti.API.info('done POSTed');
 }
 
 



 