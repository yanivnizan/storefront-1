
Handlebars.templates = Handlebars.templates || {};
Handlebars.templates['muffinRush-template'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <div class=\"container\">\n                    <label>";
  stack1 = depth0.balance;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.balance", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</label>\n                </div>\n                ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <div class=\"container\">\n                    <label>";
  stack1 = depth0.balance;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.balance", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</label>\n                </div>\n                ";
  return buffer;}

  buffer += "<div id=\"goods-store\" data-role=\"page\">\n    <img src=\"";
  foundHelper = helpers.background;
  stack1 = foundHelper || depth0.background;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "background", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" class=\"background\">\n    <div class=\"header\">\n        <div class=\"title\">\n            <img src=\"examples/muffinRush/Store_Store.png\">\n        </div>\n        <div class=\"balance-container\">\n            <div class=\"balance\">\n                <img src=\"examples/muffinRush/YourMuf.png\">\n                ";
  foundHelper = helpers.virtualCurrencies;
  stack1 = foundHelper || depth0.virtualCurrencies;
  stack2 = helpers.each;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        </div>\n    </div>\n    <div class=\"items-container\">\n    </div>\n    <div class=\"footer\">\n        <div>\n            <img src=\"examples/muffinRush/back.png\" class=\"leave-store\">\n        </div>\n        <div>\n            <img src=\"";
  foundHelper = helpers.moreCurrencyImage;
  stack1 = foundHelper || depth0.moreCurrencyImage;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "moreCurrencyImage", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" class=\"currency buy-more\">\n        </div>\n    </div>\n</div>\n<div id=\"currency-store\" data-role=\"page\">\n    <img src=\"";
  foundHelper = helpers.background;
  stack1 = foundHelper || depth0.background;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "background", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" class=\"background\">\n    <div class=\"header\">\n        <div class=\"title\">\n            <img src=\"examples/muffinRush/Store_Store.png\">\n        </div>\n        <div class=\"balance-container\">\n            <div class=\"balance\">\n                <img src=\"examples/muffinRush/YourMuf.png\">\n                ";
  foundHelper = helpers.virtualCurrencies;
  stack1 = foundHelper || depth0.virtualCurrencies;
  stack2 = helpers.each;
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        </div>\n    </div>\n    <div class=\"items-container\">\n    </div>\n    <div class=\"footer\">\n        <div>\n            <img src=\"examples/muffinRush/back.png\" class=\"back\">\n        </div>\n    </div>\n\n</div>\n";
  return buffer;});
