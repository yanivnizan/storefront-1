define(["jquery", "backbone", "modalComponent"], function($, Backbone) {

    var ModalDialog = Backbone.View.extend({
        className : "modal-container",
        events : {
            "touchend .close"    : "close",
            "touchend .modal"    : "close",
            "touchend .buy-more" : "close",
            "touchend .cancel"   : "close"
        },
        close : function(event) {
            this.remove();

            // Decide which command to dispatch as an argument according to the
            // target element's class
            var target  = $(event.target),
                command = (target && target.hasClass("buy-more")) ? "buyMore" : "cancel";

            // Finally, notify observers that the dialog is closing and detach
            // any remaining event handlers.
            this.trigger("closed", command).off();

            return this;
        },
        initialize : function() {
            _.bindAll(this, "close");
        },
        template : Handlebars.templates["modal-component"],
        render : function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.options.parent.append(this.$el);
            return this;
        }
    });

    var ListItemView = Backbone.View.extend({
        initialize : function() {
            _.bindAll(this, "onSelect", "render");
            this.template = this.options.template;
            this.model.on("change:balance change:price change:currency", this.render);
        },
        className : "item",
        tagName : "li",
        events : {
            "touchend" : "onSelect"
        },
        onSelect : function() {
            this.trigger("selected", this.model);
        },
        render : function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var GridItemView = ListItemView.extend({
        tagName : "div"
    });

    return {
        ListItemView : ListItemView,
        GridItemView : GridItemView,
        ModalDialog  : ModalDialog
    };
});