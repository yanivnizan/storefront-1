define("storeView.spec", ["storeViews", "models", "templates"], function (StoreViews, Models, Templates) {

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
                    model : new Models.Store(),
                    el : $("<div><div class='leave-store'></div><div class='buy-more'></div><div class='back'></div></div>"),
                    nativeAPI : nativeAPIStub
                };
                delete SoomlaJS.store;
                delete SoomlaJS.storeView;
            });

            it("should be defined on the SoomlaJS namespace", function() {
                SoomlaJS.initialize({template : {name : "empty"}});
                expect(SoomlaJS.storeView).toBeDefined();
                expect(SoomlaJS.storeView).toBeInstanceOf(StoreViews.StoreView);
            });

            it("should create two item collection views when initiated with virtual goods and currency packs", function() {
                var stub = sinon.stub(StoreViews.CollectionListView.prototype, "render").returns({render : function(){}});
                SoomlaJS.initialize({template : {name : "empty"}});
                expect(stub.calledTwice).toBeTruthy();

                // Restore original stubbed function to prototype
                StoreViews.CollectionListView.prototype.render.restore();
            });

            it("should leave the store when the back button is tapped", function () {
                storeView = new StoreViews.StoreView(attributes);
                storeView.$(".leave-store").trigger(touchendEvent);
                expect(nativeAPIStub.wantsToLeaveStore.called).toBeTruthy();
            });

            it("should call a 'beforeLeave' callback if provided when tapping the back button", function () {
                storeView = new StoreViews.StoreView(_.extend({}, attributes, { callbacks : { beforeLeave : sinon.spy() } }));
                storeView.$(".leave-store").trigger(touchendEvent);
                expect(storeView.options.callbacks.beforeLeave.called).toBeTruthy();
            });

            it("should show the currency store when 'Buy more' is tapped", function () {
                var spy = sinon.spy(StoreViews.StoreView.prototype, "showCurrencyStore");
                storeView = new StoreViews.StoreView(attributes);
                storeView.$(".buy-more").trigger(touchendEvent);
                expect(spy.called).toBeTruthy();

                // Restore original spied function to prototype
                StoreViews.StoreView.prototype.showCurrencyStore.restore();
            });

            it("should show the goods store when 'Back' is tapped", function () {
                var spy = sinon.spy(StoreViews.StoreView.prototype, "showGoodsStore");
                storeView = new StoreViews.StoreView(attributes);
                storeView.$(".back").trigger(touchendEvent);
                expect(spy.called).toBeTruthy();

                // Restore original spied function to prototype
                StoreViews.StoreView.prototype.showGoodsStore.restore();
            });


            describe("=== Extended pointing device events", function() {

                beforeEach(function() {
                    _.extend(StoreViews.StoreView.prototype.events, {
                        "click .leave-store" : "wantsToLeaveStore",
                        "click .buy-more"    : "showCurrencyStore",
                        "click .back"        : "showGoodsStore"
                    });
                });
                afterEach(function() {
                    delete StoreViews.StoreView.prototype.events["click .leave-store"];
                    delete StoreViews.StoreView.prototype.events["click .buy-more"];
                    delete StoreViews.StoreView.prototype.events["click .back"];
                });

                it("should leave the store when the back button is clicked", function () {
                    storeView = new StoreViews.StoreView(attributes);
                    storeView.$(".leave-store").click();
                    expect(nativeAPIStub.wantsToLeaveStore.called).toBeTruthy();
                });

                it("should call a 'beforeLeave' callback if provided when clicking the back button", function () {
                    storeView = new StoreViews.StoreView(_.extend({}, attributes, { callbacks : { beforeLeave : sinon.spy() } }));
                    storeView.$(".leave-store").click();
                    expect(storeView.options.callbacks.beforeLeave.called).toBeTruthy();
                });

                it("should show the currency store when 'Buy more' is clicked", function () {
                    var spy = sinon.spy(StoreViews.StoreView.prototype, "showCurrencyStore");
                    storeView = new StoreViews.StoreView(attributes);
                    storeView.$(".buy-more").click();
                    expect(spy.called).toBeTruthy();

                    // Restore original spied function to prototype
                    StoreViews.StoreView.prototype.showCurrencyStore.restore();
                });

                it("should show the goods store when 'Back' is clicked", function () {
                    var spy = sinon.spy(StoreViews.StoreView.prototype, "showGoodsStore");
                    storeView = new StoreViews.StoreView(attributes);
                    storeView.$(".back").click();
                    expect(spy.called).toBeTruthy();

                    // Restore original spied function to prototype
                    StoreViews.StoreView.prototype.showGoodsStore.restore();
                });

            });

            describe("=== Native API calls", function() {

                var modelStub, ViewStub, nativeAPIStub, templatePropertiesStub;

                beforeEach(function() {
                    // Create view, model and api stubs
                    modelStub       = new Backbone.Model({ templateName : "empty", templateProperties : templatePropertiesStub, itemId : 100 });
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

                it("should accept a template options object", function() {
                    expect(storeView.virtualGoodsView.options.templateProperties).toEqual(templatePropertiesStub);
                });

                it("should invoke an item purchase when the 'selected' event is captured from the virtual goods sub-view", function() {
                    storeView.virtualGoodsView.triggerSelectedEvent();
                    expect(nativeAPIStub.wantsToBuyVirtualGoods.calledWith(modelStub.toJSON().itemId)).toBeTruthy();
                });

                it("should invoke a currency pack purchase when the 'selected' event is captured from the currency packs sub-view", function() {
                    storeView.currencyPacksView.triggerSelectedEvent();
                    expect(nativeAPIStub.wantsToBuyCurrencyPacks.calledWith(modelStub.toJSON().itemId)).toBeTruthy();
                });
            });

        });

        describe("=== ItemView", function() {

            it("should trigger an event with its model when tapped", function () {
                var spy     = sinon.spy(),
                    model   = new Backbone.Model(),
                    touchendEvent   = $.Event("touchend", {originalEvent : {touches : [1]}});
                new StoreViews.ListItemView({ model : model}).on("selected", spy).$el.trigger(touchendEvent);
                expect(spy.calledWith(model)).toBeTruthy();
            });

            it("should trigger an event with its model when clicked", function () {
                var spy     = sinon.spy(),
                    model   = new Backbone.Model();
                _.extend(StoreViews.ListItemView.prototype.events, { click : "onSelect" });
                new StoreViews.ListItemView({ model : model}).on("selected", spy).$el.click();
                expect(spy.calledWith(model)).toBeTruthy();
                delete StoreViews.ListItemView.prototype.events.click;
            });

            it("should accept an itemType and use the relevant template", function() {
                var spy = sinon.spy(Templates.empty, "currencyPack");
                new StoreViews.ListItemView({
                    templateName : "empty",
                    itemType     : "currencyPack",
                    model        : new Backbone.Model(),
                    currency     : new Backbone.Model()
                }).render();
                expect(spy.called).toBeTruthy();
                spy.restore();
            });
        });

        describe("=== CollectionListView", function() {

            it("should accept a type of Backbone view to use when rendering items", function () {
                // Create a view stub
                var stubType = Backbone.View.extend({render : sinon.spy(function() {return this;}), el : $("<div>")[0]});

                new StoreViews.CollectionListView({
                    collection : new Backbone.Collection({a : 1}),
                    type : stubType
                }).render();
                expect(stubType.prototype.render.called).toBeTruthy();
            });

            it("should accept an item type that should be passed to its items", function () {
                // Create a view stub
                var stubType = Backbone.View.extend({render : sinon.spy(function() {return this;}), el : $("<div>")[0]});

                var collectionView = new StoreViews.CollectionListView({
                    collection : new Backbone.Collection({a : 1}),
                    type : stubType,
                    itemType : "virtualGood"
                }).render();
                expect(collectionView.subViews[0].options.itemType).toEqual("virtualGood");
            });

            it("should trigger an event when one of its items were selected", function () {
                var spy     = sinon.spy(),
                    model   = new Backbone.Model();

                // Fake a view that can fire the event
                var type    = Backbone.View.extend({model : model, triggerTapEvent : function(){ this.trigger("selected", this.model) }});

                var view = new StoreViews.CollectionListView({
                    collection : new Backbone.Collection([model]),
                    type : type
                }).on("selected", spy).render();

                view.subViews[0].triggerTapEvent();
                expect(spy.calledWith(model)).toBeTruthy();
            });
        });


    });

});

