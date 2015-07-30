(function($) {
  $.Carousel = function($el) {
    this.$el = $el;
    this.activeIdx = 0;
    this.$pictures = $el.find('.items img')
    this.$pictures.first().addClass('active');
    this.$el.find(".slide-left").on('click', this.slideLeft.bind(this));
    this.$el.find(".slide-right").on('click', this.slideRight.bind(this));
    this.transitioning = false;
  };

  $.Carousel.prototype.slideLeft = function () {
    this.slide(-1);
  };

  $.Carousel.prototype.slideRight = function () {
    this.slide(1);
  };

  $.Carousel.prototype.slide = function (dir) {
    if (this.transitioning) {
      return;
    }

    this.transitioning = true;
    var inDirClass = dir == 1 ? "right" : "left";
    var outDirClass = dir == -1 ? "right" : "left";
    var items = this.$pictures;
    var currentItem = items.eq(this.activeIdx);

    currentItem.one('transitionend', function (e){
      currentItem.removeClass('active '+ outDirClass);
      this.transitioning = false;
    }.bind(this));

    var nextIndex = (this.activeIdx + dir + items.length) % items.length;
    var nextItem = items.eq(nextIndex);

    //in the dom but off the screen
    nextItem.addClass('active ' + inDirClass);

    setTimeout(function() {
      currentItem.addClass(outDirClass);
      this.removeClass(inDirClass);
    }.bind(items.eq(nextIndex)), 0);

    this.activeIdx = nextIndex;
  };

  $.fn.carousel = function() {
    return this.each(function() {
      new $.Carousel($(this));
    });
  };
})(jQuery);
