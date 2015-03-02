exports.openMainWindow = function(_tab) {
  _tab.open($.proposallist_window);
  Ti.API.info("This is child widow proposal.js" +JSON.stringify(_tab));
  	//$.proposallist_table.search = $.search_history;
	Alloy.Collections.proposal.fetch();	

};

$.proposallist_window.addEventListener("click", function(e){
		Alloy.Globals.openDetail(e);
		var title = e.row.title;
		var clientController = Alloy.createController('proposaldetail',{
			title: title
		});
		clientController.openMainWindow($.tab_proposallist);
});


function transformFunction(model) {
	var transform = model.toJSON();
	console.log("transform is ::" +JSON.stringify(transform));
	transform.title = transform.col1+":"+transform.col2+":"+transform.col3+":"+transform.col4+":"+transform.col5+":"+transform.col6+":"+transform.col7+":"+transform.col8+":"+transform.col9+":"+transform.col10+":"+transform.col11+":"+transform.col12+":"+transform.col13+":"+transform.col14+":"+transform.col15+":"+transform.col16;
	transform.custom = transform.col1;
	transform.name = transform.col2+"  "+transform.col3;
	transform.total ='TOTAL: '+transform.col4;
	transform.bal ='BALANCE: '+transform.col5;
	transform.paid ='PAID: '+transform.col6;
	transform.status ='Status: '+transform.col13;
	transform.lastpaiddate = 'Last Paid on: '+transform.col11;
	if (transform.col13 == "paid"){
		transform.img ="paid.gif";
	} else {
		transform.img ="owedoverduewhite.gif";
	}
	return transform;
}

function filterFunction(collection) { 
		var sorttype = Titanium.App.Properties.getString('sorttype'); 
	    console.log("sorttype in filter : "+sorttype); 
	    //console.log("JSON stringify collection: " +JSON.stringify(collection));
	    if (sorttype == "All")  {
	    	return collection.where({col4:"None"||"none"});
	    } else {
	    	return collection.where({col15: sorttype });
	    }
}


function doClick(e) {
	console.log("JSON.stringify e : " +JSON.stringify(e));	
	//Alloy.Globals.openDetail(e);
		var title = e.source.text;
		console.log("title is: "+title);
		var clientController = Alloy.createController('proposaldetail',{
			title: title
		});
		clientController.openMainWindow($.tab_proposallist);
	//alert("click this");
};

function buttonAction(e){
	console.log("JSON stringify e : " +JSON.stringify(e));
	console.log("JSON stringify e.source : " +JSON.stringify(e.source));
	var thesort = e.source.title;
	if (thesort == "All") { var sorttype = "All"; };
	if (thesort == "Submitted") { var sorttype = "submitted"; };
	if (thesort == "Pending") { var sorttype = "pending"; };
	if (thesort == "None") { var sorttype = "\*"; };
	Ti.App.Properties.setString("sorttype",sorttype);
	Alloy.Collections.proposal.fetch();
}


function addHandler(e){
	console.log("addHandler e "+JSON.stringify(e));
	    //reset the item counter
	    Titanium.App.Properties.setInt('count',0);
		var clientController = Alloy.createController('enterproposal');
		clientController.openMainWindow($.tab_proposallist);
}

function searchHandler(e){
	console.log("searchHandler e "+JSON.stringify(e));
}

function mailAction(e) {
	console.log("JSON stringify e : " +JSON.stringify(e));
			var clientController = Alloy.createController('invoicesend');
		clientController.openMainWindow($.tab_proposallist);
}

function selectItem(e) {
	console.log("info after select item : "+JSON.stringify(e));
}

function uploadFile(){
 		var inputfile = '../Documents/Expose.pdf';
 		var file = Ti.Filesystem.getFile(inputfile);
 		console.log("filename: "+file.getName.toString() +" , "+file.getParent+" , "+file.getNativePath);
 		console.log("file size is "+JSON.stringify(file.getSize));
 		var fileread = file.read();
 		var base64Data = Ti.Utils.base64encode(fileread);
	 		var filename = "proposallist12345.pdf";
	 		console.log('Access Token for File upload is: ' + Alloy.Globals.googleAuthSheet.getAccessToken());
	 		var parts = [];
	 		var bound = 287032396531387;
	 		var meta = '\{'
	 		+	'\"title\": \"'+filename+'\"'
			+	'\}';
			var parts = [];
	        parts.push('--' + bound);
	        parts.push('Content-Type: application/json');
	        parts.push('');
	        parts.push(meta);
	        parts.push('--' + bound);
			parts.push('Content-Type: application/pdf');
	        parts.push('Content-Transfer-Encoding: base64');
	        parts.push('');
	        parts.push(base64Data);
	        parts.push('--' + bound + '--');
	 		var url = "https://www.googleapis.com/upload/drive/v2/files?uploadType=multipart";
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
			        alert("unable to talk to the cloud, will try later"); 
			    }
			});
			xhr.open("POST", url);
			xhr.setRequestHeader("Content-type", "multipart/mixed; boundary=" + bound);
			xhr.setRequestHeader("Authorization", 'Bearer '+Alloy.Globals.googleAuthSheet.getAccessToken());
			xhr.setRequestHeader("Content-Length", "2000000");
			xhr.send(parts.join("\r\n"));
			Ti.API.info('done POSTed');
 		
 	}
   

