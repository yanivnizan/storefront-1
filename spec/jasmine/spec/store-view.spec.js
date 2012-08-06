define("storeView.spec", ["storeViews", "models", "native-api"], function (StoreViews, Models, NativeAPI) {

    describe('Soomla Store Backbone Views', function () {


        var storeView, attributes;
        beforeEach(function() {
            attributes = {
                model : new Models.Store(),
                el : $("<div><div class='leave-store'></div><div class='buy-more'></div></div>")
            };
            storeView = new StoreViews.StoreView(attributes);
            delete SoomlaJS.store;
            delete SoomlaJS.storeView;
            spyOn(NativeAPI, "destroy");
        });

        describe("=== StoreView", function() {

            it("should be defined on the SoomlaJS namespace", function() {
                SoomlaJS.initialize({template : {name : "empty"}});
                expect(SoomlaJS.storeView).toBeDefined();
                expect(SoomlaJS.storeView).toBeInstanceOf(StoreViews.StoreView);
            });

            it("should create two item collection views when initiated with virtual goods and currency packs", function() {
                var stub = sinon.stub(StoreViews.ItemCollectionView.prototype, "render").returns({render : function(){}});
                SoomlaJS.initialize({template : {name : "empty"}});
                expect(stub.calledTwice).toBeTruthy();

                // Restore original stubbed function to prototype
                StoreViews.ItemCollectionView.prototype.render.restore();
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

        describe("=== ItemView", function() {

            it("should trigger an event with the soomla ID when tapped", function () {
                var spy = sinon.spy();
                var event = $.Event("touchend", {originalEvent : {touches : [1]}});
                new StoreViews.ItemView({ soomlaId : 1}).on("tapped", spy).$el.trigger(event);
                expect(spy.calledWith(1)).toBeTruthy();
            });
        });

    });

});

