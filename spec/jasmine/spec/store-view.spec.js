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

        it("should leave the store when the back button is tapped with one finger", function () {
            var event = $.Event("touchend", {originalEvent : {touches : [1]}});
            storeView.$(".leave-store").trigger(event);
            expect(NativeAPI.destroy).toHaveBeenCalled();
        });

    });

});

