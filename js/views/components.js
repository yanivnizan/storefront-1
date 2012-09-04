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


    ////////////////////  Collection Views  /////////////////////

    var BaseCollectionView = Backbone.View.extend({
        initialize : function(options) {
            (options) || (options = {});
            this.type = options.type;
            this.template = options.template;
            this.subViews = []; // expose sub views for testing purposes
        }
    });

    var CollectionListView = BaseCollectionView.extend({
        tagName : "ul",
        initialize : function(options) {
            // Call super constructor
            this.constructor.__super__.initialize.call(this, options);

            _.bindAll(this, "adjustWidth");
            this.orientation = this.options.templateProperties.orientation || "vertical";
        },
        adjustWidth : function() {
            // Assuming that all elements are the same width, take the full width of the first element
            // and multiply it by the number of elements.  The product will be the scrollable container's width
            var elementWidth = this.$(".item:first").outerWidth(true);
            this.$el.css("width", this.collection.length * elementWidth);
        },
        render : function() {
            (this.type) || (this.type = ListItemView); // For testing purposes
            var $this    = this;

            // Render each item and append it
            this.collection.each(function(item) {
                var view = new $this.type({
                    model    : item,
                    template : $this.template
                }).on("selected", function(model) {
                        $this.trigger("selected", model);
                    });
                $this.subViews.push(view);
                view.render().$el.addClass($this.orientation);
                $this.$el.append(view.el);
            });

            if (this.orientation == "horizontal") this.adjustWidth();
            return this;
        }
    });



    return {
        ListItemView        : ListItemView,
        GridItemView        : GridItemView,
        ModalDialog         : ModalDialog,
        BaseCollectionView  : BaseCollectionView,
        CollectionListView  : CollectionListView
    };
});