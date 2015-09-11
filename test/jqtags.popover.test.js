define({
	name : "jqtags.popover.test",
	extend : "spamjs.view",
	modules : ["jqtags.popover"]
}).as(function() {
	
	return {
		src : [
		       "jqtags.popover.test.html"
		],
		events : {
			"jq.popover.opened jq-popover" : "popoverOpened",
      "jq.popover.closed jq-popover" : "popoverClosed"
		},
		_init_ : function(){
			_importStyle_("jqtags/jq-select");
			var self = this;
			this.view("jqtags.popover.test.html").done(function(){
				self.model({
          popoverStatus : "CLOSED"
				});
			});
		},
    popoverOpened : function(a,b,c){
      this.model().popoverStatus = "OPENED";
      console.log("popoverOpened",a,b,c);
    },
    popoverClosed : function(a,b,c){
      this.model().popoverStatus = "CLOSED";
			console.log("popoverClosed",a,b,c);
		},
		_remove_ : function(){
			
		}
	};
	
});