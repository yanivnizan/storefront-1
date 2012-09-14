(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['currencyPack'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"visual\">\n    <img src=\"";
  foundHelper = helpers.itemBackground;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.itemBackground; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"background\">\n    <div class=\"img-container\">\n        <img src=\"";
  foundHelper = helpers.imgFilePath;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.imgFilePath; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n    </div>\n</div>\n<div class=\"content\">\n    <h1>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n    <div class=\"description\">";
  foundHelper = helpers.description;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n</div>\n<div class=\"price\">\n    <label>";
  foundHelper = helpers.price;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.price; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "$</label>\n</div>\n";
  return buffer;});
templates['item'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"visual\">\n    <img src=\"";
  foundHelper = helpers.itemBackground;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.itemBackground; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"background\">\n    <img src=\"";
  foundHelper = helpers.imgFilePath;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.imgFilePath; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"foreground\">\n    <div class=\"balance\">\n        <label>";
  foundHelper = helpers.balance;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.balance; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</label>\n    </div>\n</div>\n<div class=\"content\">\n    <h1>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n    <div class=\"description\">";
  foundHelper = helpers.description;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n</div>\n<div class=\"price\">\n    <img src=\"";
  stack1 = depth0.currency;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.imgFilePath;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"currency\">\n    <label>";
  foundHelper = helpers.price;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.price; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</label>\n</div>\n";
  return buffer;});
templates['modalDialog'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal\">\n    <div class=\"dialog\">\n        <img src=\"img/default/icons/close-dialog.png\" class=\"close\">\n\n        <img src=\"";
  foundHelper = helpers.description;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n\n        <div class=\"actions\">\n            <img src=\"";
  foundHelper = helpers.noButton;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.noButton; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"cancel\">\n            <img src=\"";
  foundHelper = helpers.yesButton;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.yesButton; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"buy-more\">\n        </div>\n    </div>\n</div>\n";
  return buffer;});
templates['template'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <div class=\"container\">\n                    <label>";
  stack1 = depth0.balance;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</label>\n                </div>\n                ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <div class=\"container\">\n                    <label>";
  stack1 = depth0.balance;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</label>\n                </div>\n                ";
  return buffer;}

  buffer += "<div id=\"goods-store\" data-role=\"page\">\n    <img src=\"";
  stack1 = depth0.pages;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.goods;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.background;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"background\">\n    <div class=\"header\" style=\"background-image: url('";
  stack1 = depth0.pages;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.goods;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.headerBackground;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "');\">\n        <div class=\"title\">\n            <img src=\"";
  stack1 = depth0.pages;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.goods;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.title;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">\n        </div>\n        <div class=\"balance-container\">\n            <div class=\"balance\">\n                <img src=\"";
  stack1 = depth0.pages;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.goods;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.balance;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">\n                ";
  stack1 = depth0.currencies;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        </div>\n    </div>\n    <div class=\"items-container\" style=\"background-image: url('";
  stack1 = depth0.pages;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.goods;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.list;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.background;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "');\">\n    </div>\n    <div class=\"footer\">\n        <div>\n            <img src=\"";
  stack1 = depth0.pages;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.goods;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.backButton;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"leave-store\">\n        </div>\n        <div>\n            <img src=\"";
  stack1 = depth0.pages;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.goods;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.moreCurrencyButton;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"currency buy-more\">\n        </div>\n    </div>\n</div>\n<div id=\"currency-store\" data-role=\"page\">\n    <img src=\"";
  stack1 = depth0.pages;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.currencyPacks;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.background;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"background\">\n    <div class=\"header\" style=\"background-image: url('";
  stack1 = depth0.pages;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.currencyPacks;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.headerBackground;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "');\">\n        <div class=\"title\">\n            <img src=\"";
  stack1 = depth0.pages;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.currencyPacks;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.title;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">\n        </div>\n        <div class=\"balance-container\">\n            <div class=\"balance\">\n                <img src=\"";
  stack1 = depth0.pages;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.currencyPacks;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.balance;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">\n                ";
  stack1 = depth0.currencies;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        </div>\n    </div>\n    <div class=\"items-container\" style=\"background-image: url('";
  stack1 = depth0.pages;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.currencyPacks;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.list;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.background;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "');\">\n    </div>\n    <div class=\"footer\">\n        <div>\n            <img src=\"";
  stack1 = depth0.pages;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.currencyPacks;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.backButton;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"back\">\n        </div>\n    </div>\n\n</div>\n";
  return buffer;});
})();
