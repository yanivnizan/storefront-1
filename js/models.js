define(function() {
    var Currency = Backbone.RelationalModel.extend({
        defaults : {
            name : "coins",
            balance : 0
        }
    });
    window.Currency = Currency;


    var Store = Backbone.RelationalModel.extend({
        relations: [{
            type: Backbone.HasOne,
            key: 'currency',
            relatedModel: Currency,
            reverseRelation: {
                type : Backbone.HasOne,
                key: 'store',
                includeInJSON: 'id'
                // 'relatedModel' is automatically set to 'Zoo'; the 'relationType' to 'HasOne'.
            }
        }],
        defaults : {
            currency            : new Currency(),
            templateTitle       : "Store",
            moreCurrencyText   : "Get more coins"
        },
        initialize : function() {
            _.bindAll(this, "getBalance");
        },
        getBalance : function() {
            return this.get("currency").get("balance");
        }
    });

    var Item = Backbone.Model.extend({});
    var ItemCollection = Backbone.Collection.extend({
        model : Item
    });

    return {
        Item : Item,
        ItemCollection: ItemCollection,
        Store : Store,
        Currency : Currency
    };
});