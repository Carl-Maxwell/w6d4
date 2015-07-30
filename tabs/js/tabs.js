(function($) {
  $.Tabs = function (el) {
    this.$el = $(el);
    this.$contentTabs = $(this.$el.data("content-tabs"));
    this.$activeTab = this.$contentTabs.find(".active");
    this.$el.on('click', 'a', this.clickTab.bind(this));
  };

  $.Tabs.prototype.clickTab = function (e) {
    e.preventDefault();
    this.$activeTab.addClass('transitioning');
    var $newTab = $(e.currentTarget);
    this.$el.find('.active').removeClass('active');
    $newTab.addClass('active');

    this.$activeTab.one('transitionend', function () {
      this.$activeTab.removeClass('transitioning active');

      this.$activeTab = $($newTab.attr("for"));
      this.$activeTab.addClass('active transitioning');

      setTimeout(function() {
        this.$activeTab.removeClass('transitioning');
      }.bind(this), 0);
    }.bind(this));
  };

  $.fn.tabs = function () {
    return this.each(function () {
      new $.Tabs(this);
    });
  };
})(jQuery);
