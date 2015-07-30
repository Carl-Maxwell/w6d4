(function($) {
  $.Tabs = function (el) {
    this.$el = $(el);
    this.$contentTabs = $(this.$el.data("content-tabs"));
    this.$activeTab = this.$contentTabs.find(".active");
    this.$el.on('click', 'a', this.clickTab.bind(this));
  };

  $.Tabs.prototype.clickTab = function (e) {
    e.preventDefault();
    this.$activeTab.removeClass('active');
    this.$activeTab.addClass('transitioning');
    this.$activeTab.one('transitionend', function () {
      this.$activeTab.removeClass('transitioning');
      this.$el.find('.active').removeClass('active');
      var $newTab = $(e.currentTarget);
      $newTab.addClass('active');
      this.$activeTab = $($newTab.attr("for"));
      $($newTab.attr("for")).addClass('active');
    }.bind(this));
  };

  $.fn.tabs = function () {
    return this.each(function () {
      new $.Tabs(this);
    });
  };
})(jQuery);
