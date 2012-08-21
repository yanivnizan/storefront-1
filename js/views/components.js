define(["backbone", "templates/modal-component.handlebars"], function(Backbone) {

    var ModalDialog = Backbone.View.extend({
        className : "modal-container",
        events : {
            "touchend .close" : "close"
        },
        close : function() {
            this.remove();
        },
        initialize : function() {
            _.bindAll(this, "close");
        },
        template : Handlebars.templates["modal-component"],
        render : function() {
            this.$el.html(this.template());
            this.options.parent.append(this.$el);
            return this;
        }
    });

    return {
        ModalDialog : ModalDialog
    };
});