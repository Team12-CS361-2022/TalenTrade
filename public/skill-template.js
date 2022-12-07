(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['skill'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<article id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":13},"end":{"line":1,"column":19}}}) : helper)))
    + "\"class=\"skill "
    + alias4(((helper = (helper = lookupProperty(helpers,"person") || (depth0 != null ? lookupProperty(depth0,"person") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"person","hash":{},"data":data,"loc":{"start":{"line":1,"column":33},"end":{"line":1,"column":43}}}) : helper)))
    + "\">\r\n    <h3>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":2,"column":8},"end":{"line":2,"column":17}}}) : helper)))
    + "</h3>\r\n    <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":3,"column":7},"end":{"line":3,"column":15}}}) : helper)))
    + "</p>\r\n    <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"person") || (depth0 != null ? lookupProperty(depth0,"person") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"person","hash":{},"data":data,"loc":{"start":{"line":4,"column":7},"end":{"line":4,"column":17}}}) : helper)))
    + "</p>\r\n</article>";
},"useData":true});
})();