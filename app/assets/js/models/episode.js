module.exports = Ember.Object.extend({
  markAsWatched: function () {
    window.localStorage.setItem('watched-'+this.get('id'), this.get('watched'));
  }.observes('isWatched')

, isWatched: function () {
    return !!window.localStorage.getItem('watched-'+this.get('id'));
  }.property()

});
