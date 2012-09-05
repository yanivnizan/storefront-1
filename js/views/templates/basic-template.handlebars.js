
Handlebars.templates = Handlebars.templates || {};
Handlebars.templates['basic-template'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n            <span class=\"balance\">\n                ";
  stack1 = depth0.imgFilePath;
  stack2 = helpers['if'];
  tmp1 = self.program(2, program2, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                <label>";
  stack1 = depth0.balance;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.balance", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</label>\n            </span>\n            ";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <img src=\"";
  stack1 = depth0.imgFilePath;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.imgFilePath", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">\n                ";
  return buffer;}

function program4(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n            <span class=\"balance\">\n                ";
  stack1 = depth0.imgFilePath;
  stack2 = helpers['if'];
  tmp1 = self.program(5, program5, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                <label>";
  stack1 = depth0.balance;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.balance", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</label>\n            </span>\n            ";
  return buffer;}
function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <img src=\"";
  stack1 = depth0.imgFilePath;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.imgFilePath", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">\n                ";
  return buffer;}

  buffer += "<div id=\"goods-store\" data-role=\"page\">\n    <img src=\"";
  foundHelper = helpers.background;
  stack1 = foundHelper || depth0.background;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "background", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" class=\"background\">\n    <div class=\"header\">\n        <div class=\"padding left\">\n            ";
  foundHelper = helpers.virtualCurrencies;
  stack1 = foundHelper || depth0.virtualCurrencies;
  stack2 = helpers.each;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        <div class=\"content\">\n            <h1 class=\"title\">\n                ";
  foundHelper = helpers.templateTitle;
  stack1 = foundHelper || depth0.templateTitle;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "templateTitle", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n            </h1>\n        </div>\n        <div class=\"padding right\">\n            <div class=\"leave-store\" title=\"Close\"></div>\n        </div>\n    </div>\n    <div class=\"items-container\">\n        <ul class=\"items\"></ul>\n    </div>\n    <div class=\"footer\">\n        <button class=\"buy-more btn btn-basic-primary\">\n            <h1><img src=\"";
  foundHelper = helpers.moreCurrencyImage;
  stack1 = foundHelper || depth0.moreCurrencyImage;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "moreCurrencyImage", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" class=\"currency\">";
  foundHelper = helpers.moreCurrencyText;
  stack1 = foundHelper || depth0.moreCurrencyText;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "moreCurrencyText", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h1>\n        </button>\n    </div>\n</div>\n<div id=\"currency-store\" data-role=\"page\">\n    <img src=\"";
  foundHelper = helpers.background;
  stack1 = foundHelper || depth0.background;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "background", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" class=\"background\">\n    <div class=\"header\">\n        <div class=\"padding left\">\n            ";
  foundHelper = helpers.virtualCurrencies;
  stack1 = foundHelper || depth0.virtualCurrencies;
  stack2 = helpers.each;
  tmp1 = self.program(4, program4, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        <div class=\"content\">\n            <h1 class=\"title\">\n                ";
  foundHelper = helpers.templateTitle;
  stack1 = foundHelper || depth0.templateTitle;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "templateTitle", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n            </h1>\n        </div>\n        <div class=\"padding right\">\n            <div class=\"back\" title=\"Back\"></div>\n        </div>\n    </div>\n    <div class=\"items-container\">\n        <ul class=\"items\"></ul>\n    </div>\n</div>\n";
  return buffer;});
