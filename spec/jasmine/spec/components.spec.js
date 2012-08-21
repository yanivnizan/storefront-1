define("components.spec", ["components"], function (Components) {

    describe('Soomla Store Backbone Components', function () {

        var modal, el, parent;

        describe("ModalDialog component", function() {

            beforeEach(function() {
                el      = $("<div class='modal'><span class='close'></span></div>");
                parent  = $("<div>");
                modal   = new Components.ModalDialog({parent : parent});
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

            it("should receive a jQuery parent element", function() {
                expect(modal.options.parent).toEqual(parent);
            });

            it("should have have a tap event on the close button and overlay", function() {
                expect(modal.events["touchend .close"]).toBeDefined();
                expect(modal.events["touchend .modal"]).toBeDefined();
            });

            it("should close the modal when the close button \ overlay is tapped", function() {
                _.each([".close", ".modal"], function(selector) {
                    var spy = sinon.spy(Components.ModalDialog.prototype, "close");
                    var touchendEvent = $.Event("touchend", {originalEvent : {touches : [1]}});
                    new Components.ModalDialog({parent : parent}).render().$(selector).trigger(touchendEvent);
                    expect(spy.called).toBeTruthy();
                    spy.restore();
                });
            });

            it("should remove element from DOM when closed", function() {
                modal.close();
                expect(modal.$el.parent().length).toEqual(0);
            });

            // TODO: Detach from events when closing

            it("should have a template defined", function() {
                expect(modal.template).toBeDefined();
            });
            it("should use the template when rendering", function() {
                var spy = sinon.spy(Components.ModalDialog.prototype, "template");
                new Components.ModalDialog({parent : parent}).render();
                expect(spy.called).toBeTruthy();
                spy.restore();
            });
            it("should return the component from render for chaining", function() {
                var stub = sinon.stub(Components.ModalDialog.prototype, "template");
                modal = new Components.ModalDialog({parent : parent});
                expect(modal.render()).toEqual(modal);
                stub.restore();
            });
        });
    });
});

