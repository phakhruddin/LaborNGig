exports.openMainWindow = function(_tab) {
  _tab.open($.invoicesendchild_window);
  Ti.API.info("This is child widow: " +JSON.stringify(_tab));
  	emailpdf();

};

function emailpdf(){
	
	var html2pdf = require('com.factisresearch.html2pdf');  
 Ti.API.info("module is => " + html2pdf);  
   
 html2pdf.addEventListener('pdfready', function(e) {  
   var emailDialog = Ti.UI.createEmailDialog();  
     emailDialog.addAttachment(Ti.Filesystem.getFile(e.pdf));  
     emailDialog.open();  
 });  
   
 var html = '<html><body><p>Hello World!</p></body></html>';  
   
 html2pdf.setHtmlString(html); 
 
}
 