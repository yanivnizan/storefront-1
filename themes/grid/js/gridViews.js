define(["jquery", "backbone", "components", "handlebars", "templates"], function($, Backbone, Components, Handlebars) {

        // Determine which CSS transition event to bind according to the browser vendor
    var transEndEventNames = {
        'WebkitTransition' : 'webkitTransitionEnd',
        'MozTransition'    : 'transitionend',
        'OTransition'      : 'oTransitionEnd',
        'msTransition'     : 'MSTransitionEnd',
        'transition'       : 'transitionend'
    },
    transitionend = transEndEventNames[ Modernizr.prefixed('transition') ];


    var StoreView = Backbone.View.extend({
        initialize : function() {
            _.bindAll(this, "wantsToLeaveStore", "updateBalance",
                            "render", "showCurrencyStore", "showGoodsStore", "openDialog",
                            "wantsToBuyVirtualGoods", "wantsToBuyCurrencyPacks");

            this.nativeAPI  = this.options.nativeAPI || window.SoomlaNative;
            this.theme      = this.model.get("theme");

            this.model.on("change:moreCurrencyText change:templateTitle", this.render);
            this.model.get("virtualCurrencies").on("change:balance", this.updateBalance); // TODO: Fix

            // Initialize sub-views, but defer providing an "el" until the rendering phase
            // This will enable us to construct the view objects once and then render as many times
            // as we like without losing the jQuery bindings each time.
            // Based on: http://ianstormtaylor.com/rendering-views-in-backbonejs-isnt-always-simple/
            this.virtualGoodsView = new Components.CollectionGridView({
                className           : "items virtualGoods",
                collection          : this.model.get("virtualGoods"),
                template            : Handlebars.getTemplate("themes/" + this.theme.name + "/templates", "item"),
                templateProperties  : {columns : this.theme.pages.goods.columns}
            }).on("selected", this.wantsToBuyVirtualGoods);
            this.currencyPacksView = new Components.CollectionListView({
                className           : "items currencyPacks",
                collection          : this.model.get("currencyPacks"),
                template            : Handlebars.getTemplate("themes/" + this.theme.name + "/templates", "currencyPack"),
                templateProperties  : {}
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
                model : this.theme.pages.goods.noFundsModal,
                template : Handlebars.getTemplate("themes/" + this.theme.name + "/templates", "modalDialog")
            }).render().on("closed", function(command) {
                if (command == "buyMore") this.showCurrencyStore();
            }, this);
            return this;
        },
        render : function() {
            var context = _.extend({}, this.theme, {currencies : this.model.get("virtualCurrencies").toJSON()});
            this.$el.html(this.options.template(context));
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