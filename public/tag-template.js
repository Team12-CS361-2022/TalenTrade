(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['tag'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"tag\" id="
    + alias4(((helper = (helper = lookupProperty(helpers,"Id") || (depth0 != null ? lookupProperty(depth0,"Id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Id","hash":{},"data":data,"loc":{"start":{"line":1,"column":20},"end":{"line":1,"column":26}}}) : helper)))
    + ">"
    + alias4(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":1,"column":27},"end":{"line":1,"column":36}}}) : helper)))
    + "</div>";
},"useData":true});
})();
