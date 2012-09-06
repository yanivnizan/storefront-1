(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['muffinRush-template'] = template(function (Handlebars,depth0,helpers,partials,data) {
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
  buffer += "\n            <div class=\"container\">\n                <label>";
  stack1 = depth0.balance;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</label>\n            </div>\n            ";
  return buffer;}

  buffer += "<div id=\"goods-store\" data-role=\"page\">\n    <img src=\"";
  foundHelper = helpers.background;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.background; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"background\">\n    <div class=\"header\">\n        <div class=\"title\">\n            <img src=\"examples/muffinRush/Store_Store.png\">\n        </div>\n        <div class=\"balance-container\">\n            <div class=\"balance\">\n                <img src=\"examples/muffinRush/YourMuf.png\">\n                ";
  stack1 = depth0.virtualCurrencies;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        </div>\n    </div>\n    <div class=\"items-container\">\n    </div>\n    <div class=\"footer\">\n        <div>\n            <img src=\"examples/muffinRush/back.png\" class=\"leave-store\">\n        </div>\n        <div>\n            <img src=\"";
  foundHelper = helpers.moreCurrencyImage;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.moreCurrencyImage; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"currency buy-more\">\n        </div>\n    </div>\n</div>\n<div id=\"currency-store\" data-role=\"page\">\n    <img src=\"";
  foundHelper = helpers.background;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.background; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"background\">\n    <div class=\"header\">\n        <div class=\"title\">\n            <img src=\"examples/muffinRush/Store_Store.png\">\n        </div>\n        <div class=\"balance\">\n            <img src=\"examples/muffinRush/YourMuf.png\">\n            ";
  stack1 = depth0.virtualCurrencies;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n    <div class=\"items-container\">\n    </div>\n    <div class=\"footer\">\n        <div>\n            <img src=\"examples/muffinRush/back.png\" class=\"back\">\n        </div>\n    </div>\n\n</div>\n";
  return buffer;});
})();
