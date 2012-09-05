define("storeView.spec", ["storeViews", "models", "templates", "components", "themes"], function (StoreViews, Models, Templates, Components, Themes) {

    var StoreView           = StoreViews.StoreView,
        ListItemView        = Components.ListItemView,
        CollectionListView  = Components.CollectionListView,
        CollectionGridView  = Components.CollectionGridView;


    describe('Soomla Store Master Views', function () {

        describe("StoreView", function() {

            var storeView, attributes, nativeAPIStub, touchendEvent;

            beforeEach(function() {
                touchendEvent = $.Event("touchend", {originalEvent : {touches : [1]}});
                nativeAPIStub   = {
                    wantsToBuyVirtualGoods  : sinon.spy(),
                    wantsToBuyCurrencyPacks : sinon.spy(),
                    wantsToLeaveStore       : sinon.spy()
                };
                attributes = {
                    model       : new Models.Store({virtualCurrencies : [{}]}),
                    el          : $("<div><div class='leave-store'></div><div class='buy-more'></div><div class='back'></div></div>"),
                    nativeAPI   : nativeAPIStub,
                    theme       : Themes.empty
                };
                delete SoomlaJS.store;
                delete SoomlaJS.storeView;
            });

            it("should be defined on the SoomlaJS namespace", function() {
                SoomlaJS.initialize({template : {name : "empty"}});
                expect(SoomlaJS.storeView).toBeDefined();
                expect(SoomlaJS.storeView).toBeInstanceOf(StoreView);
            });

            it("should have the theme defined on the view", function() {
               expect(new StoreView(attributes).theme).toEqual(attributes.theme);
            });

            it("should create two item collection sub-views", function() {
                storeView = new StoreView(attributes);
                expect(storeView.virtualGoodsView).toBeInstanceOf(Components.BaseCollectionView);
                expect(storeView.currencyPacksView).toBeInstanceOf(Components.BaseCollectionView);
            });

            it("should create two item collection views when initiated with virtual goods and currency packs", function() {
                var stub = sinon.stub(CollectionListView.prototype, "render", function(){ return this; });
                new StoreView(attributes).render();
                expect(stub.calledTwice).toBeTruthy();
                stub.restore();  // Restore original stubbed function to prototype
            });

            it("should provide an API for opening a modal dialog", function() {
                var spy = sinon.spy(Components.ModalDialog.prototype, "render");
                storeView = new StoreView(attributes).openDialog(Models.Currency.prototype.defaults.itemId);
                expect(spy.called).toBeTruthy();
                spy.restore();  // Restore original spied function to prototype
            });

            it("should leave the store when the back button is tapped", function () {
                storeView = new StoreView(attributes);
                storeView.$(".leave-store").trigger(touchendEvent);
                expect(nativeAPIStub.wantsToLeaveStore.called).toBeTruthy();
            });

            it("should call a 'beforeLeave' callback if provided when tapping the back button", function () {
                storeView = new StoreView(_.extend({}, attributes, { callbacks : { beforeLeave : sinon.spy() } }));
                storeView.$(".leave-store").trigger(touchendEvent);
                expect(storeView.options.callbacks.beforeLeave.called).toBeTruthy();
            });

            it("should show the currency store when 'Buy more' is tapped", function () {
                var spy = sinon.spy(StoreView.prototype, "showCurrencyStore");
                storeView = new StoreView(attributes);
                storeView.$(".buy-more").trigger(touchendEvent);
                expect(spy.called).toBeTruthy();
                spy.restore();  // Restore original spied function to prototype
            });

            it("should show the goods store when 'Back' is tapped", function () {
                var spy = sinon.spy(StoreView.prototype, "showGoodsStore");
                storeView = new StoreView(attributes);
                storeView.$(".back").trigger(touchendEvent);
                expect(spy.called).toBeTruthy();
                spy.restore();  // Restore original spied function to prototype
            });

            it("should move to the currency store if the insufficient funds dialog returns 'buyMore'", function() {
                var spy = sinon.spy(StoreView.prototype, "showCurrencyStore");
                storeView = new StoreView(attributes).openDialog(Models.Currency.prototype.defaults.itemId);
                storeView.$(".buy-more").trigger(touchendEvent);
                expect(spy.called).toBeTruthy();
                spy.restore();  // Restore original spied function to prototype
            });


            describe("=== Extended pointing device events", function() {

                beforeEach(function() {
                    _.extend(StoreView.prototype.events, {
                        "click .leave-store" : "wantsToLeaveStore",
                        "click .buy-more"    : "showCurrencyStore",
                        "click .back"        : "showGoodsStore"
                    });
                });
                afterEach(function() {
                    delete StoreView.prototype.events["click .leave-store"];
                    delete StoreView.prototype.events["click .buy-more"];
                    delete StoreView.prototype.events["click .back"];
                });

                it("should leave the store when the back button is clicked", function () {
                    storeView = new StoreView(attributes);
                    storeView.$(".leave-store").click();
                    expect(nativeAPIStub.wantsToLeaveStore.called).toBeTruthy();
                });

                it("should call a 'beforeLeave' callback if provided when clicking the back button", function () {
                    storeView = new StoreView(_.extend({}, attributes, { callbacks : { beforeLeave : sinon.spy() } }));
                    storeView.$(".leave-store").click();
                    expect(storeView.options.callbacks.beforeLeave.called).toBeTruthy();
                });

                it("should show the currency store when 'Buy more' is clicked", function () {
                    var spy = sinon.spy(StoreView.prototype, "showCurrencyStore");
                    storeView = new StoreView(attributes);
                    storeView.$(".buy-more").click();
                    expect(spy.called).toBeTruthy();
                    spy.restore();  // Restore original spied function to prototype
                });

                it("should show the goods store when 'Back' is clicked", function () {
                    var spy = sinon.spy(StoreView.prototype, "showGoodsStore");
                    storeView = new StoreView(attributes);
                    storeView.$(".back").click();
                    expect(spy.called).toBeTruthy();
                    spy.restore();  // Restore original spied function to prototype
                });

            });

            describe("=== Native API calls & Transaction management", function() {

                var modelStub, ViewStub, nativeAPIStub, templatePropertiesStub, themeStub;

                beforeEach(function() {
                    // Create view, model and api stubs
                    modelStub       = new Models.Store({
                        templateName        : "empty",
                        templateProperties  : templatePropertiesStub,
                        currency            : {balance : 0},
                        virtualCurrencies   : [{}]
                    });
                    ViewStub        = Backbone.View.extend({
                        render : sinon.spy(function() {return this;}),
                        triggerSelectedEvent : function() { this.trigger("selected", modelStub) }
                    });
                    themeStub       = _.clone(Themes.empty);
                    themeStub.virtualGoodsView.type = ViewStub;
                    themeStub.currencyPacksView.type = ViewStub;
                    nativeAPIStub   = {wantsToBuyVirtualGoods : sinon.spy(), wantsToBuyCurrencyPacks : sinon.spy()};

                    attributes = {
                        VirtualGoodsView    : ViewStub,
                        CurrencyPacksView   : ViewStub,
                        model               : modelStub,
                        nativeAPI           : nativeAPIStub,
                        theme               : themeStub
                    };
                });

                it("should accept 2 Backbone view prototypes to use when rendering item collections", function () {
                    storeView = new StoreView(attributes).render();
                    expect(ViewStub.prototype.render.calledTwice).toBeTruthy();
                });

                it("should accept a template options object", function() {
                    storeView = new StoreView(attributes).render();
                    expect(storeView.virtualGoodsView.options.templateProperties).toEqual(templatePropertiesStub);
                });

                it("should invoke an item purchase when the 'selected' event is captured from the virtual goods sub-view", function() {
                    storeView = new StoreView(attributes).render();
                    storeView.virtualGoodsView.triggerSelectedEvent();
                    expect(nativeAPIStub.wantsToBuyVirtualGoods.calledWith(modelStub.toJSON().itemId)).toBeTruthy();
                });

                it("should invoke a currency pack purchase when the 'selected' event is captured from the currency packs sub-view", function() {
                    storeView = new StoreView(attributes).render();
                    storeView.currencyPacksView.triggerSelectedEvent();
                    expect(nativeAPIStub.wantsToBuyCurrencyPacks.calledWith(modelStub.toJSON().productId)).toBeTruthy();
                });

                it("should update the view when the balance is changed", function() {
                    var stub = sinon.stub(StoreView.prototype, "updateBalance");
                    storeView = new StoreView(attributes);
                    storeView.model.setBalance({currency_coin : 100});
                    expect(stub.called).toBeTruthy();
                    stub.restore();  // Restore original stubbed function to prototype
                });

            });

        });

    });

});

