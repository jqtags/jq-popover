_tag_("jqtags.popover",function(){

  var jQuery = module("jQuery");
  jQuery('body').on('click', function (e) {
    jQuery("jq-popover jq-popover-title,jq-popover [jq-popover-title]").each(function () {
      //the 'is' for buttons that trigger popups
      //the 'has' for icons within a button that triggers a popup
      if (!jQuery(this).is(e.target) && jQuery(this).has(e.target).length === 0 && jQuery('.popover').has(e.target).length === 0) {
        jQuery(this).popover('hide');
      }
    });
  });

  return {
    tagName: "jq-popover",
    events: {
      "shown.bs.popover" : "onPopoverShow"
    },
    accessors : {
      value: {
        type: "string",
        default: "",
        onChange: "valueOnChange"
      }
    },
    methods : ["hidePopover"],
    attachedCallback: function () {
      var self = this;
      var $con = this.$.querySelector("jq-popover-content");
      if($con){
        $con.setAttribute("hidden","hidden");
      }
      var $title = jQuery(this.$).find("jq-popover-title,[jq-popover-title]");
      $title.popover({
        html : true,
        content : function(){
          var $con = self.$.querySelector("jq-popover-content");
          $con.removeAttribute("hidden");
          return $con;//self.$.querySelector("jq-popover-content").innerHTML;
        }
      }).on("hide.bs.popover", function(){
        var $con = self.$.querySelector("jq-popover-content");
        $con.setAttribute("hidden","hidden");
        jQuery(self.$).append($con);
        self.trigger("jq.popover.closed");
      }).on("shown.bs.popover", function(){
        self.onPopoverShow();
      });
    },
    onPopoverShow : function(){
      return this.trigger("jq.popover.opened");
    },
    detachedCallback : function(){
      return jQuery(this.$).find("jq-popover-title,[jq-popover-title]").popover('destroy');
    },
    hidePopover: function(){
      var $title = this.$.querySelector("jq-popover-title") || this.$.querySelector("[jq-popover-title]");
      jQuery($title).popover('hide');
    }
  };

});