define("generator.spec", ["models"], function (Models) {

    describe('Soomla Store', function () {


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

    });

});
