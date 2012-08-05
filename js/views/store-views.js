define(["native-api", "templates"], function(NativeAPI, Templates) {

    var ItemView = Backbone.View.extend({
        className : "item",
        tagName : "li",
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
            return this;
        },
        addItem : function(item) {
            var name = this.options.templateName;
            this.$el.append(Templates[name].item(item.toJSON()));
        },
        render : function() {
            var name = this.options.templateName;
            var currency = this.options.currency;
            var $el = this.$el;

            // Render each item and append it
            this.collection.each(function(item) {
                $el.append(new ItemView({
                    model : item,
                    templateName : name,
                    currency : currency
                }).render().el);
            })
        },
        events : {
            // TODO: Remove for phone
            "mousewheel" : function(event) {
                // TODO: items-container is not in the scope of this view
                var scrollTop = $("#items-container").scrollTop();
                var delta = event.originalEvent.wheelDelta;
                $("#items-container").scrollTop(scrollTop - Math.round(delta));
            }
        }
    });

    var StoreView = Backbone.View.extend({
        initialize : function() {
            _.bindAll(this, "renderBackground", "renderTemplate", "render");
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
            "touchend .buy-more" : function() {
                this.trigger("buyMoreTapped");
            }
        },
        renderBackground : function() {
            this.$(".background").remove();
            var background = $("<img>", {src : this.model.get("background"), class : "background"});
            this.$el.prepend(background);
        },
        renderTemplate : function() {
            var name = this.model.get("templateName");
            this.$("#main").empty().append(Templates[name].template(this.model.toJSON()));


            // TODO: Release previous view bindings
            this.itemsView = new ItemCollectionView({
                el : $(".items"),
                collection : this.model.get("virtualGoods"),
                templateName : this.model.get("templateName")
            });
        },
        render : function() {
            // Render background
            this.$(".background").remove();
            var background = $("<img>", {src : this.model.get("background"), class : "background"});
            this.$el.prepend(background);

            var name = this.model.get("templateName");
            this.$("#main").empty().append(Templates[name].template(this.model.toJSON()));
            this.itemsView = new ItemCollectionView({
                el : $(".items"),
                collection : this.model.get("virtualGoods"),
                templateName : this.model.get("templateName"),
                currency : this.model.get("currency")
            }).render();

            return this;
        }
    });


    return {
        StoreView : StoreView
    };
});