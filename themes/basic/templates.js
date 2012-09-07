(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['basic-currencyPack'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"visual\">\n    <img src=\"";
  foundHelper = helpers.imgFilePath;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.imgFilePath; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"currency\">\n    <!-- TODO: Add an image of the currency icon -->\n    <h2>";
  foundHelper = helpers.amount;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.amount; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h2>\n</div>\n<h1 class=\"content\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n<div class=\"buy\">\n    <span class=\"price\">";
  foundHelper = helpers.price;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.price; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "$</span>\n</div>\n";
  return buffer;});
templates['basic-item'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"visual\">\n    <img src=\"";
  foundHelper = helpers.imgFilePath;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.imgFilePath; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n</div>\n<div class=\"content\">\n    <h1>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n    <div class=\"description\">";
  foundHelper = helpers.description;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n    <div class=\"box-horizontal\">\n        <div class=\"balance\">Owned: <label>";
  foundHelper = helpers.balance;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.balance; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</label></div>\n        <div class=\"price\">\n            <label>";
  foundHelper = helpers.price;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.price; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</label>\n            <img src=\"";
  stack1 = depth0.currency;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.imgFilePath;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"currency\">\n        </div>\n    </div>\n</div>\n";
  return buffer;});
templates['basic-template'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <span class=\"balance\">\n                ";
  stack1 = depth0.imgFilePath;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                <label>";
  stack1 = depth0.balance;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</label>\n            </span>\n            ";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <img src=\"";
  stack1 = depth0.imgFilePath;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">\n                ";
  return buffer;}

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <span class=\"balance\">\n                ";
  stack1 = depth0.imgFilePath;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                <label>";
  stack1 = depth0.balance;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</label>\n            </span>\n            ";
  return buffer;}
function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <img src=\"";
  stack1 = depth0.imgFilePath;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">\n                ";
  return buffer;}

  buffer += "<div id=\"goods-store\" data-role=\"page\">\n    <img src=\"";
  foundHelper = helpers.background;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.background; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"background\">\n    <div class=\"header\">\n        <div class=\"padding left\">\n            ";
  stack1 = depth0.virtualCurrencies;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        <div class=\"content\">\n            <h1 class=\"title\">\n                ";
  foundHelper = helpers.templateTitle;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.templateTitle; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n            </h1>\n        </div>\n        <div class=\"padding right\">\n            <div class=\"leave-store\" title=\"Close\"></div>\n        </div>\n    </div>\n    <div class=\"items-container\">\n        <ul class=\"items\"></ul>\n    </div>\n    <div class=\"footer\">\n        <button class=\"buy-more btn btn-basic-primary\">\n            <h1><img src=\"";
  foundHelper = helpers.moreCurrencyImage;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.moreCurrencyImage; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"currency\">";
  foundHelper = helpers.moreCurrencyText;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.moreCurrencyText; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n        </button>\n    </div>\n</div>\n<div id=\"currency-store\" data-role=\"page\">\n    <img src=\"";
  foundHelper = helpers.background;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.background; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"background\">\n    <div class=\"header\">\n        <div class=\"padding left\">\n            ";
  stack1 = depth0.virtualCurrencies;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        <div class=\"content\">\n            <h1 class=\"title\">\n                ";
  foundHelper = helpers.templateTitle;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.templateTitle; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n            </h1>\n        </div>\n        <div class=\"padding right\">\n            <div class=\"back\" title=\"Back\"></div>\n        </div>\n    </div>\n    <div class=\"items-container\">\n        <ul class=\"items\"></ul>\n    </div>\n</div>\n";
  return buffer;});
})();
