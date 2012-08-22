define(["templates", "backbone", "components"], function(Templates, Backbone, Components) {

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
            this.$el.append(Templates[name][itemType](_.extend({currency : this.options.currency.toJSON()}, this.model.toJSON())));
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
        render : function() {
            (this.type) || (this.type = ListItemView); // For testing purposes
            var name     = this.options.templateName,
                currency = this.options.currency,
                itemType = this.options.itemType,
                $this    = this;


            // Set the view's class
            this.$el.addClass("basic " + itemType + "s");

            // Render each item and append it
            this.collection.each(function(item) {
                var view = new $this.type({
                    model        : item,
                    templateName : name,
                    currency     : currency,
                    itemType     : itemType
                }).on("selected", function(model) {
                    $this.trigger("selected", model);
                });
                $this.subViews.push(view);
                $this.$el.append(view.render().el);
            });
            return this;
        }
    });

    var CollectionGridView = BaseCollectionView.extend({
        render : function() {
            (this.type) || (this.type = GridItemView); // For testing purposes
            var name     = this.options.templateName,
                currency = this.options.currency,
                itemType = this.options.itemType,
                rows     = this.options.templateProperties.rows,
                columns  = this.options.templateProperties.columns,
                $this    = this;

            // Set the view's class
            this.$el.addClass("grid " + itemType + "s");

            // Render each item and append it
            var currentRow;
            this.collection.each(function(item, i) {
                if (i % columns == 0) {
                    currentRow = $("<div>", {class : "row"});
                    $this.$el.append(currentRow);
                }
                var view = new $this.type({
                    model : item,
                    templateName : name,
                    currency     : currency,
                    type         : GridItemView,
                    itemType     : itemType
                }).on("selected", function(model) {
                    $this.trigger("selected", model);
                });
                $this.subViews.push(view);
                currentRow.append(view.render().el);
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

            this.VirtualGoodsView   = this.options.VirtualGoodsView  || viewType;
            this.CurrencyPacksView  = this.options.CurrencyPacksView || viewType;
            this.nativeAPI          = this.options.nativeAPI         || window.SoomlaNative;

            this.model.on("change:background", this.renderBackground);
            this.model.on("change:templateName", this.renderTemplate);
            this.model.on("change:moreCurrencyText change:templateTitle", this.render);
            this.model.get("currency").on("change:balance", this.updateBalance);
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
        updateBalance : function() {
            this.$(".header .balance label").html(this.model.getBalance());
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
        openDialog : function() {
            new Components.ModalDialog({
                parent : this.$el,
                model : this.model.get("currency")
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
            this.$el.empty().append(Templates[name].template(this.model.toJSON()));


            // TODO: Release previous view bindings
            this.itemsView = new CollectionListView({
                el : $("#goods-store .items"),
                collection : this.model.get("virtualGoods"),
                templateName : this.model.get("templateName")
            });
        },
        render : function() {
            var name = this.model.get("templateName");
            this.$el.empty().append(Templates[name].template(this.model.toJSON()));
            this.$("#currency-store").css("visibility", "hidden");

            // Render goods store items
            this.virtualGoodsView = new this.VirtualGoodsView({
                el : $("#goods-store .items"),
                collection          : this.model.get("virtualGoods"),
                templateName        : this.model.get("templateName"),
                templateProperties  : this.model.get("templateProperties"),
                currency            : this.model.get("currency"),
                itemType            : "virtualGood"
            }).on("selected", this.wantsToBuyVirtualGoods).render();

            // Render currency store items
            // TODO: Render currecny instead of goods
            this.currencyPacksView = new this.CurrencyPacksView({
                el : $("#currency-store .items"),
                collection          : this.model.get("currencyPacks"),
                templateName        : this.model.get("templateName"),
                templateProperties  : this.model.get("templateProperties"),
                currency            : this.model.get("currency"),
                itemType            : "currencyPack"
            }).on("selected", this.wantsToBuyCurrencyPacks).render();

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