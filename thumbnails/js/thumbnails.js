(function($) {
  $.Thumbnail = function($el) {
    this.$el = $el;
    this.gutterIdx = 0;
    this.$images = this.$el.find('.gutter-images img');
    this.fillGutterImages();
    this.$activeImg = this.$el.find('.active img');
    this.$el.find('.gutter-images')
             .on('click', 'img', this.activate.bind(this))
             .on('mouseenter', 'img', this.hover.bind(this))
             .on('mouseleave', 'img', this.leave.bind(this));

   this.$el.find('.nav').on('click', this.navigate.bind(this));
  };

  $.Thumbnail.prototype.activate = function (e) {
    var $img = $(e.currentTarget);
    this.$el.find('.active').html($img.clone());
    this.$activeImg = $img;
  };

  $.Thumbnail.prototype.fillGutterImages = function () {
    var $gutterEl = this.$el.find('.gutter-images')
    $gutterEl.find("img").remove();
    for (var i = this.gutterIdx; i < this.gutterIdx + 5; i++) {
      $gutterEl.append(this.$images.eq(i));
    }
  };

  $.Thumbnail.prototype.hover = function (e) {
    var $img = $(e.currentTarget).clone();
    this.$el.find('.active').html($img);
  };

  $.Thumbnail.prototype.leave = function (e) {
    this.$el.find('.active').html(this.$activeImg.clone());
  };

  $.Thumbnail.prototype.navigate = function (e) {
    var link = $(e.currentTarget);
    if (link.hasClass("right") && this.gutterIdx < this.$images.length - 5) {
      this.gutterIdx += 1;
    } else if (link.hasClass("left") && this.gutterIdx > 0) {
      this.gutterIdx -= 1;
    }
    this.fillGutterImages();
  };

  $.fn.thumbnail = function() {
    return this.each(function() {
      new $.Thumbnail($(this));
    });
  };
})(jQuery);
