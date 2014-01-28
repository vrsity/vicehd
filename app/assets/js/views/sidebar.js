var App = require('../app').instance;

App.SidebarView = Ember.View.extend({
  templateName: 'sidebar'
, tagName: 'aside'
, classNames: ['sidebar']
, classNameBindings: ['controller.hasNavbar']
, foo: 'bazsss'
});
