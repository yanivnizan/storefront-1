define(["models", "storeViews"], function(Models, StoreViews) {

    $(function() {

        var Soomla = {
            bindPreview : function(store) {
                var storeView = new StoreViews.StoreView({ model : store });
            },
            newStore : function(props) {
                this.store = new Models.Store(props);
            },
            newStoreFromJSON : function(json) {
                var attributes = {};
                if (json.background) attributes.background = json.background;
                if (json.template) {
                    if (json.template.name)
                        attributes.templateName = json.template.name;
                    if (json.template.elements) {

                        if (json.template.elements.buyMore && json.template.elements.buyMore.text)
                            attributes.moreCurrencyText = json.template.elements.buyMore.text;

                        if (json.template.elements.title && json.template.elements.title.name)
                            attributes.templateTitle = json.template.elements.title.name;
                    }
                }
                if (json.virtualGoods)
                    attributes.virtualGoods = json.virtualGoods;

                if (json.currency)
                    attributes.currency = json.currency;

                this.store = new Models.Store(attributes);
            }
        };

        window.Soomla = Soomla;

    });
});