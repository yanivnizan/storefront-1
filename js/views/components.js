define(["jquery", "backbone"], function($, Backbone) {

    var ModalDialog = Backbone.View.extend({
        className : "modal-container",
        initialize : function() {
            _.bindAll(this, "close");
            this.template = this.options.template;
        },
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
        render : function() {
            this.$el.html(this.template(this.model));
            this.options.parent.append(this.$el);
            return this;
        }
    });

    var ListItemView = Backbone.View.extend({
        className : "item",
        tagName : "li",
        initialize : function() {
            _.bindAll(this, "onSelect", "render");
            this.template = this.options.template;
            this.model.on("change:balance change:price change:currency", this.render);
        },
        events : {
            "touchend" : "onSelect"
        },
        onSelect : function() {
            this.trigger("selected", this.model);
        },
        render : function() {
            if (this.options.css) this.$el.css(this.options.css);
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var GridItemView = ListItemView.extend({
        tagName : "div"
    });

    // TODO: Write unit test for this component
    var ExpandableListItemView = ListItemView.extend({
        initialize : function(options) {
            // Call super constructor
            this.constructor.__super__.initialize.call(this, options);
            _.bindAll(this, "onBuySelected", "onSelect");
            this.model.on("change:equipped", this.render);

            this.expanded = false;
            this.lastEventTime = -(this.eventInterval * 10); // Initial value for allowing first expand
        },
        events : {
            "touchend"      : "onSelect",
            "touchend .buy" : "onBuySelected"
        },
        onSelect : function() {
            // "touchend" on Android is triggered several times (probably a bug).
            // Protect by setting a minimum interval between events
            var currentTime = new Date().getTime();
            if ((currentTime - this.lastEventTime) < this.eventInterval) return;

            // If the product was already purchase it, now toggle between equipping or not equipping
            if (this.model.get("balance") == 1) {
                this.trigger(this.model.get("equipped") ? "unequipped" : "equipped", this.model);
                return;
            }

            if (this.expanded) {
                this.expanded = false;
                this.$el.removeClass("expanded");
                this.$(".expand-collapse").attr("src", this.model.get("images").expandImage);
            } else {
                this.expanded = true;
                this.$el.addClass("expanded");
                this.$(".expand-collapse").attr("src", this.model.get("images").collapseImage);
            }

            // If the event handler was executed, update the time the event was triggered.
            this.lastEventTime = currentTime;
        },
        onBuySelected : function(event) {
            event.stopPropagation();
            this.trigger("selected", this.model);
        },
        eventInterval : 500
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
            (this.type) || (this.type = ListItemView); // For testing purposes
            _.bindAll(this, "adjustWidth");

            // Instantiate subviews
            var $this = this;
            this.collection.each(function(item) {
                var view = new $this.type({
                    model    : item,
                    template : $this.template,
                    css      : $this.options.css
                }).on("selected", function(model) {
                    $this.trigger("selected", model);
                }).on("equipped", function(model) {
                    $this.trigger("equipped", model);
                }).on("unequipped", function(model) {
                    $this.trigger("unequipped", model);
                });
                $this.subViews.push(view);
            });

            this.orientation = this.options.templateProperties.orientation || "vertical";
        },
        adjustWidth : function() {
            // Assuming that all elements are the same width, take the full width of the first element
            // and multiply it by the number of elements.  The product will be the scrollable container's width
            var elementWidth = this.$(".item:first").outerWidth(true);
            this.$el.css("width", this.collection.length * elementWidth);
        },
        render : function() {
            var $this = this;

            // Render each item and append it
            _.each(this.subViews, function(view) {
                view.render().$el.addClass($this.orientation);
                $this.$el.append(view.el);
            });

            if (this.orientation == "horizontal") this.adjustWidth();
            return this;
        }
    });

    var CollectionGridView = BaseCollectionView.extend({
        initialize : function(options) {
            // Call super constructor
            this.constructor.__super__.initialize.call(this, options);
            (this.type) || (this.type = GridItemView); // For testing purposes
            _.bindAll(this, "adjustWidth");

            // Instantiate subviews
            var $this = this;
            this.collection.each(function(item) {
                var view = new $this.type({
                    model    : item,
                    template : $this.template,
                    css      : $this.options.css
                }).on("selected", function(model) {
                    $this.trigger("selected", model);
                });
                $this.subViews.push(view);
            });
        },
        adjustWidth : function() {

            // Amend element width to create a grid with a variable number of columns, but a uniform width for them.
            // CSS flex box doesn't support a perfect grid like this when elements contain excessive text.
            // Calculation: (container width) / (# of columns) - ( (item width + padding + border + margin) - (item width) )
            // This assumes that the container has no margin, border or padding.

            var columns             = this.options.templateProperties.columns,
                subject             = this.subViews[0].$el,
                trueElementWidth    = (this.$el.width() / columns) - (subject.outerWidth(true) - subject.width());

            _.each(this.subViews, function(subView) {
                subView.$el.css("width", trueElementWidth);
            });
        },
        render : function() {
            (this.type) || (this.type = GridItemView); // For testing purposes
            var columns  = this.options.templateProperties.columns,
                $this    = this;

            // Render each item and append it
            var currentRow;
            _.each(this.subViews, function(view, i) {
                if (i % columns == 0) {
                    currentRow = $("<div>", {class : "row"});
                    $this.$el.append(currentRow);
                }
                currentRow.append(view.render().el);
            });

            // NOTE: Must set timeout 0 to return to event loop, otherwise the styles aren't applied yet and the calculation yields 0
            setTimeout(this.adjustWidth, 0);
            return this;
        }
    });

    return {
        ListItemView            : ListItemView,
        ExpandableListItemView  : ExpandableListItemView,
        GridItemView            : GridItemView,
        ModalDialog             : ModalDialog,
        BaseCollectionView      : BaseCollectionView,
        CollectionListView      : CollectionListView,
        CollectionGridView      : CollectionGridView
    };
});