_tag_("jqtags.popover", function() {

  var jQuery = module("jQuery");
  jQuery('body').on('click', function(e) {
    if (jQuery(e.target).closest(".popover").length == 1) {
      return;
    }
    jQuery("jq-popover jq-popover-title[aria-describedby],jq-popover [jq-popover-title][aria-describedby]").each(function(i, elem) {
      //the 'is' for buttons that trigger popups
      //the 'has' for icons within a button that triggers a popup
      //      if (!jQuery(elem).is(e.target) && jQuery(elem).has(e.target).length === 0 && jQuery('.popover').has(e.target).length === 0) {
      //          jQuery(elem).popover("hide");
      //      }
      // hide any open popovers when the anywhere else in the body is clicked
      if (!jQuery(this).is(e.target) && jQuery(this).has(e.target).length === 0 && jQuery('.popover').has(e.target).length === 0) {
        jQuery(this).popover('hide');
      }
    });
  });

  return {
    tagName: "jq-popover",
    events: {
      "shown.bs.popover": "onPopoverShow",
      //"hover" : "initPopover",
      "click jq-popover-title,[jq-popover-title]": "showPopover"
    },
    showPopover: function(e, target) {
      if (jQuery(this.$).find("jq-popover-title,[jq-popover-title]").attr("aria-describedby")) {
        if (this.trigger_ename == "manual") {
          jQuery(this.$).find("jq-popover-title,[jq-popover-title]").popover('hide');
        }
      } else jQuery(this.$).find("jq-popover-title,[jq-popover-title]").popover('show');
    },
    accessors: {
      value: {
        type: "string",
        default: "",
        onChange: "valueOnChange"
      },
      autoposition: {
        type: "boolean",
        default: true
      }
    },
    methods: ["hidePopover", "setTagOption"],
    attachedCallback: function() {
      var self = this;
      var $con = this.$.querySelector("jq-popover-content");
      if ($con) {
        $con.setAttribute("hidden", "hidden");
      }
      this.initPopover();
      if (this.$.autoposition) {
        jQuery(self.$.querySelector("jq-popover-content")).bind("DOMSubtreeModified", function() {
          self.resetPositions();
        });
      }
    },
    initPopover: function() {
      var self = this;
      var $title = jQuery(this.$).find("jq-popover-title,[jq-popover-title]");
      this.trigger_ename = $title.data("trigger") || 'manual';
      this.$popover = $title.popover({
        html: true,
        trigger: this.trigger_ename,
        content: function() {
          var $con = self.$.querySelector("jq-popover-content");
          if ($con) {
            $con.removeAttribute("hidden");
            return $con; //self.$.querySelector("jq-popover-content").innerHTML;
          }
        }
      }).on("hide.bs.popover", function() {
        var $con = self.$.querySelector("jq-popover-content");
        var tooltips = $('.popover').not('.in');
        if (tooltips) {
          tooltips.remove();
        }
        if ($con) {
          jQuery(self.$).find('.arrow').css('display', 'none');
          $con.setAttribute("hidden", "hidden");
          jQuery(self.$).append($con);
          self.trigger("jq.popover.closed");
        }
      }).on("shown.bs.popover", function() {
        self.onPopoverShow();
      }).on("show.bs.popover", function() {
        self.trigger("jq.popover.open");
      });
    },
    onPopoverShow: function() {
      var self = this;
      
      if (jQuery(self.$).find("jq-popover-content").html() == '')
        jQuery(self.$).find('.arrow').css('display', 'none');
      else
        jQuery(self.$).find('.arrow').css('display', 'block');

      return this.trigger("jq.popover.opened");
    },
    detachedCallback: function() {
      return jQuery(this.$).find("jq-popover-title,[jq-popover-title]").popover('destroy');
    },
    hidePopover: function() {
      var $title = this.$.querySelector("jq-popover-title") || this.$.querySelector("[jq-popover-title]");
      jQuery($title).popover('hide');
    },
    setTagOption: function(key, value) {
      this[key] = value;
    },
    resetPositions: function(self) {
      var self = this.popoverInstance;
      if (self) {
        var $tip = self.tip();
        jQuery(this.$).removeClass('fade in top bottom left right')

        var placement, pos, actualWidth, actualHeight, tp;

        placement = typeof self.options.placement == 'function' ?
          self.options.placement.call(this, $tip[0], self.$element[0]) :
          self.options.placement

        pos = self.getPosition()

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (placement) {
          case 'bottom':
            tp = {
              top: pos.top + pos.height,
              left: pos.left + pos.width / 2 - actualWidth / 2
            }
            break
          case 'top':
            tp = {
              top: pos.top - actualHeight,
              left: pos.left + pos.width / 2 - actualWidth / 2
            }
            break
          case 'left':
            tp = {
              top: pos.top + pos.height / 2 - actualHeight / 2,
              left: pos.left - actualWidth
            }
            break
          case 'right':
            tp = {
              top: pos.top + pos.height / 2 - actualHeight / 2,
              left: pos.left + pos.width
            }
            break
        }
        self.applyPlacement(tp, placement)
          //    self.$element.trigger('shown')
      }
    },
    _ready_: function() {
      ! function($) {
        var popover_content_tmp = $.fn.popover.Constructor.prototype.setContent;
        $.fn.popover.Constructor.prototype.setContent = function() {
          popover_content_tmp.call(this);
          // Following is a copy from tooltip.js. Basically we are doing the alignment again
          //console.error("holaa  1")
          this.$element.closest("jq-popover ")[0].setTagOption("popoverInstance", this);
        }
      }(window.jQuery);
    }
  };

});