define("storeView.spec", ["storeViews", "models"], function (StoreViews, Models) {

    describe('Soomla Store Backbone Views', function () {



        describe("=== StoreView", function() {

            var storeView, attributes, nativeAPIStub;

            beforeEach(function() {
                nativeAPIStub   = {
                    wantsToBuyVirtualGoods  : sinon.spy(),
                    wantsToBuyCurrencyPacks : sinon.spy(),
                    wantsToLeaveStore       : sinon.spy()
                };
                attributes = {
                    model : new Models.Store(),
                    el : $("<div><div class='leave-store'></div><div class='buy-more'></div></div>"),
                    nativeAPI : nativeAPIStub
                };
                storeView = new StoreViews.StoreView(attributes);
                delete SoomlaJS.store;
                delete SoomlaJS.storeView;
            });

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

            it("should leave the store when the back button is tapped with one finger \ clicked", function () {
                var event = $.Event("touchend", {originalEvent : {touches : [1]}});
                storeView.$(".leave-store").trigger(event);
                expect(nativeAPIStub.wantsToLeaveStore.called).toBeTruthy();

                nativeAPIStub.wantsToLeaveStore.reset();
                storeView.$(".leave-store").click();
                expect(nativeAPIStub.wantsToLeaveStore.called).toBeTruthy();
            });

            it("should call a 'beforeLeave' callback if provided when tapping \ clicking the back button", function () {
                _.extend(storeView.options, { callbacks : { beforeLeave : sinon.spy() } });
                var event = $.Event("touchend", {originalEvent : {touches : [1]}});
                storeView.$(".leave-store").trigger(event);
                expect(storeView.options.callbacks.beforeLeave.called).toBeTruthy();

                nativeAPIStub.wantsToLeaveStore.reset();
                storeView.$(".leave-store").click();
                expect(storeView.options.callbacks.beforeLeave.called).toBeTruthy();
            });

            it("should invoke the currency store when 'Buy more' is tapped \ clicked", function () {
                var spy = sinon.spy(StoreViews.StoreView.prototype, "showCurrencyStore");
                storeView = new StoreViews.StoreView(attributes);
                var event = $.Event("touchend", {originalEvent : {touches : [1]}});
                storeView.$(".buy-more").trigger(event);
                expect(spy.called).toBeTruthy();

                spy.reset();
                storeView.$(".buy-more").click();
                expect(spy.called).toBeTruthy();

                // Restore original spied function to prototype
                StoreViews.StoreView.prototype.showCurrencyStore.restore();
            });

            describe("=== Native API calls", function() {

                var modelStub, ViewStub, nativeAPIStub;

                beforeEach(function() {
                    // Create view, model and api stubs
                    modelStub       = new Backbone.Model({templateName : "empty"});
                    ViewStub        = Backbone.View.extend({
                        render : sinon.spy(function() {return this;}),
                        triggerSelectedEvent : function() { this.trigger("selected", modelStub) }
                    });
                    nativeAPIStub   = {wantsToBuyVirtualGoods : sinon.spy(), wantsToBuyCurrencyPacks : sinon.spy()};
                    storeView = new StoreViews.StoreView({
                        VirtualGoodsView    : ViewStub,
                        CurrencyPacksView   : ViewStub,
                        model               : modelStub,
                        nativeAPI           : nativeAPIStub
                    }).render();
                });

                it("should accept 2 Backbone view prototypes to use when rendering item collections", function () {
                    expect(ViewStub.prototype.render.calledTwice).toBeTruthy();
                });

                it("should invoke an item purchase when the 'selected' event is captured from the virtual goods sub-view", function() {
                    storeView.virtualGoodsView.triggerSelectedEvent();
                    expect(nativeAPIStub.wantsToBuyVirtualGoods.calledWith(modelStub)).toBeTruthy();
                });

                it("should invoke a currency pack purchase when the 'selected' event is captured from the currency packs sub-view", function() {
                    storeView.currencyPacksView.triggerSelectedEvent();
                    expect(nativeAPIStub.wantsToBuyCurrencyPacks.calledWith(modelStub)).toBeTruthy();
                });
            });

        });

        describe("=== ItemView", function() {

            it("should trigger an event with its model when tapped", function () {
                var spy     = sinon.spy(),
                    model   = new Backbone.Model(),
                    event   = $.Event("touchend", {originalEvent : {touches : [1]}});
                new StoreViews.ItemView({ model : model}).on("selected", spy).$el.trigger(event);
                expect(spy.calledWith(model)).toBeTruthy();

                spy.reset();
                new StoreViews.ItemView({ model : model}).on("selected", spy).$el.click();
                expect(spy.calledWith(model)).toBeTruthy();
            });
        });

        describe("=== ItemCollectionView", function() {

            it("should accept a type of Backbone view to use when rendering items", function () {
                // Create a view stub
                var stubType = Backbone.View.extend({render : sinon.spy(function() {return this;}), el : $("<div>")[0]});

                new StoreViews.ItemCollectionView({
                    collection : new Backbone.Collection({a : 1}),
                    type : stubType
                }).render();
                expect(stubType.prototype.render.called).toBeTruthy();
            });

            it("should trigger an event when one of its items were selected", function () {
                var spy     = sinon.spy(),
                    model   = new Backbone.Model();

                // Fake a view that can fire the event
                var type    = Backbone.View.extend({model : model, triggerTapEvent : function(){ this.trigger("selected", this.model) }});

                var view = new StoreViews.ItemCollectionView({
                    collection : new Backbone.Collection([model]),
                    type : type
                }).on("selected", spy).render();

                view.subViews[0].triggerTapEvent();
                expect(spy.calledWith(model)).toBeTruthy();
            });
        });


    });

});

