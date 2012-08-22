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


    var Currency = Backbone.RelationalModel.extend({
        defaults : {
            name : "coins",
            balance : 0
        }
    });
    window.Currency = Currency;

    var Store = Backbone.RelationalModel.extend({
        relations: [
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
            moreCurrencyText    : "Get more coins"
        },
        initialize : function() {
            _.bindAll(this, "getBalance", "setBalance", "setVirtualGoodBalance");
        },
        getBalance : function() {
            return this.get("currency").get("balance");
        },
        setBalance : function(balance) {
            this.get("currency").set("balance", balance);
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
        Currency                : Currency
    };
});