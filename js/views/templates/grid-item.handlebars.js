
Handlebars.templates = Handlebars.templates || {};
Handlebars.templates['grid-item'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"visual\">\n    <img src=\"";
  foundHelper = helpers.imgFilePath;
  stack1 = foundHelper || depth0.imgFilePath;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "imgFilePath", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">\n</div>\n<div class=\"content clearfix\">\n    <h1>";
  foundHelper = helpers.name;
  stack1 = foundHelper || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h1>\n    <div class=\"price\">\n        <label>";
  foundHelper = helpers.price;
  stack1 = foundHelper || depth0.price;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "price", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</label>\n        <img src=\"";
  foundHelper = helpers.currency;
  stack1 = foundHelper || depth0.currency;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.imgFilePath);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "currency.imgFilePath", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" class=\"currency\">\n    </div>\n</div>\n";
  return buffer;});
