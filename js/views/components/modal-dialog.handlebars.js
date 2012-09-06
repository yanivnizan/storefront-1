
Handlebars.templates = Handlebars.templates || {};
Handlebars.templates['modal-dialog'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal\">\n    <div class=\"dialog\">\n        <img src=\"img/icons/close-dialog.png\" class=\"close\">\n        <h3>Not enough ";
  foundHelper = helpers.name;
  stack1 = foundHelper || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h3>\n        <h4>Buy more ";
  foundHelper = helpers.name;
  stack1 = foundHelper || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "?</h4>\n        <button class=\"cancel btn btn-large\">No</button>\n        <button class=\"buy-more btn btn-large btn-basic-primary\">Yes</button>\n    </div>\n</div>\n";
  return buffer;});
