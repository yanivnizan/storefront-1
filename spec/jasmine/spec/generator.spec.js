define("generator.spec", ["models"], function (Models) {

    describe('Soomla Store', function () {

        beforeEach(function() {
            delete Soomla.store;
        });

        it('should be defined', function () {
            expect(Soomla).toBeDefined();
        });

        it("should create a new store", function () {
            expect(Soomla.store).not.toBeDefined();
            Soomla.newStore();
            expect(Soomla.store).toBeDefined();
            expect(Soomla.store).toBeInstanceOf(Models.Store);
        });

        it("should create a store with a background", function () {
            Soomla.newStore({ background:"fish.png" });
            expect(Soomla.store.get("background")).toEqual("fish.png");
        });

        it("should have a default currency", function () {
            Soomla.newStore();
            expect(Soomla.store.get("currency")).toBeInstanceOf(Models.Currency);
        });


        describe('=== Currency', function () {

            beforeEach(function() {
                delete Soomla.store;
            });

            it("should use coins as the default currency name", function () {
                Soomla.newStore();
                expect(Soomla.store.get("currency").get("name")).toEqual("coins");
            });

            it("should't have a default currency image", function() {
                Soomla.newStore();
                expect(Soomla.store.get("currency").get("image")).not.toBeDefined();
            });

            it("should start with a balance of zero", function() {
                Soomla.newStore();
                expect(Soomla.store.getBalance()).toEqual(0);
            });

            it("should create a store with all currency data", function() {
                Soomla.newStoreFromJSON({
                    currency : {
                        name    : "clams",
                        image   : "fish.png",
                        balance : 100
                    }
                });
                expect(Soomla.store.get("currency").get("name")).toEqual("clams");
                expect(Soomla.store.get("currency").get("image")).toEqual("fish.png");
                expect(Soomla.store.getBalance()).toEqual(100);
            });
        });

        describe('=== Background', function () {

            it("shouldn't have a background by default", function() {
                Soomla.newStore();
                expect(Soomla.store.get("background")).not.toBeDefined();
            });

            xit("should fail to save when no background is supplied", function() {
                Soomla.newStore();
                var spy = { errorStub : function(){} };
                spyOn(spy, "errorStub");
                Soomla.store.on("error", spy.errorStub).set({background : ""});
                expect(spy.errorStub).toHaveBeenCalled();
            });

        });

        describe('=== Template', function () {

            beforeEach(function() {
                Soomla.newStore();
            });

            it("should have a default title 'Store'", function() {
                expect(Soomla.store.get("templateTitle")).toEqual("Store");
            });

            it("shouldn't have a title background by default", function() {
                expect(Soomla.store.get("templateTitleBackgroundImage")).not.toBeDefined();
            });

            it("should have a default 'more virtual currency' text", function() {
                expect(Soomla.store.get("moreCurrencyText")).toEqual("Get more coins");
            });

            it("shouldn't have a 'more virtual currency' background by default", function() {
                expect(Soomla.store.get("moreCurrencyBackgroundImage")).not.toBeDefined();
            });
        });

        describe('=== Virtual Goods', function () {

            it("should have an empty virtual goods list by default", function() {
                Soomla.newStore();
                expect(Soomla.store.get("virtualGoods").toJSON()).toEqual([]);
            });

            it("should be able to add virtual goods to a nested collection", function() {
                Soomla.newStore({
                    virtualGoods: [{
                        name : "Rip Curl Shortboard",
                        description : "Shred the small waves with this super-fast board",
                        image : "img/boards/rip-curl.jpg",
                        price : 100,
                        productId : 2988822
                    }]
                });
                expect(Soomla.store.get("virtualGoods").length).toEqual(1);
                expect(Soomla.store.get("virtualGoods").at(0)).toBeInstanceOf(Models.VirtualGood);
            });

            // TODO: More tests on default field values and validation
        });

        describe('Input JSON parsing', function () {

            it("should accept background", function() {
                Soomla.newStoreFromJSON({
                    background : "fish.jpg"
                });
                expect(Soomla.store.get("background")).toEqual("fish.jpg");
            });

            it("should accept nested template.name", function() {
                Soomla.newStoreFromJSON({
                    template : {
                        name : "basic"
                    }
                });
                expect(Soomla.store.get("templateName")).toEqual("basic");
            });

            it("should accept nested template.elements.buyMore.text", function() {
                Soomla.newStoreFromJSON({
                    template : {
                        elements : {
                            buyMore : {
                                text : "Buy more clams"
                            }
                        }
                    }
                });
                expect(Soomla.store.get("moreCurrencyText")).toEqual("Buy more clams");
            });

            it("should accept nested template.elements.title.name", function() {
                Soomla.newStoreFromJSON({
                    template : {
                        elements : {
                            title : {
                                name : "Surf Shop"
                            }
                        }
                    }
                });
                expect(Soomla.store.get("templateTitle")).toEqual("Surf Shop");
            });

            it("should accept an array of virtual goods", function() {
                var virtualGood = {
                    name : "Rip Curl Shortboard",
                    description : "Shred the small waves with this super-fast board",
                    image : "img/boards/rip-curl.jpg",
                    price : 100,
                    productId : 2988822
                };
                Soomla.newStoreFromJSON({
                    virtualGoods : [virtualGood]
                });
                expect(Soomla.store.get("virtualGoods").at(0).toJSON()).toEqual(virtualGood);
                expect(Soomla.store.get("virtualGoods").length).toEqual(1);
            });
        });


    });

});
