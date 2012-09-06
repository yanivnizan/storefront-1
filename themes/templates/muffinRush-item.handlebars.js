
Handlebars.templates = Handlebars.templates || {};
Handlebars.templates['muffinRush-item'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"visual\">\n    <img src=\"examples/muffinRush/Mapit.png\" class=\"background\">\n    <img src=\"";
  foundHelper = helpers.imgFilePath;
  stack1 = foundHelper || depth0.imgFilePath;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "imgFilePath", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" class=\"foreground\">\n    <div class=\"balance\">\n        <label>";
  foundHelper = helpers.balance;
  stack1 = foundHelper || depth0.balance;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "balance", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</label>\n    </div>\n</div>\n<div class=\"content\">\n    <h1>";
  foundHelper = helpers.name;
  stack1 = foundHelper || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h1>\n    <div class=\"description\">";
  foundHelper = helpers.description;
  stack1 = foundHelper || depth0.description;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "description", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</div>\n</div>\n<div class=\"price\">\n    <img src=\"";
  foundHelper = helpers.currency;
  stack1 = foundHelper || depth0.currency;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.imgFilePath);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "currency.imgFilePath", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" class=\"currency\">\n    <label>";
  foundHelper = helpers.price;
  stack1 = foundHelper || depth0.price;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "price", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</label>\n</div>\n";
  return buffer;});
