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
			"jq.popover.opened jq-popover#test1" : "popoverOpened",
      "jq.popover.closed jq-popover#test1" : "popoverClosed",
      "jq.popover.opened jq-popover#test2" : "popoverOpened2",
      "jq.popover.closed jq-popover#test2" : "popoverClosed2"
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
    popoverOpened2 : function(e){
      this.$$.find("#remote_content").loadTemplate(this.path("content.html"),this.path("content.json"));
    },
    popoverClosed2 : function(){

    },
		_remove_ : function(){
			
		}
	};
	
});