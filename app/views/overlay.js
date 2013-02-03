define(['backbone', 'templateMap'], function(Backbone, templates) {

  /**
   * Class: Overlay
   *
   * binds to FeatureCollection reset events.
   * adds the collection to the listbox
   * draws marker with mapbox
   *
   * gets FeatureCollection as collection
   * gets reference to the map
   */
  var Overlay = Backbone.View.extend({

    template: templates.featureInfoModal,

    initialize: function() {

      /*
       * convienience accessor to map
       */
      this.map = this.options.map;

      this.feed = this.options.feed;

      this.feed.on('change', this.render.bind(this));
      setTimeout(this.render.bind(this), 0);
    },

    render: function() {
      if(this.feed.get('visible')) {
        this.show();
      } else {
        this.hide();
      }
    },

    show: function() {
      this.hide();
      this.layer = this.map.addMapLayer(this.feed.collection);
    },

    hide: function() {
      this.map.removeLayer(this.layer);
      delete this.layer;
    }
  });


  return Overlay;

});
