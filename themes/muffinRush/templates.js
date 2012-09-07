(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['currencyPack'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"visual\">\n    <img src=\"themes/muffinRush/img/Mapit.png\" class=\"background\">\n    <div class=\"img-container\">\n        <img src=\"";
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


  buffer += "<div class=\"visual\">\n    <img src=\"themes/muffinRush/img/Mapit.png\" class=\"background\">\n    <img src=\"";
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
  


  return "<div class=\"modal\">\n    <div class=\"dialog\">\n        <img src=\"img/default/icons/close-dialog.png\" class=\"close\">\n\n        <img src=\"themes/muffinRush/img/modalDialog/AlertText_Sorry.png\">\n        <img src=\"themes/muffinRush/img/modalDialog/Crumbs.png\">\n        <img src=\"themes/muffinRush/img/modalDialog/AlertText_Question.png\">\n\n        <div class=\"actions\">\n            <img src=\"themes/muffinRush/img/modalDialog/No.png\" class=\"cancel\">\n            <img src=\"themes/muffinRush/img/modalDialog/Yes.png\" class=\"buy-more\">\n        </div>\n    </div>\n</div>\n";});
templates['template'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

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
  foundHelper = helpers.background;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.background; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"background\">\n    <div class=\"header\">\n        <div class=\"title\">\n            <img src=\"themes/muffinRush/img/Store_Store.png\">\n        </div>\n        <div class=\"balance-container\">\n            <div class=\"balance\">\n                <img src=\"themes/muffinRush/img/YourMuf.png\">\n                ";
  stack1 = depth0.virtualCurrencies;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        </div>\n    </div>\n    <div class=\"items-container\">\n    </div>\n    <div class=\"footer\">\n        <div>\n            <img src=\"themes/muffinRush/img/back.png\" class=\"leave-store\">\n        </div>\n        <div>\n            <img src=\"";
  foundHelper = helpers.moreCurrencyImage;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.moreCurrencyImage; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"currency buy-more\">\n        </div>\n    </div>\n</div>\n<div id=\"currency-store\" data-role=\"page\">\n    <img src=\"";
  foundHelper = helpers.background;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.background; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"background\">\n    <div class=\"header\">\n        <div class=\"title\">\n            <img src=\"themes/muffinRush/img/Store_Store.png\">\n        </div>\n        <div class=\"balance-container\">\n            <div class=\"balance\">\n                <img src=\"themes/muffinRush/img/YourMuf.png\">\n                ";
  stack1 = depth0.virtualCurrencies;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        </div>\n    </div>\n    <div class=\"items-container\">\n    </div>\n    <div class=\"footer\">\n        <div>\n            <img src=\"themes/muffinRush/img/back.png\" class=\"back\">\n        </div>\n    </div>\n\n</div>\n";
  return buffer;});
})();
