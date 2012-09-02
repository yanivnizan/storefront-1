define(["jquery", "templates", "backbone", "components"], function($, Templates, Backbone, Components) {

    // Determine which CSS transition event to bind according to the browser vendor
    var transEndEventNames = {
        'WebkitTransition' : 'webkitTransitionEnd',
        'MozTransition'    : 'transitionend',
        'OTransition'      : 'oTransitionEnd',
        'msTransition'     : 'MSTransitionEnd',
        'transition'       : 'transitionend'
    },
    transitionend = transEndEventNames[ Modernizr.prefixed('transition') ];



    var ListItemView = Backbone.View.extend({
        initialize : function() {
            _.bindAll(this, "onSelect", "updateBalance");
            this.model.on("change:balance", this.updateBalance);
        },
        className : "item",
        tagName : "li",
        events : {
            "touchend" : "onSelect"
        },
        onSelect : function() {
            this.trigger("selected", this.model);
        },
        updateBalance : function() {
            this.$(".balance label").html(this.model.get("balance"));
        },
        render : function() {
            var name     = this.options.templateName,
                itemType = this.options.itemType || "item"; // TODO: Remove once itemType is always passed
            this.$el.append(Templates[name][itemType](this.model.toJSON()));
            return this;
        }
    });

    var GridItemView = ListItemView.extend({
        tagName : "div"
    });


    var BaseCollectionView = Backbone.View.extend({
        initialize : function(options) {
            this.type = options.type;
            this.subViews = []; // expose sub views for testing purposes
            return this;
        },
        events : {
            // TODO: Remove for phone
            "mousewheel" : function(event) {
                // TODO: items-container is not in the scope of this view
                var scrollTop = $(".items-container").scrollTop();
                var delta = event.originalEvent.wheelDelta;
                $(".items-container").scrollTop(scrollTop - Math.round(delta));
            }
        }
    });


    var CollectionListView = BaseCollectionView.extend({
        initialize : function(options) {
            // Call super constructor
            this.constructor.__super__.initialize.apply(this, arguments);

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
            var name     = this.options.templateName,
                itemType = this.options.itemType,
                $this    = this;


            // Set the view's class
            this.$el.addClass(itemType + "s");

            // Render each item and append it
            this.collection.each(function(item) {
                // TODO: Revisit this logic.  It's flawed to manipulate the model inside the view
                if ($this.options.currencies)
                    item.set("currency", $this.options.currencies.get(_.keys(item.get("currencyValue"))[0]).toJSON());

                var view = new $this.type({
                    model        : item,
                    templateName : name,
                    itemType     : itemType
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

    var CollectionGridView = BaseCollectionView.extend({
        render : function() {
            (this.type) || (this.type = GridItemView); // For testing purposes
            var name     = this.options.templateName,
                itemType = this.options.itemType,
                rows     = this.options.templateProperties.rows,
                columns  = this.options.templateProperties.columns,
                $this    = this;

            // Set the view's class
            this.$el.addClass(itemType + "s");

            // Render each item and append it
            var currentRow;
            this.collection.each(function(item, i) {
                if (i % columns == 0) {
                    currentRow = $("<div>", {class : "row"});
                    $this.$el.append(currentRow);
                }
                // TODO: Revisit this logic.  It's flawed to manipulate the model inside the view
                if ($this.options.currencies)
                    item.set("currency", $this.options.currencies.get(_.keys(item.get("currencyValue"))[0]).toJSON());

                var view = new $this.type({
                    model : item,
                    templateName : name,
                    type         : GridItemView,
                    itemType     : itemType
                }).on("selected", function(model) {
                    $this.trigger("selected", model);
                });
                $this.subViews.push(view);
                currentRow.append(view.render().el);
            });

            // Amend element width to create a grid with a variable number of columns, but a uniform width for them.
            // CSS flex box doesn't support a perfect grid like this when elements contain excessive text.
            // Calculation: (container width) / (# of columns) - ( (item width + padding + border + margin) - (item width) )
            // This assumes that the container has no margin, border or padding.
            var subject = this.subViews[0].$el;
            var trueElementWidth = (this.$el.width() / columns) - (subject.outerWidth(true) - subject.width());
            _.each(this.subViews, function(subView) {
                subView.$el.css("max-width", trueElementWidth);
            });

            return this;
        }
    });

    var StoreView = Backbone.View.extend({
        initialize : function() {
            _.bindAll(this, "wantsToLeaveStore", "updateBalance",
                            "renderBackground", "renderTemplate", "render",
                            "showCurrencyStore", "showGoodsStore", "openDialog",
                            "wantsToBuyVirtualGoods", "wantsToBuyCurrencyPacks");

            // untested code block
            var viewType, name = this.model.get("templateName");
            switch(name) {
                case "grid" : viewType = CollectionGridView; break;
                default     : viewType = CollectionListView; break;
            };

            this.nativeAPI          = this.options.nativeAPI         || window.SoomlaNative;
            var VirtualGoodsView    = this.options.VirtualGoodsView  || viewType,
                CurrencyPacksView   = this.options.CurrencyPacksView || viewType;

            this.model.on("change:background", this.renderBackground);
            this.model.on("change:templateName", this.renderTemplate);
            this.model.on("change:moreCurrencyText change:templateTitle", this.render);
            this.model.get("virtualCurrencies").on("change:balance", this.updateBalance);

            // Initialize sub-views, but defer providing an "el" until the rendering phase
            // This will enable us to construct the view objects once and then render as many times
            // as we like without losing the jQuery bindings each time.
            // Based on: http://ianstormtaylor.com/rendering-views-in-backbonejs-isnt-always-simple/
            this.virtualGoodsView = new VirtualGoodsView({
                collection          : this.model.get("virtualGoods"),
                currencies          : this.model.get("virtualCurrencies"),
                templateName        : this.model.get("templateName"),
                templateProperties  : this.model.get("templateProperties"),
                itemType            : "virtualGood"
            });
            this.currencyPacksView = new CurrencyPacksView({
                collection          : this.model.get("currencyPacks"),
                currencies          : this.model.get("virtualCurrencies"),
                templateName        : this.model.get("templateName"),
                templateProperties  : this.model.get("templateProperties"),
                itemType            : "currencyPack"
            });

        },
        events : {
            "touchend .leave-store" : "wantsToLeaveStore",
            "touchend .buy-more"    : "showCurrencyStore",
            "touchend .back"        : "showGoodsStore"
        },
        wantsToLeaveStore : function(event) {
            if (this.options.callbacks && this.options.callbacks.beforeLeave) this.options.callbacks.beforeLeave();
            event.preventDefault();

            // TODO: Release view bindings and destroy view
            this.nativeAPI.wantsToLeaveStore();
        },
        updateBalance : function(model) {
            this.$(".header .balance label").html(model.get("balance"));
        },
        showCurrencyStore : function() {
            // When this flag is raised, there is no connectivity,
            // thus don't show the currency store
            if (this.model.get("isCurrencyStoreDisabled")) {
                alert("Buying more " + this.model.get("currency").get("name") + " is unavailable. Check your internet connectivity and try again.");
            } else {
                this.$("#currency-store").css("visibility", "").addClass("visible");
            }
        },
        showGoodsStore : function() {
            this.$("#currency-store").one(transitionend, function(){ $(this).css("visibility", "hidden"); }).removeClass("visible");
        },
        openDialog : function(currency) {
            new Components.ModalDialog({
                parent : this.$el,
                model : this.model.get("virtualCurrencies").get(currency)
            }).render().on("closed", function(command) {
                if (command == "buyMore") this.showCurrencyStore();
            }, this);
            return this;
        },
        renderBackground : function() {
            this.$(".background").remove();
            var background = $("<img>", {src : this.model.get("background"), class : "background"});
            this.$el.prepend(background);
        },
        renderTemplate : function() {
            var name = this.model.get("templateName");
            this.$el.html(Templates[name].template(this.model.toJSON()));


            // TODO: Release previous view bindings
            this.itemsView = new CollectionListView({
                el : $("#goods-store .items"),
                collection : this.model.get("virtualGoods"),
                templateName : this.model.get("templateName")
            });
        },
        render : function() {
            var name = this.model.get("templateName");
            this.$el.addClass(name).html(Templates[name].template(this.model.toJSON()));
            this.$("#currency-store").css("visibility", "hidden");

            // Render items in goods store and currency store
            // setElement will call delegateEvents internally, see comment in initialize
            this.virtualGoodsView.setElement(this.$("#goods-store .items")).on("selected", this.wantsToBuyVirtualGoods).render();
            this.currencyPacksView.setElement(this.$("#currency-store .items")).on("selected", this.wantsToBuyCurrencyPacks).render();

            return this;
        },
        wantsToBuyVirtualGoods : function(model) {
            this.nativeAPI.wantsToBuyVirtualGoods(model.toJSON().itemId);
        },
        wantsToBuyCurrencyPacks : function(model) {
            this.nativeAPI.wantsToBuyCurrencyPacks(model.toJSON().productId);
        }
    });


    return {
        StoreView : StoreView,
        CollectionListView : CollectionListView,
        ListItemView : ListItemView
    };
});