define(["backbone"], function(Backbone) {

    // EventBinder
    // -----------
    // The event binder facilitates the binding and unbinding of events
    // from objects that extend `Backbone.Events`. It makes
    // unbinding events, even with anonymous callback functions,
    // easy.
    //
    // Inspired by [Johnny Oshika](http://stackoverflow.com/questions/7567404/backbone-js-repopulate-or-recreate-the-view/7607853#7607853)

    var EventBinder = function(){
        this._eventBindings = [];
    };

    _.extend(EventBinder.prototype, {
        // Store the event binding in array so it can be unbound
        // easily, at a later point in time.
        bindTo: function (obj, eventName, callback, context) {
            context = context || this;
            obj.on(eventName, callback, context);

            var binding = {
                obj: obj,
                eventName: eventName,
                callback: callback,
                context: context
            };

            this._eventBindings.push(binding);

            return binding;
        },

        // Unbind from a single binding object. Binding objects are
        // returned from the `bindTo` method call.
        unbindFrom: function(binding){
            binding.obj.off(binding.eventName, binding.callback, binding.context);
            this._eventBindings = _.reject(this._eventBindings, function(bind){return bind === binding;});
        },

        // Unbind all of the events that we have stored.
        unbindAll: function () {
            var that = this;

            // The `unbindFrom` call removes elements from the array
            // while it is being iterated, so clone it first.
            var bindings = _.map(this._eventBindings, _.identity);
            _.each(bindings, function (binding, index) {
                that.unbindFrom(binding);
            });
        }
    });

    // Copy the `extend` function used by Backbone's classes
    EventBinder.extend = Backbone.View.extend;


    // Region
    // ------
    // Manage the visual regions of your composite application. See
    // http://lostechies.com/derickbailey/2011/12/12/composite-js-apps-regions-and-region-managers/
    var Region = function(options){
        this.options = options || {};

        var eventBinder = new EventBinder();
        _.extend(this, eventBinder, options);

        if (!this.el){
            var err = new Error("An 'el' must be specified");
            err.name = "NoElError";
            throw err;
        }

        if (this.initialize){
            this.initialize.apply(this, arguments);
        }
    };

    _.extend(Region.prototype, Backbone.Events, {

        // Displays a backbone view instance inside of the region.
        // Handles calling the `render` method for you. Reads content
        // directly from the `el` attribute. Also calls an optional
        // `onShow` and `close` method on your view, just after showing
        // or just before closing the view, respectively.
        show: function(view){

            this.ensureEl();
            this.close();

            view.render();
            this.open(view);

            if (view.onShow) { view.onShow(); }
            view.trigger("show");

            if (this.onShow) { this.onShow(view); }
            this.trigger("view:show", view);

            this.currentView = view;
        },

        ensureEl: function(){
            if (!this.$el || this.$el.length === 0){
                this.$el = this.getEl(this.el);
            }
        },

        // Override this method to change how the region finds the
        // DOM element that it manages. Return a jQuery selector object.
        getEl: function(selector){
            return $(selector);
        },

        // Override this method to change how the new view is
        // appended to the `$el` that the region is managing
        open: function(view){
            this.$el.html(view.el);
        },

        // Close the current view, if there is one. If there is no
        // current view, it does nothing and returns immediately.
        close: function(){
            var view = this.currentView;
            if (!view){ return; }

            if (view.close) { view.close(); }
            this.trigger("view:closed", view);

            delete this.currentView;
        },

        // Attach an existing view to the region. This
        // will not call `render` or `onShow` for the new view,
        // and will not replace the current HTML for the `el`
        // of the region.
        attachView: function(view){
            this.currentView = view;
        },

        // Reset the region by closing any existing view and
        // clearing out the cached `$el`. The next time a view
        // is shown via this region, the region will re-query the
        // DOM for the region's `el`.
        reset: function(){
            this.close();
            delete this.$el;
        }
    });

    // Copy the `extend` function used by Backbone's classes
    Region.extend = Backbone.View.extend;

    return {
        Region : Region
    }
});