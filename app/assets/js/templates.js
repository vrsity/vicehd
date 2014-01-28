Ember.TEMPLATES["_feed_loader"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class='feed-loader'>\n  <div class=\"rect1\"></div>\n  <div class=\"rect2\"></div>\n  <div class=\"rect3\"></div>\n  <div class=\"rect4\"></div>\n  <div class=\"rect5\"></div>\n</div>\n");
  
});

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.render || (depth0 && depth0.render)),stack1 ? stack1.call(depth0, "sidebar", options) : helperMissing.call(depth0, "render", "sidebar", options))));
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.VideoView", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["feed"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n    <li>\n      <a href='#' ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":list-item episode.active")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "episodeClick", "episode", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashContexts = {'data-id': depth0};
  hashTypes = {'data-id': "STRING"};
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-id': ("episode._id")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n        <img class='thumbnail' ");
  hashContexts = {'src': depth0};
  hashTypes = {'src': "STRING"};
  options = {hash:{
    'src': ("episode.thumbnailUrl")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.bindAttr || (depth0 && depth0.bindAttr)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bindAttr", options))));
  data.buffer.push(" />\n        <div class='info'>\n          <div class='subtitle'>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "episode.showTitle", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n          <div class='title'>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "episode.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n          <div class='meta'>\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "episode.humanDuration", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n           <span class='date'>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "episode.humanDate", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n          </div>\n        </div>\n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "episode.isWatched", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      </a>\n    </li>\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n              <span class='date'>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "episode.humanDuration", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" &middot;</span>\n            ");
  return buffer;
  }

function program4(depth0,data) {
  
  
  data.buffer.push("\n          <span class='is-watched-indicator'></span>\n        ");
  }

  data.buffer.push("<ul>\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "episode", "in", "episodes", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "feed_loader", options) : helperMissing.call(depth0, "partial", "feed_loader", options))));
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["foot"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n  <script src=\"http://player.ooyala.com/v3/YjMwNmI4YjU2MGM5ZWRjMzRmMjljMjc5?platform=html5-priority\"></script>\n  <script src=\"http://www.youtube.com/player_api\"></script>\n");
  }

function program3(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n    window.DATA.episodes = ");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "episodes", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(";\n  ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n    window.DATA.shows = ");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "shows", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(";\n  ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n    window.DATA.show = ");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "show", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(";\n  ");
  return buffer;
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\n<script>\n  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');\n\n  ga('create', 'UA-47370113-1', 'vicehd.com');\n  ga('send', 'pageview');\n</script>\n");
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.unless.call(depth0, "ENV.fastDev", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n\n<script>\n  window.ENV = ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.json || (depth0 && depth0.json)),stack1 ? stack1.call(depth0, "ENV", options) : helperMissing.call(depth0, "json", "ENV", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(";\n  ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "episodes", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n  ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "shows", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n  ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "show", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n</script>\n<script src='/app.js'></script>\n\n");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "ENV.production", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["info"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class='about-content'>\n\n  <h2>\n    ViceHD is the best way to watch Vice videos online.\n  </h2>\n\n  <p>\n  We love <a target='_blank' href='http://vice.com'>Vice</a>’s video content, but we hate the way we have to watch it. The YouTube channel is ok. The website is ok. We wanted something better. So we built something better.\n  </p>\n\n  <h3>Coming Soon</h3>\n  <ul>\n    <li>Better Player UI</li>\n    <li>User Accounts</li>\n    <li>Save videos to watch later</li>\n  </ul>\n\n  <h3>Under the Hood</h3>\n  <ul>\n    <li>\n    Inspiration: <a target='_blank' href='http://vice.com'>Vice</a>, <a target='_blank' href='http://www.vhx.tv/'>VHX</a>, <a target='_blank' href='http://shelby.tv/'>Shelby.tv</a>\n    </li>\n    <li>Built With: <a target='_blank' href='http://nodejs.org/'>Node.js</a>, <a target='_blank' href='http://emberjs.com/'>Ember.js</a>\n    <li>Design: <a target='_blank' href='https://twitter.com/elirousso'>Eli Rousso </a>\n    <li>Development: <a target='_blank' href='https://twitter.com/moudy'>Moudy Elkammash </a>\n    <li>Code: <a target='_blank' href='https://github.com/vrsity/vicehd'>On GitHub </a>\n  </ul>\n\n  <div class='share-area'>\n    <a href=\"https://twitter.com/share\" class=\"twitter-share-button\" data-url=\"vicehd.com\" data-text=\"Check out ViceHD, the best way to watch Vice videos online\" data-hashtags=\"vicehd\">Tweet</a>\n    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>\n  </div>\n</div>\n");
  
});

Ember.TEMPLATES["navbar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n\n  <div class=\"nav-bar-controls\">\n    <a href=\"#\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sortClick", "title", {hash:{},contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":sort-button isSortTitle:active")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Alphabetical</a>\n    <a href=\"#\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sortClick", "newestEpisodeDate", {hash:{},contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":sort-button isSortDate:active")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Most Recent</a>\n  </div>\n\n  <div class=\"nav-bar-show-title\">\n    <a href=\"#\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "tabSelect", "shows", {hash:{},contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"nav-bar-back-button\"></a>\n    <div class=\"show-title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "showTitle", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n  </div>\n\n");
  return buffer;
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "hasNavbar", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  return buffer;
  
});

Ember.TEMPLATES["shows"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n    <li>\n      <a href='#' ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showClick", "show", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashContexts = {'data-id': depth0};
  hashTypes = {'data-id': "STRING"};
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-id': ("show._id")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":list-item show.active")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n        <img class='thumbnail' ");
  hashContexts = {'src': depth0};
  hashTypes = {'src': "STRING"};
  options = {hash:{
    'src': ("show.thumbnailUrl")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.bindAttr || (depth0 && depth0.bindAttr)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bindAttr", options))));
  data.buffer.push(" />\n\n        <div class='info'>\n          <div class='title'>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "show.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n          <div class='description'>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "show.description", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n          <div class='meta'>\n            <span class='date'>Last episode &middot; ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "show.humanDate", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n          </div>\n        </div>\n        <span class='episode-count'>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "show.episodeCount", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n      </a>\n    </li>\n  ");
  return buffer;
  }

  data.buffer.push("<ul>\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "show", "in", "shows", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "feed_loader", options) : helperMissing.call(depth0, "partial", "feed_loader", options))));
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["sidebar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<header class=\"sidebar-header\">\n  <a href='#' ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "tabSelect", "feed", {hash:{},contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"logo ir\">Vice</a>\n</header>\n\n");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NavbarView", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n<div class='sidebar-content'>\n  ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.render || (depth0 && depth0.render)),stack1 ? stack1.call(depth0, "info", options) : helperMissing.call(depth0, "render", "info", options))));
  data.buffer.push("\n  ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.render || (depth0 && depth0.render)),stack1 ? stack1.call(depth0, "shows", options) : helperMissing.call(depth0, "render", "shows", options))));
  data.buffer.push("\n  ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.render || (depth0 && depth0.render)),stack1 ? stack1.call(depth0, "show", options) : helperMissing.call(depth0, "render", "show", options))));
  data.buffer.push("\n  ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.render || (depth0 && depth0.render)),stack1 ? stack1.call(depth0, "feed", options) : helperMissing.call(depth0, "render", "feed", options))));
  data.buffer.push("\n</div>\n\n");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.TabsView", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["tabs"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n  <a href='#' ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "tabSelect", "item.route", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashContexts = {'data-tab': depth0};
  hashTypes = {'data-tab': "ID"};
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-tab': ("item.route")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":tab-bar-item isAcitve")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    <span class='label'>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n  </a>\n");
  return buffer;
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "item", "in", "tabItems", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["video"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push(" &middot; ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "currentEpisode.humanDuration", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n<a ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "expandVideo", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" href='#' class='video-expand'>\n</a>\n");
  return buffer;
  }

  data.buffer.push("<div ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "closeVideo", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class='mobile-video-close-button'>\n  &#10005;\n</div>\n\n<div class='video-iframe-container'>\n  <div id='video-area'></div>\n  <div id='youtube-area'></div>\n</div>\n\n<div class='content-title-overlay'>\n  <div class='content-bg-blanket'></div>\n  <div>\n  <span class='content-title-overlay-show-title'>\n    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "currentEpisode.showTitle", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  </span>\n  </div>\n  <div class='content-title-overlay-episode-title'>\n    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "currentEpisode.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  </div>\n  <div class='content-title-overlay-episode-meta'>\n    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "currentEpisode.humanDate", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "currentEpisode.humanDuration", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div>\n</div>\n\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.unless.call(depth0, "isSmall", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});