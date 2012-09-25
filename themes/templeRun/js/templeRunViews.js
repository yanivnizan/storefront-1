define(["jquery", "backbone", "components", "viewMixins", "cssUtils", "handlebars", "templates"], function($, Backbone, Components, ViewMixins, CssUtils, Handlebars) {

    var StoreView = Components.BaseStoreView.extend({
        initialize : function() {
            _.bindAll(this, "wantsToLeaveStore", "updateBalance",
                            "render", "showCurrencyStore", "showGoodsStore", "openDialog",
                            "wantsToBuyVirtualGoods", "wantsToBuyCurrencyPacks");

            this.nativeAPI      = this.options.nativeAPI || window.SoomlaNative;
            this.theme          = this.model.get("theme");
            this.categoryViews  = [];

            this.model.get("virtualCurrencies").on("change:balance", this.updateBalance); // TODO: Fix
            var $this        = this,
                categories   = new Backbone.Collection(this.model.get("categories")),
                virtualGoods = this.model.get("virtualGoods");


            // Initialize sub-views, but defer providing an "el" until the rendering phase
            // This will enable us to construct the view objects once and then render as many times
            // as we like without losing the jQuery bindings each time.
            // Based on: http://ianstormtaylor.com/rendering-views-in-backbonejs-isnt-always-simple/
            categories.each(function(category) {
                var categoryGoods = virtualGoods.filter(function(item) {return item.get("categoryId") == category.id});
                categoryGoods = new Backbone.Collection(categoryGoods);

                var view = new Components.SectionedListView({
                    className           : "items virtualGoods",
                    collection          : categoryGoods,
                    categoryTemplate    : Handlebars.getTemplate("themes/" + $this.theme.name + "/templates", "listContainer"),
                    template            : Handlebars.getTemplate("themes/" + $this.theme.name + "/templates", "item"),
                    templateProperties  : {},
                    templateHelpers     :_.extend({category : category.get("name")}, $this.theme.categories),
                    itemTemplateHelpers : {
                        balanceBackground : $this.theme.pages.goods.listItem.balanceBackground,
                        balanceLabelStyle : $this.theme.common.balanceLabelStyle
                    },
                    css                 : { "background-image" : "url('" + $this.theme.pages.goods.listItem.background + "')" }
                }).on("selected", $this.wantsToBuyVirtualGoods);
                $this.categoryViews.push(view);
            });
            this.currencyPacksView = new Components.CollectionListView({
                className           : "items currencyPacks",
                collection          : this.model.get("currencyPacks"),
                template            : Handlebars.getTemplate("themes/" + this.theme.name + "/templates", "currencyPack"),
                templateProperties  : {},
                itemTemplateHelpers : { balanceBackground : this.theme.pages.currencyPacks.listItem.balanceBackground },
                css                 : { "background-image" : "url('" + this.theme.pages.currencyPacks.listItem.background + "')" }
            }).on("selected", this.wantsToBuyCurrencyPacks);

        },
        events : {
            "touchend .leave-store" : "wantsToLeaveStore",
            "touchend .buy-more"    : "showCurrencyStore",
            "touchend .back"        : "showGoodsStore"
        },
        updateBalance : function(model) {
            this.$(".balance-container label").html(model.get("balance"));
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
            this.$("#currency-store").one(CssUtils.getTransitionendEvent(), function(){ $(this).css("visibility", "hidden"); }).removeClass("visible");
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
        onRender : function() {
            var $this = this;
            this.$("#currency-store").css("visibility", "hidden");

            // Render subviews (items in goods store and currency store)
            _.each(this.categoryViews, function(view) {
                $this.$("#goods-store .items-container").append(view.render().el);
            });
            this.$("#currency-store .items-container").html(this.currencyPacksView.render().el);
        }
    });
    _.extend(StoreView.prototype, ViewMixins);

    return {
        StoreView : StoreView
    };
});