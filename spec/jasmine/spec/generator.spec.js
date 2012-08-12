define("generator.spec", ["models", "native-api"], function (Models, NativeAPI) {

    window.SoomlaNative = NativeAPI;

    var objectFromString = function(str, value) {
        var keys = str.split(".");
        var lastKey = keys.pop();
        var obj, temp;
        obj = temp = {};
        _.each(keys, function(key) { temp[key] = {}; temp = temp[key]; });
        temp[lastKey] = value;
        return obj;
    };

    describe('Soomla Store', function () {

        beforeEach(function() {
            delete SoomlaJS.store;
        });

        it('should be defined', function () {
            expect(SoomlaJS).toBeDefined();
        });

        it("should create a new store", function () {
            expect(SoomlaJS.store).toBeUndefined();
            SoomlaJS.newStore();
            expect(SoomlaJS.store).toBeDefined();
            expect(SoomlaJS.store).toBeInstanceOf(Models.Store);
        });

        it("should create a store with a background", function () {
            SoomlaJS.newStore({ background:"fish.png" });
            expect(SoomlaJS.store.get("background")).toEqual("fish.png");
        });

        it("should have a default currency", function () {
            SoomlaJS.newStore();
            expect(SoomlaJS.store.get("currency")).toBeInstanceOf(Models.Currency);
        });


        describe('=== Currency', function () {

            beforeEach(function() {
                delete SoomlaJS.store;
            });

            it("should use coins as the default currency name", function () {
                SoomlaJS.newStore();
                expect(SoomlaJS.store.get("currency").get("name")).toEqual("coins");
            });

            it("should't have a default currency image", function() {
                SoomlaJS.newStore();
                expect(SoomlaJS.store.get("currency").get("image")).toBeUndefined();
            });

            it("should start with a balance of zero", function() {
                SoomlaJS.newStore();
                expect(SoomlaJS.store.getBalance()).toEqual(0);
            });

            it("should create a store with all currency data", function() {
                SoomlaJS.newStore({
                    currency : {
                        name    : "clams",
                        image   : "fish.png",
                        balance : 100
                    }
                });
                expect(SoomlaJS.store.get("currency").get("name")).toEqual("clams");
                expect(SoomlaJS.store.get("currency").get("image")).toEqual("fish.png");
                expect(SoomlaJS.store.getBalance()).toEqual(100);
            });
        });

        describe('=== Background', function () {

            it("shouldn't have a background by default", function() {
                SoomlaJS.newStore();
                expect(SoomlaJS.store.get("background")).toBeUndefined();
            });

            xit("should fail to save when no background is supplied", function() {
                SoomlaJS.newStore();
                var spy = { errorStub : function(){} };
                spyOn(spy, "errorStub");
                SoomlaJS.store.on("error", spy.errorStub).set({background : ""});
                expect(spy.errorStub).toHaveBeenCalled();
            });

        });

        describe('=== Template', function () {

            beforeEach(function() {
                SoomlaJS.newStore();
            });

            it("should have a default name", function() {
                expect(SoomlaJS.store.get("templateName")).toEqual("basic");
            });

            it("should have a default title 'Store'", function() {
                expect(SoomlaJS.store.get("templateTitle")).toEqual("Store");
            });

            it("shouldn't have a title background by default", function() {
                expect(SoomlaJS.store.get("templateTitleBackgroundImage")).toBeUndefined();
            });

            it("should have a default 'more virtual currency' text", function() {
                expect(SoomlaJS.store.get("moreCurrencyText")).toEqual("Get more coins");
            });

            it("shouldn't have a 'more virtual currency' background by default", function() {
                expect(SoomlaJS.store.get("moreCurrencyBackgroundImage")).toBeUndefined();
            });
        });

        describe('=== Virtual Goods', function () {

            it("should have an empty virtual goods list by default", function() {
                SoomlaJS.newStore();
                expect(SoomlaJS.store.get("virtualGoods").toJSON()).toEqual([]);
            });

            it("should be able to add virtual goods to a nested collection", function() {
                SoomlaJS.newStore({
                    virtualGoods: [{
                        name : "Rip Curl Shortboard",
                        description : "Shred the small waves with this super-fast board",
                        image : "img/boards/rip-curl.jpg",
                        price : 100,
                        productId : 2988822
                    }]
                });
                expect(SoomlaJS.store.get("virtualGoods").length).toEqual(1);
                expect(SoomlaJS.store.get("virtualGoods").at(0)).toBeInstanceOf(Models.VirtualGood);
            });

            // TODO: More tests on default field values and validation
        });

        describe('=== Currency Packs', function () {

            it("should have an empty currency pack list by default", function() {
                SoomlaJS.newStore();
                expect(SoomlaJS.store.get("currencyPacks").toJSON()).toEqual([]);
            });

            it("should be able to add currency packs to a nested collection", function() {
                SoomlaJS.newStore({
                    currencyPacks: [{
                        name : "Super Saver Pack",
                        description : "For you cheap skates...",
                        image : "coin.jpg",
                        itemId : "super_saver_pack",
                        marketItem : "super_saver_pack",
                        price : 2.99,
                        amount : 200
                    }]
                });
                expect(SoomlaJS.store.get("currencyPacks").length).toEqual(1);
                expect(SoomlaJS.store.get("currencyPacks").at(0)).toBeInstanceOf(Models.CurrencyPack);
            });

            // TODO: More tests on default field values and validation
        });

        describe('Input JSON parsing', function () {

            it("should initalize without a JSON argument", function() {
                SoomlaJS.newStore();
                expect(SoomlaJS.store).toBeDefined();
                expect(SoomlaJS.store).toBeInstanceOf(Models.Store);
            });

            it("should accept background", function() {
                SoomlaJS.newStore({
                    background : "fish.jpg"
                });
                expect(SoomlaJS.store.get("background")).toEqual("fish.jpg");
            });

            it("should accept nested template.name", function() {
                SoomlaJS.newStore({
                    template : {
                        name : "basic"
                    }
                });
                expect(SoomlaJS.store.get("templateName")).toEqual("basic");
            });

            it("should accept nested template.elements.buyMore.text", function() {
                SoomlaJS.newStore(objectFromString("template.elements.buyMore.text", "Buy more clams"));
                expect(SoomlaJS.store.get("moreCurrencyText")).toEqual("Buy more clams");
            });

            it("should accept nested template.elements.buyMore.image", function() {
                SoomlaJS.newStore(objectFromString("template.elements.buyMore.image", "img/assets/clam.png"));
                expect(SoomlaJS.store.get("moreCurrencyImage")).toEqual("img/assets/clam.png");
            });

            it("should accept nested template.elements.title.name", function() {
                SoomlaJS.newStore(objectFromString("template.elements.title.name", "Surf Shop"));
                expect(SoomlaJS.store.get("templateTitle")).toEqual("Surf Shop");
            });

            it("should accept nested template.elements.title.name", function() {
                var properties = {rows : 2, columns : 3};
                SoomlaJS.newStore(objectFromString("template.properties", properties));
                expect(SoomlaJS.store.get("templateProperties")).toEqual(properties);
            });

            it("should accept an array of virtual goods", function() {
                var virtualGood = {
                    name : "Rip Curl Shortboard",
                    description : "Shred the small waves with this super-fast board",
                    image : "img/boards/rip-curl.jpg",
                    price : 100,
                    productId : 2988822
                };
                SoomlaJS.newStore({
                    virtualGoods : [virtualGood]
                });
                expect(SoomlaJS.store.get("virtualGoods").at(0).toJSON()).toEqual(virtualGood);
                expect(SoomlaJS.store.get("virtualGoods").length).toEqual(1);
            });

            it("should accept a 'beforeLeave' callback", function() {
                var callbacks = {
                    beforeLeave : function() {}
                };
                SoomlaJS.initialize({ callbacks : callbacks, template : {name : "empty"} });
                expect(SoomlaJS.storeView.options.callbacks.beforeLeave).toEqual(callbacks.beforeLeave);
            });

        });


        describe('=== Native / Javascript API', function () {

            it("should have Soomla Native API functions defined", function() {
                expect(SoomlaNative.wantsToBuyVirtualGoods).toBeDefined();
                expect(SoomlaNative.wantsToBuyCurrencyPacks).toBeDefined();
                expect(SoomlaNative.wantsToLeaveStore).toBeDefined();
            });

            it("should have Soomla Javascript API functions defined", function() {
                expect(SoomlaJS.disableCurrencyStore).toBeDefined();
                expect(SoomlaJS.currencyPurchaseEnded).toBeDefined();
                expect(SoomlaJS.goodsPurchaseEnded).toBeDefined();
                expect(SoomlaJS.destroy).toBeDefined();
                expect(SoomlaJS.refresh).toBeDefined();
            });
        });

    });

});
