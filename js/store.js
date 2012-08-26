define(["js-api", "native-api", "models", "storeViews", "components"], function(jsAPI, NativeAPI, Models, StoreViews, Components) {

    // If pointing devices are enable (i.e. in the desktop generator \ mobile preview),
    // extend the views to capture their events.
    if (top.enablePointingDeviceEvents) {
        _.extend(StoreViews.ListItemView.prototype.events, {click : "onSelect"});
        _.extend(StoreViews.StoreView.prototype.events, {
            "click .leave-store"    : "wantsToLeaveStore",
            "click .buy-more"       : "showCurrencyStore",
            "click .back"           : "showGoodsStore"
        });
        _.extend(Components.ModalDialog.prototype.events, {
            "click .close"          : "close",
            "click .modal"          : "close"
        });

    }
    $(function() {

        window.SoomlaJS = _.extend({}, jsAPI, {
            newStore : function(json) {
                var attributes = {};
                if (json) {

                    if (json.background) attributes.background = json.background;
                    if (json.template) {
                        if (json.template.name)
                            attributes.templateName = json.template.name;

                        if (json.template.orientationLandscape)
                            attributes.orientationLandscape = json.template.orientationLandscape;

                        if (json.template.properties)
                            attributes.templateProperties = json.template.properties;
                        if (json.template.elements) {

                            if (json.template.elements.buyMore) {
                                if (json.template.elements.buyMore.text)
                                    attributes.moreCurrencyText = json.template.elements.buyMore.text;
                                if (json.template.elements.buyMore.imgFilePath)
                                    attributes.moreCurrencyImage = json.template.elements.buyMore.imgFilePath;
                            }

                            if (json.template.elements.title && json.template.elements.title.name)
                                attributes.templateTitle = json.template.elements.title.name;
                        }
                    }
                    if (json.virtualGoods)
                        attributes.virtualGoods = json.virtualGoods;

                    if (json.currencyPacks)
                        attributes.currencyPacks = json.currencyPacks;

                    if (json.currency)
                        attributes.currency = json.currency;

                    if (json.isCurrencyStoreDisabled)
                        attributes.isCurrencyStoreDisabled = json.isCurrencyStoreDisabled;
                }

                this.store = new Models.Store(attributes);
            },
            // The native UI is loaded and the html needs to be rendered now
            initialize : function(json) {
                this.newStore(json);
                this.storeView = new StoreViews.StoreView({
                    model : this.store,
                    el : $("#main"),
                    callbacks : json ? json.callbacks : {}
                }).render();
                return this.store;
            }
        });

        // Notify native code that we're initialized only if an interface exists
        // i.e. only when running in a device and not in the store builder.
        var SoomlaNative = window.SoomlaNative;
        if (SoomlaNative && SoomlaNative.pageInitialized) SoomlaNative.pageInitialized();

    });
});