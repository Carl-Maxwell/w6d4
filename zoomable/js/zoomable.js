(function($) {
  $.Zoomable = function($el) {
    this.$el = $el;
    this.focusSize = 100;
    // this.$el.on('mouseenter', this.showFocusBox.bind(this));
    this.$el.on('mousemove', this.showFocusBox.bind(this));
    this.$el.on('mouseleave', this.removeFocusBox.bind(this));
    this.$focusBox = $("<div></div>").addClass('focus-box');
    this.$focusBox.css({height: this.focusSize,
                        width: this.focusSize});
    this.$el.append(this.$focusBox);

    var scale = $(window).height() / 100;

    this.$zoomedImage = $('.zoomed-image');
    this.$zoomedImage.css({
      height: $(window).height(),
      width: $(window).height(),
      "background-image": "url("+ this.$el.find('img').attr('src') +")",
      "background-size": scale*100 + "%"
    });
  };

  $.Zoomable.prototype.showFocusBox = function (e) {
    var offset = this.$el.offset();

    var left = e.clientX - offset.left - 0.5 * this.focusSize;
    var top = e.clientY - offset.top - 0.5 * this.focusSize;

    if (left < 0) {
      left = 0;
    }

    if (top < 0) {
      top = 0;
    }

    if (left + this.focusSize > this.$el.width()) {
      left = this.$el.width() - this.focusSize;
    }

    if (top + this.focusSize > this.$el.height()) {
      top = this.$el.height() - this.focusSize;
    }

    this.$focusBox.css({
      left: left,
      top: top,
    });

    var scale = this.$zoomedImage.width() / 100;

    this.$zoomedImage.css("background-position",
                          -(scale * left) + "px " + -(scale * top) + "px");
    this.$focusBox.addClass("active");
  };

  $.Zoomable.prototype.removeFocusBox = function (e) {
    this.$focusBox.removeClass("active");
  };

  $.fn.zoomable = function() {
    return this.each(function() {
      new $.Zoomable($(this));
    });
  };
})(jQuery);
