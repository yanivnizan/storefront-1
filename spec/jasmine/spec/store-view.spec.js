define("storeView.spec", ["storeViews", "models", "native-api"], function (StoreViews, Models, NativeAPI) {

    describe('Soomla Store View', function () {

        var storeView;
        beforeEach(function() {
            storeView = new StoreViews.StoreView({
                model : new Models.Store(),
                el : $("<div><div class='leave-store'></div></div>")
            });
            spyOn(NativeAPI, "destroy");
        });

        xit("should be defined on the SoomlaJS namespace", function() {
            expect(SoomlaJS.storeView).not.toBeDefined();
            SoomlaJS.initialize({});
            expect(SoomlaJS.storeView).toBeDefined();
            expect(SoomlaJS.storeView).toBeInstanceOf(StoreViews.StoreView);
        });

        it("should leave the store when the back button is tapped with one finger", function () {
            var event = $.Event("touchend", {originalEvent : {touches : [1]}});
            storeView.$(".leave-store").trigger(event);
            expect(NativeAPI.destroy).toHaveBeenCalled();
        });

        it("should call a 'beforeLeave' callback if provided", function () {
            var callbacks = {
                beforeLeave : function() {}
            };
            _.extend(storeView.options, { callbacks : callbacks });
            spyOn(callbacks, "beforeLeave");
            var event = $.Event("touchend", {originalEvent : {touches : [1]}});
            storeView.$(".leave-store").trigger(event);
            exp ect(callbacks.beforeLeave).toHaveBeenCalled();
        });

    });

});

