define("storeView.spec", ["storeViews", "models", "templates", "components"], function (StoreViews, Models, Templates, Components) {

    var StoreView           = StoreViews.StoreView,
        ListItemView        = Components.ListItemView,
        CollectionListView  = StoreViews.CollectionListView;


    describe('Soomla Store Backbone Views', function () {

        var touchendEvent;

        describe("=== StoreView", function() {

            var storeView, attributes, nativeAPIStub;

            beforeEach(function() {
                touchendEvent = $.Event("touchend", {originalEvent : {touches : [1]}});
                nativeAPIStub   = {
                    wantsToBuyVirtualGoods  : sinon.spy(),
                    wantsToBuyCurrencyPacks : sinon.spy(),
                    wantsToLeaveStore       : sinon.spy()
                };
                attributes = {
                    model : new Models.Store({virtualCurrencies : [{}]}),
                    el : $("<div><div class='leave-store'></div><div class='buy-more'></div><div class='back'></div></div>"),
                    nativeAPI : nativeAPIStub
                };
                delete SoomlaJS.store;
                delete SoomlaJS.storeView;
            });

            it("should be defined on the SoomlaJS namespace", function() {
                SoomlaJS.initialize({template : {name : "empty"}});
                expect(SoomlaJS.storeView).toBeDefined();
                expect(SoomlaJS.storeView).toBeInstanceOf(StoreView);
            });

            it("should create two item collection views when initiated with virtual goods and currency packs", function() {
                var stub = sinon.stub(CollectionListView.prototype, "render").returns({render : function(){}});
                SoomlaJS.initialize({template : {name : "empty"}});
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

                var modelStub, ViewStub, nativeAPIStub, templatePropertiesStub;

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
                    nativeAPIStub   = {wantsToBuyVirtualGoods : sinon.spy(), wantsToBuyCurrencyPacks : sinon.spy()};
                    attributes = {
                        VirtualGoodsView    : ViewStub,
                        CurrencyPacksView   : ViewStub,
                        model               : modelStub,
                        nativeAPI           : nativeAPIStub
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

        describe("=== ItemView", function() {

            it("should trigger an event with its model when tapped", function () {
                var spy     = sinon.spy(),
                    model   = new Backbone.Model(),
                    touchendEvent   = $.Event("touchend", {originalEvent : {touches : [1]}});
                new ListItemView({ model : model}).on("selected", spy).$el.trigger(touchendEvent);
                expect(spy.calledWith(model)).toBeTruthy();
            });

            it("should trigger an event with its model when clicked", function () {
                var spy     = sinon.spy(),
                    model   = new Backbone.Model();
                _.extend(ListItemView.prototype.events, { click : "onSelect" });
                new ListItemView({ model : model}).on("selected", spy).$el.click();
                expect(spy.calledWith(model)).toBeTruthy();
                delete ListItemView.prototype.events.click;
            });
        });

        describe("=== CollectionListView", function() {

            var collectionView,
                attributes,
                orientation = "vertical",
                model = new Backbone.Model(),
                stubType = Backbone.View.extend({render : sinon.spy(function() {return this;}), el : $("<div>")[0]});

            beforeEach(function() {
                attributes = {
                    collection          : new Backbone.Collection([model]),
                    type                : stubType,
                    itemType            : "virtualGood",
                    templateName        : "empty",
                    templateProperties  : {orientation : orientation}
                };
            });

            it("should accept a type of Backbone view to use when rendering items", function () {
                new CollectionListView(attributes).render();
                expect(stubType.prototype.render.called).toBeTruthy();
            });

            it("should trigger an event when one of its items were selected", function () {
                var spy     = sinon.spy(),
                    model   = new Backbone.Model();

                // Fake a view that can fire the event
                var type        = Backbone.View.extend({model : model, triggerTapEvent : function(){ this.trigger("selected", this.model) }});
                collectionView = new CollectionListView({
                    collection          : new Backbone.Collection([model]),
                    type                : type,
                    itemType            : "virtualGood",
                    templateName        : "empty",
                    templateProperties  : {orientation : orientation}
                }).on("selected", spy).render();

                collectionView.subViews[0].triggerTapEvent();
                expect(spy.calledWith(model)).toBeTruthy();
            });

            it("should by default render the list vertically", function() {
                var spy = sinon.spy(CollectionListView.prototype, "adjustWidth");
                collectionView = new CollectionListView(attributes).render();
                expect(spy.called).toBeFalsy();
                expect(collectionView.orientation).toEqual("vertical");
                spy.restore();
            });

            it("should adjust its width if its orientation is horizontal", function() {
                var spy = sinon.spy(CollectionListView.prototype, "adjustWidth");
                collectionView = new CollectionListView(_.extend(attributes, {templateProperties : {orientation : "horizontal"}})).render();
                expect(spy.called).toBeTruthy();
                expect(collectionView.orientation).toEqual("horizontal");
                spy.restore();
            });
        });


    });

});

