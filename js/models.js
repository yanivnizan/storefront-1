define(["backboneRelational"], function() {

    var CurrencyPack            = Backbone.RelationalModel.extend({}),
        VirtualGoodsCollection  = Backbone.Collection.extend({ model : VirtualGood }),
        CurrencyPacksCollection = Backbone.Collection.extend({ model : CurrencyPack });
    var VirtualGood             = Backbone.RelationalModel.extend({
        defaults : {
            inventory   : 0,
            managed     : false
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
                    key: 'belongsTo',
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
            _.bindAll(this, "getBalance", "setBalance");
        },
        getBalance : function() {
            return this.get("currency").get("balance");
        },
        setBalance : function(balance) {
            this.get("currency").set("balance", balance);
        }
    });


    return {
        VirtualGood : VirtualGood,
        CurrencyPack : CurrencyPack,
        Store : Store,
        Currency : Currency
    };
});