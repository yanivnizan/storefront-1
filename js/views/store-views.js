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


    var ListItemView        = Components.ListItemView,
        GridItemView        = Components.GridItemView,
        BaseCollectionView  = Components.BaseCollectionView
        CollectionListView  = Components.CollectionListView,
        CollectionGridView  = Components.CollectionGridView;


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
            this.model.get("virtualCurrencies").on("change:balance", this.updateBalance); // TODO: Fix

            // Initialize sub-views, but defer providing an "el" until the rendering phase
            // This will enable us to construct the view objects once and then render as many times
            // as we like without losing the jQuery bindings each time.
            // Based on: http://ianstormtaylor.com/rendering-views-in-backbonejs-isnt-always-simple/
            this.virtualGoodsView = new VirtualGoodsView({
                className           : "items virtualGoods",
                collection          : this.model.get("virtualGoods"),
                template            : Templates[name]["virtualGood"],
                templateProperties  : this.model.get("templateProperties")
            }).on("selected", this.wantsToBuyVirtualGoods);
            this.currencyPacksView = new CurrencyPacksView({
                className           : "items currencyPacks",
                collection          : this.model.get("currencyPacks"),
                template            : Templates[name]["currencyPack"],
                templateProperties  : this.model.get("templateProperties")
            }).on("selected", this.wantsToBuyCurrencyPacks);

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

            // Render subviews (items in goods store and currency store)
            this.$("#goods-store .items-container").html(this.virtualGoodsView.render().el);
            this.$("#currency-store .items-container").html(this.currencyPacksView.render().el);

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
        StoreView : StoreView
    };
});