define(["native-api", "templates"], function(NativeAPI, Templates) {

    var ItemView = Backbone.View.extend({
        className : "item",
        tagName : "li",
        events : {
            "touchend" : function() {
                this.trigger("tapped", this.model);
            }
        },
        render : function() {
            var name = this.options.templateName;
            this.$el.append(Templates[name].item(_.extend({currency : this.options.currency.toJSON()}, this.model.toJSON())));
            return this;
        }
    });

    // TODO: Change naming or move, to prevent name confusion with other ItemCollectionView
    var ItemCollectionView = Backbone.View.extend({
        initialize : function(options) {
            _.bindAll(this, "addItem");
            this.collection.on("add", this.addItem);
            this.type = options.type || ItemView;
            return this;
        },
        addItem : function(item) {
            var name = this.options.templateName;
            this.$el.append(Templates[name].item(item.toJSON()));
        },
        render : function() {
            var name     = this.options.templateName,
                currency = this.options.currency,
                $this    = this;

            // expose sub views for testing purposes
            this.subViews = [];

            // Render each item and append it
            this.collection.each(function(item) {
                var view = new $this.type({
                    model : item,
                    templateName : name,
                    currency : currency
                }).on("tapped", function(model) {
                    $this.trigger("selected", model);
                });
                $this.subViews.push(view);
                $this.$el.append(view.render().el);
            });
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

    var StoreView = Backbone.View.extend({
        initialize : function() {
            _.bindAll(this, "renderBackground", "renderTemplate", "render", "showCurrencyStore", "wantsToBuyVirtualGoods");
            this.VirtualGoodsView   = this.options.VirtualGoodsView  || ItemCollectionView;
            this.CurrencyPacksView  = this.options.CurrencyPacksView || ItemCollectionView;
            this.nativeAPI          = this.options.nativeAPI         || window.SoomlaNative;

            this.model.on("change:background", this.renderBackground);
            this.model.on("change:templateName", this.renderTemplate);
            this.model.on("change:moreCurrencyText change:templateTitle", this.render);
        },
        events : {
            "touchend .leave-store" : function(event) {
                if (this.options.callbacks && this.options.callbacks.beforeLeave) this.options.callbacks.beforeLeave();
                event.preventDefault();

                // TODO: Release view bindings and destroy view
                NativeAPI.destroy();
            },
            "touchend .buy-more" : "showCurrencyStore"
        },
        showCurrencyStore : function() {
            this.$("#goods-store").hide();
            this.$("#currency-store").show();
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
            this.itemsView = new ItemCollectionView({
                el : $("#goods-store .items"),
                collection : this.model.get("virtualGoods"),
                templateName : this.model.get("templateName")
            });
        },
        render : function() {
            var name = this.model.get("templateName");
            this.$el.empty().append(Templates[name].template(this.model.toJSON()));

            // Render goods store items
            this.virtualGoodsView = new this.VirtualGoodsView({
                el : $("#goods-store .items"),
                collection : this.model.get("virtualGoods"),
                templateName : this.model.get("templateName"),
                currency : this.model.get("currency")
            }).on("selected", this.wantsToBuyVirtualGoods).render();

            // Render currency store items
            // TODO: Render currecny instead of goods
            this.currencyPacksView = new this.CurrencyPacksView({
                el : $("#currency-store .items"),
                collection : this.model.get("virtualGoods"),
                templateName : this.model.get("templateName"),
                currency : this.model.get("currency")
            }).render();

            return this;
        },
        wantsToBuyVirtualGoods : function(model) {
            this.nativeAPI.wantsToBuyVirtualGoods(model);
        }
    });


    return {
        StoreView : StoreView,
        ItemCollectionView : ItemCollectionView,
        ItemView : ItemView
    };
});