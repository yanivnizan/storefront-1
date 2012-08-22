define("components.spec", ["components", "backbone"], function (Components, Backbone) {

    describe('Soomla Store Backbone Components', function () {

        var modal, attributes, touchendEvent;

        describe("ModalDialog component", function() {

            beforeEach(function() {
                attributes      = { model : new Backbone.Model(), parent : $("<div>") };
                modal           = new Components.ModalDialog(attributes);
                touchendEvent   = $.Event("touchend", {originalEvent : {touches : [1]}});
            });

            it("should be defined", function() {
                expect(Components.ModalDialog).toBeDefined();
            });

            it("should create a div", function() {
                expect(modal.el.nodeName).toEqual("DIV");
            });

            it("should have a class name 'modal-container'", function() {
                expect(modal.el.className).toEqual("modal-container");
            });

            it("should have have a tap event on the close button and overlay", function() {
                expect(modal.events["touchend .close"]).toBeDefined();
                expect(modal.events["touchend .modal"]).toBeDefined();
            });

            it("should close the modal when the close button \ overlay is tapped", function() {
                _.each([".close", ".modal"], function(selector) {
                    var spy = sinon.spy(Components.ModalDialog.prototype, "close");
                    new Components.ModalDialog(attributes).render().$(selector).trigger(touchendEvent);
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
                var spy = sinon.spy(Components.ModalDialog.prototype, "template");
                new Components.ModalDialog(attributes).render();
                expect(spy.called).toBeTruthy();
                spy.restore();
            });
            it("should return the component from render \ close for chaining", function() {
                var stub = sinon.stub(Components.ModalDialog.prototype, "template");
                modal = new Components.ModalDialog(attributes);
                expect(modal.render()).toEqual(modal);
                expect(modal.close(touchendEvent)).toEqual(modal);
                stub.restore();
            });

            it("should trigger an event when closing the view", function() {
                var spy = sinon.spy();
                new Components.ModalDialog(attributes).render().on("closed", spy).close(touchendEvent);
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
    });
});

