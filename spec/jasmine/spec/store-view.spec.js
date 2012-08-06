define("storeView.spec", ["storeViews", "models", "native-api"], function (StoreViews, Models, NativeAPI) {

    describe('Soomla Store View', function () {

        var storeView, attributes;
        beforeEach(function() {
            attributes = {
                model : new Models.Store(),
                el : $("<div><div class='leave-store'></div><div class='buy-more'></div></div>")
            };
            storeView = new StoreViews.StoreView(attributes);
            spyOn(NativeAPI, "destroy");
        });

        it("should be defined on the SoomlaJS namespace", function() {
            SoomlaJS.initialize({template : {name : "empty"}});
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
            expect(callbacks.beforeLeave).toHaveBeenCalled();
        });

        it("should invoke the currency store when 'Buy more' is tapped", function () {
            var spy = sinon.spy(StoreViews.StoreView.prototype, "showCurrencyStore");
            storeView = new StoreViews.StoreView(attributes);
            var event = $.Event("touchend", {originalEvent : {touches : [1]}});
            storeView.$(".buy-more").trigger(event);
            expect(spy.called).toBeTruthy();

            // Restore original spied function to prototype
            StoreViews.StoreView.prototype.showCurrencyStore.restore();
        });


    });

});

