define(["backboneRelational"], function() {

    var CurrencyPack            = Backbone.RelationalModel.extend({}),
        VirtualGoodsCollection  = Backbone.Collection.extend({ model : VirtualGood }),
        CurrencyPacksCollection = Backbone.Collection.extend({ model : CurrencyPack });
    var VirtualGood             = Backbone.RelationalModel.extend({
        idAttribute : "itemId",
        defaults : {
            balance     : 0,
            consumable  : true
        },
        initialize : function() {
            _.bindAll(this, "isConsumable");
        },
        isConsumable : function() {
            return this.get("consumable");
        }
    });


    // TODO: Remove
    var Currency = Backbone.RelationalModel.extend({
        defaults : {
            name    : "coins",
            balance : 0,
            itemId  : "store_currency"
        }
    });
    var NewCurrency = Backbone.RelationalModel.extend({
        defaults : {
            name    : "coins",
            balance : 0,
            itemId  : "currency_coin"
        },
        idAttribute : "itemId"
    });
    var CurrencyCollection = Backbone.Collection.extend({ model : NewCurrency });
    window.Currency = Currency; // TODO: Remove

    var Store = Backbone.RelationalModel.extend({
        relations: [
            // TODO: Remove
            {
                type: Backbone.HasOne,
                key: 'currency',
                relatedModel: Currency,
                reverseRelation: {
                    type : Backbone.HasOne,
                    key: 'store',
                    includeInJSON: 'id'
                    // 'relatedModel' is automatically set to 'Zoo'; the 'relationType' to 'HasOne'.
                }
            },
            {
                type: Backbone.HasMany,
                key: 'virtualGoods',
                relatedModel: VirtualGood,
                collectionType: VirtualGoodsCollection,
                reverseRelation: {
                    includeInJSON: 'id'
                }
            },
            {
                type: Backbone.HasMany,
                key: 'virtualCurrencies',
                relatedModel: NewCurrency,
                collectionType: CurrencyCollection,
                reverseRelation: {
                    includeInJSON: 'id'
                }
            },
            {
                type: Backbone.HasMany,
                key: 'currencyPacks',
                relatedModel: CurrencyPack,
                collectionType: CurrencyPacksCollection,
                reverseRelation: {
                    key: 'belongsTo',
                    includeInJSON: 'id'
                }
            }
        ],
        defaults : {
            currency            : new Currency(),
            templateName        : "basic",
            templateTitle       : "Store",
            moreCurrencyText    : "Get more coins",
            orientationLanscape : false,
            templateProperties  : {
                orientation : "horizontal"
            }
        },
        initialize : function() {
            _.bindAll(this, "getNewBalance", "setNewBalance", "setVirtualGoodBalance");
        },
        setNewBalance : function(balances) {
            var model = this.get("virtualCurrencies");
            _.each(balances, function(balance, currency) {
                model.get(currency).set("balance", balance);
            });
            return this;
        },
        getNewBalance : function(currency) {
            return this.get("virtualCurrencies").get(currency).get("balance");
        },
        setVirtualGoodBalance : function(itemId, balance) {
            var virtualGood = this.get("virtualGoods").get(itemId);
            if (virtualGood.isConsumable())
                virtualGood.set("balance", balance);
        }
    });


    return {
        VirtualGood             : VirtualGood,
        VirtualGoodsCollection  : VirtualGoodsCollection,
        CurrencyPack            : CurrencyPack,
        Store                   : Store,
        Currency                : Currency, // TODO: Remove
        NewCurrency             : NewCurrency
    };
});