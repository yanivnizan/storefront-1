define("components.spec", ["components", "backbone"], function (Components, Backbone) {

    var ModalDialog         = Components.ModalDialog,
        ListItemView        = Components.ListItemView,
        GridItemView        = Components.GridItemView,
        BaseCollectionView  = Components.BaseCollectionView,
        CollectionListView  = Components.CollectionListView;

    describe('Soomla Store Backbone Components', function () {


        describe("ModalDialog component", function() {

            var modal, attributes, touchendEvent;

            beforeEach(function() {
                attributes      = { model : new Backbone.Model(), parent : $("<div>") };
                modal           = new ModalDialog(attributes);
                touchendEvent   = $.Event("touchend", {originalEvent : {touches : [1]}});
            });

            it("should be defined", function() {
                expect(ModalDialog).toBeDefined();
            });

            it("should create a div", function() {
                expect(modal.el.nodeName).toEqual("DIV");
            });

            it("should have a class name 'modal-container'", function() {
                expect(modal.el.className).toEqual("modal-container");
            });

            it("should have a tap event on the close button and overlay", function() {
                expect(modal.events["touchend .close"]).toBeDefined();
                expect(modal.events["touchend .modal"]).toBeDefined();
            });

            it("should close the modal when the close button \ overlay is tapped", function() {
                _.each([".close", ".modal"], function(selector) {
                    var spy = sinon.spy(ModalDialog.prototype, "close");
                    new ModalDialog(attributes).render().$(selector).trigger(touchendEvent);
                    expect(spy.called).toBeTruthy();
                    spy.restore();
                });
            });

            it("should remove element from DOM when closed", function() {
                modal.close(touchendEvent);
                expect(modal.$el.parent().length).toEqual(0);
            });

            // TODO: Detach from events when closing

            it("should have a template defined", function() {
                expect(modal.template).toBeDefined();
            });
            it("should use the template when rendering", function() {
                var spy = sinon.spy(ModalDialog.prototype, "template");
                new ModalDialog(attributes).render();
                expect(spy.called).toBeTruthy();
                spy.restore();
            });
            it("should return the component from render \ close for chaining", function() {
                var stub = sinon.stub(ModalDialog.prototype, "template");
                modal = new ModalDialog(attributes);
                expect(modal.render()).toEqual(modal);
                expect(modal.close(touchendEvent)).toEqual(modal);
                stub.restore();
            });

            it("should trigger an event when closing the view", function() {
                var spy = sinon.spy();
                new ModalDialog(attributes).render().on("closed", spy).close(touchendEvent);
                expect(spy.calledWith("cancel")).toBeTruthy();
            });

            it("should have a tap event on the 'cancel' button and 'buy more' button", function() {
                expect(modal.events["touchend .buy-more"]).toBeDefined();
                expect(modal.events["touchend .cancel"]).toBeDefined();
            });

            it("should trigger an event indicating 'Cancel' was selected when closing", function() {
                var spy = sinon.spy();
                modal.render().on("closed", spy).$(".cancel").trigger(touchendEvent);
                expect(spy.calledWith("cancel")).toBeTruthy();
            });

            it("should trigger an event indicating 'Buy more' was selected when closing", function() {
                var spy = sinon.spy();
                modal.render().on("closed", spy).$(".buy-more").trigger(touchendEvent);
                expect(spy.calledWith("buyMore")).toBeTruthy();
            });

            it("should have no event handlers attached to the view after it was closed", function() {
                var spy = sinon.spy();
                modal.render().on("testEvent", spy).close(touchendEvent).trigger("testEvent");
                expect(spy.called).toBeFalsy();
            });


        });

        describe("ListItemView", function() {

            var view, attributes, touchendEvent;

            beforeEach(function() {
                attributes      = { model : new Backbone.Model() };
                view            = new ListItemView(attributes);
                touchendEvent   = $.Event("touchend", {originalEvent : {touches : [1]}});
            });

            it("should be defined", function() {
                expect(ListItemView).toBeDefined();
            });

            it("should be an instance of a Backbone view", function() {
                expect(new ListItemView({model : new Backbone.Model()})).toBeInstanceOf(Backbone.View);
            });

            it("should create a div", function() {
                expect(view.el.nodeName).toEqual("LI");
            });

            it("should have a class name 'item'", function() {
                expect(view.el.className).toEqual("item");
            });

            it("should have a tap event on the close button and overlay", function() {
                expect(view.events["touchend"]).toBeDefined();
            });

            it("should have template defined on the view after construction", function() {
                expect(new ListItemView(_.extend({template : "some template"}, attributes)).template).toEqual("some template");
            });

            it("should accept an itemType and use the relevant template", function() {
                var spy = sinon.spy();
                new ListItemView({
                    model       : new Backbone.Model(),
                    template    : spy
                }).render();
                expect(spy.called).toBeTruthy();
            });

            it("should return itself from render for chaining", function() {
                var view = new ListItemView(_.extend({template : sinon.stub()}, attributes));
                expect(view.render()).toEqual(view);
            });

            it("should trigger a 'selected' event on the view when tapped", function() {
                var spy = sinon.spy();
                view = new ListItemView(attributes);
                view.on("selected", spy).$el.trigger(touchendEvent);
                expect(spy.called).toBeTruthy();
            });

            it("should re-render on changes to the model attributes: currency, price, balance", function () {
                _.each(["currency", "price", "balance"], function(attribute) {
                    var stub    = sinon.stub(ListItemView.prototype, "render"),
                        model   = new Backbone.Model();
                    new ListItemView({ model : model}).model.set(attribute, "some value");
                    expect(stub.called).toBeTruthy();
                    stub.restore();
                });
            });

        });

        describe("GridItemView", function() {

            var view, attributes;

            beforeEach(function() {
                attributes  = { model : new Backbone.Model() };
                view        = new GridItemView(attributes);
            });

            it("should be defined", function() {
                expect(GridItemView).toBeDefined();
            });

            it("should be an instance of a Backbone view", function() {
                expect(view).toBeInstanceOf(Backbone.View);
            });

            it("should create a div", function() {
                expect(view.el.nodeName).toEqual("DIV");
            });
        });

        describe("BaseCollectionView", function() {
            it("should be defined", function() {
                expect(BaseCollectionView).toBeDefined();
            });

            it("should have a template defined", function() {
                var template = sinon.stub();
                expect(new BaseCollectionView({template : template}).template).toEqual(template);
            });

            it("should have a type defined", function() {
                var type = sinon.stub();
                expect(new BaseCollectionView({type : type}).type).toEqual(type);
            });
        });

        describe("CollectionListView", function() {
            it("should be defined", function() {
                expect(CollectionListView).toBeDefined();
            });

            it("should be defined", function() {
                expect(new CollectionListView({templateProperties : {}})).toBeInstanceOf(BaseCollectionView);
            });

        });

    });
});

