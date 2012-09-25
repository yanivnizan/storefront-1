define(["jquery", "backbone"], function($, Backbone) {

    var BaseView = Backbone.View.extend({
        // Get the template for this view
        // instance. You can set a `template` attribute in the view
        // definition or pass a `template: "whatever"` parameter in
        // to the constructor options.
        getTemplate: function(){
            var template;

            // Get the template from `this.options.template` or
            // `this.template`. The `options` takes precedence.
            if (this.options && this.options.template){
                template = this.options.template;
            } else {
                template = this.template;
            }

            return template;
        },
        // Configure `triggers` to forward DOM events to view
        // events. `triggers: {"click .foo": "do:foo"}`
        configureTriggers: function(){
            if (!this.triggers) { return; }

            var triggers = this.triggers;
            var that = this;
            var triggerEvents = {};

            // Allow `triggers` to be configured as a function
            if (_.isFunction(triggers)){ triggers = triggers.call(this); }

            // Configure the triggers, prevent default
            // action and stop propagation of DOM events
            _.each(triggers, function(value, key){

                triggerEvents[key] = function(e){
                    if (e && e.preventDefault){ e.preventDefault(); }
                    if (e && e.stopPropagation){ e.stopPropagation(); }
                    that.trigger(value, that.model);
                };

            });

            return triggerEvents;
        },
        // Overriding Backbone.View's delegateEvents specifically
        // to handle the `triggers` configuration
        delegateEvents: function(events){
            events = events || this.events;
            if (_.isFunction(events)){ events = events.call(this); }

            var combinedEvents = {};
            var triggers = this.configureTriggers();
            _.extend(combinedEvents, events, triggers);

            Backbone.View.prototype.delegateEvents.call(this, combinedEvents);
        },
        bubbleEventsTo : function(targetView) {
            this.on("all", function() {
                Backbone.Events.trigger.apply(targetView, arguments);
            });
            return this;
        }
    });

    var ModalDialog = BaseView.extend({
        className : "modal-container",
        initialize : function() {
            _.bindAll(this, "close");
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
            this.$el.html(this.getTemplate()(this.model));
            this.options.parent.append(this.$el);
            return this;
        }
    });

    var ListItemView = BaseView.extend({
        className : "item",
        tagName : "li",
        constructor : function() {
            BaseView.prototype.constructor.apply(this, arguments);
            _.bindAll(this, "render");
            this.model.on("change:balance change:price change:currency", this.render);
        },
        triggers : {
            touchend : "selected"
        },
        render : function() {
            if (this.options.css) this.$el.css(this.options.css);
            this.$el.html(this.getTemplate()(this.model.toJSON()));
            return this;
        }
    });

    var GridItemView = ListItemView.extend({
        tagName : "div"
    });

    // TODO: Write unit test for this component
    var ExpandableListItemView = ListItemView.extend({
        constructor : function(options) {
            ListItemView.prototype.constructor.apply(this, arguments);
            _.bindAll(this, "onSelect");
            this.model.on("change:equipped", this.render);

            this.expanded = false;
            this.lastEventTime = -(this.eventInterval * 10); // Initial value for allowing first expand
        },
        events : {
            "touchend"      : "onSelect"
        },
        triggers : {
            "touchend .buy" : "bought"
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
        eventInterval : 500
    });


    ////////////////////  Collection Views  /////////////////////

    var BaseCollectionView = BaseView.extend({
        initialize : function(options) {
            this.subViews = []; // expose sub views for testing purposes
        },
        // Retrieve the itemView type, either from `this.options.itemView`
        // or from the `itemView` in the object definition. The "options"
        // takes precedence.
        getItemView : function(){
            var itemView = this.options.itemView || this.itemView;

            if (!itemView){
                var err = new Error("An `itemView` must be specified");
                err.name = "NoItemViewError";
                throw err;
            }
            return itemView;
        }
    });

    var CollectionListView = BaseCollectionView.extend({
        tagName : "ul",
        constructor : function(options) {
            BaseCollectionView.prototype.constructor.apply(this, arguments);
            _.bindAll(this, "adjustWidth");

            // Instantiate subviews
            var $this = this;
            this.collection.each(function(item) {
                var ItemView = $this.getItemView();
                var view = new ItemView({
                    model    : item,
                    template : $this.getTemplate(),
                    css      : $this.options.css
                }).bubbleEventsTo($this);
                $this.subViews.push(view);
            });

            this.orientation = this.options.templateProperties.orientation || "vertical";
        },
        itemView : ListItemView,
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
        constructor : function(options) {
            BaseCollectionView.prototype.constructor.apply(this, arguments);
            _.bindAll(this, "adjustWidth");

            // Instantiate subviews
            var $this = this;
            this.collection.each(function(item) {
                var ItemView = $this.getItemView();
                var view = new ItemView({
                    model    : item,
                    template : $this.getTemplate(),
                    css      : $this.options.css
                }).bubbleEventsTo($this);
                $this.subViews.push(view);
            });
        },
        itemView : GridItemView,
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

    // TODO: Write unit test for this component
    var BaseStoreView = Backbone.View.extend({
        serializeData : function() {
            return _.extend({}, this.theme, {currencies : this.model.get("virtualCurrencies").toJSON()});
        }
    });

    return {
        BaseView                : BaseView,
        ListItemView            : ListItemView,
        ExpandableListItemView  : ExpandableListItemView,
        GridItemView            : GridItemView,
        ModalDialog             : ModalDialog,
        BaseCollectionView      : BaseCollectionView,
        CollectionListView      : CollectionListView,
        CollectionGridView      : CollectionGridView,
        BaseStoreView           : BaseStoreView
    };
});