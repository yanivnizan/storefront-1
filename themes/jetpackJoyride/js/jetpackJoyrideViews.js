define(["jquery", "backbone", "components", "viewMixins", "cssUtils", "handlebars", "templates"], function($, Backbone, Components, ViewMixins, CssUtils, Handlebars) {

    var StoreView = Backbone.View.extend({
        initialize : function() {
            _.bindAll(this, "wantsToLeaveStore", "updateBalance",
                            "render", "showCurrencyStore", "showGoodsStore", "openDialog",
                            "switchCategory", "showMenu",
                            "wantsToBuyVirtualGoods", "wantsToBuyCurrencyPacks");

            this.nativeAPI  = this.options.nativeAPI || window.SoomlaNative;
            this.theme      = this.model.get("theme");

            this.model.get("virtualCurrencies").on("change:balance", this.updateBalance); // TODO: Fix


            var virtualGoods  = this.model.get("virtualGoods"),
                currencyPacks = this.model.get("currencyPacks"),
                $this = this;

            // Add UI rendering properties to models.
            virtualGoods.each(function(good) { good.set("itemBackground", $this.theme.pages.goods.listItem.itemBackground); });
            currencyPacks.each(function(pack) { pack.set("itemBackground", $this.theme.pages.currencyPacks.listItem.itemBackground); });

            this.currencyPacksView = new Components.CollectionListView({
                className           : "items currencyPacks category",
                collection          : currencyPacks,
                template            : Handlebars.getTemplate("themes/" + this.theme.name + "/templates", "item"),
                templateProperties  : {},
                css                 : { "background-image" : "url('" + this.theme.pages.currencyPacks.listItem.background + "')" }
            }).on("selected", this.wantsToBuyCurrencyPacks);

            var categories = new Backbone.Collection(this.model.get("categories"));


            this.pageViews = [];
            categories.each(function(category) {

                var categoryGoods = virtualGoods.filter(function(item) {return item.get("categoryId") == category.id});
                categoryGoods = new Backbone.Collection(categoryGoods);
                var categoryName = category.get("name");

                var view = new Components.CollectionListView({
                    className           : "items virtualGoods category " + categoryName,
                    category            : category,
                    collection          : categoryGoods,
                    template            : Handlebars.getTemplate("themes/" + $this.theme.name + "/templates", "item"),
                    templateProperties  : {},
                    css                 : { "background-image" : "url('" + $this.theme.pages[categoryName].listItem.background + "')" }
                }).on("selected", $this.wantsToBuyVirtualGoods);

                $this.pageViews.push(view);
            });
            this.pageViews.push(this.currencyPacksView);

            categories.add({name : "currencyPacks"});
            this.categoryMenuView = new Components.CollectionGridView({
                className           : "items virtualGoods",
                collection          : categories,
                template            : Handlebars.getTemplate("themes/" + this.theme.name + "/templates", "item"),
                templateProperties  : {columns : 4}
            }).on("selected", this.switchCategory);



            var HeaderView = Backbone.View.extend({
                initialize : function() {
                    _.bindAll(this, "switchHeader");
                },
                events : {
                    "click .back" : function() {
                        this.trigger("back");
                    }
                },
                switchHeader : function(image) {
                    this.$(".title-image").attr("src", image)
                }
            });
            this.header = new HeaderView().on("back", this.showMenu);




        },
        events : {
            "touchend .leave-store" : "wantsToLeaveStore",
            "touchend .buy-more"    : "showCurrencyStore",
            "touchend .back"        : "showGoodsStore"
        },
        switchCategory : function(model) {
            var category = model.get("name");
            this.$(".menu").hide();
            this.$(".category").hide();
            this.$(".category." + category).show();
            this.header.switchHeader(this.theme.pages[category].title);
        },
        showMenu : function() {
            this.$(".menu").show();
            this.$(".category").hide();
            this.header.switchHeader(this.theme.pages.menu.title);
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
        render : function() {
            var context = _.extend({}, this.theme, {currencies : this.model.get("virtualCurrencies").toJSON()});
            this.$el.html(this.options.template(context));
            this.$("#currency-store").css("visibility", "hidden");

            this.header.setElement(this.$(".header"));

            // Render subviews (items in goods store and currency store)
//            this.$("#goods-store .items-container").html(this.virtualGoodsView.render().el);
//            this.$("#currency-store .items-container").html(this.currencyPacksView.render().el);
            this.$(".menu").html(this.categoryMenuView.render().el);

            var $this = this;
            _.each(this.pageViews, function(view) {
                $this.$(".pages").append(view.render().el);
            });

            return this;
        }
    });
    _.extend(StoreView.prototype, ViewMixins);


    return {
        StoreView : StoreView
    };
});