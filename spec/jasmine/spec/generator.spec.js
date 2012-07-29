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
                Soomla.newStore({
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
    });

});
