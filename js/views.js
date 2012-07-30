define(["handlebars"], function() {

    var itemTemplate = Handlebars.compile($("#item-template").html());
//    var itemCollectionTemplate = Handlebars.compile($("#item-template").html());


    var SlidingFrameView = Backbone.View.extend({
        initialize : function(options) {
            this.slider = this.$(".slider");
            this.previousButton = this.$(".previous");
            this.nextButton = this.$(".next");

            _.bindAll(this, "maxMovement");
            this.children = this.$(options.childrenSelector);
            this.slot = this.children.first().outerWidth(true);
            this.xOffset = 0;
            this.maxViewable = options.maxViewable || 3;
        },
        events : {
            "click .next" : function(event) {
                this.xOffset -= this.slot;
                this.slider.css("transform", "translateX(" + this.xOffset + "px)");
                this.previousButton.css("visibility", "");
                if (this.xOffset == this.maxMovement()) this.nextButton.css("visibility", "hidden");
            },
            "click .previous" : function(event) {
                this.xOffset += this.slot;
                this.slider.css("transform", "translateX(" + this.xOffset + "px)");
                this.nextButton.css("visibility", "");
                if (this.xOffset == 0) $(event.target).css("visibility", "hidden");
            },
            "click img" : function(event) {
                var img = $(event.target);
                this.$("img").removeClass("selected");
                img.addClass("selected");
                this.trigger("templates/itemClicked", img);
            }
        },
        maxMovement : function() {
            return (-(Math.max(0, this.children.length - this.maxViewable)) * this.slot);
        },
        render : function() {
            this.previousButton.css("visibility", "hidden");
            this.slider.css("width", this.slot * this.children.length + 50);
            return this;
        }
    });


    var DragDropView = Backbone.View.extend({
        initialize : function(options) {
            if (options.dragenter) this.events.dragenter = options.dragenter;
            if (options.dragleave) this.events.dragleave = options.dragleave;
        },
        events : {
            "drop" : function(event) {
                event.stopPropagation();
                event.preventDefault();
                var $this = this;
                var files = event.dataTransfer.files;
                if (files.length > 0) {
                    var reader = new FileReader();

                    reader.onload = function(evt) {
                        $this.$("img").remove();
                        var img = $("<img>", {src : evt.target.result});
                        $this.$el.append(img);
                        $this.trigger("backgroundAdded", img);
                    };
                    reader.readAsDataURL(files[0]);
                }
            },
            "dragenter" : function() {
                this.$el.addClass("drag-enter");
            },
            "dragleave" : function() {
                this.$el.removeClass("drag-enter");
            }
        }
    });

    var ItemView = Backbone.View.extend({
        className : "item",
        render : function() {
            this.$el.append(itemTemplate(this.model.toJSON()));
            return this;
        }
    });

    var NewItemView = Backbone.View.extend({
        el : $("#new-item"),
        initialize : function() {
            _.bindAll(this, "submit");

            // Initialize sub views
            new DragDropView({
                el : this.$(".drag-drop"),
                dragenter : function(event) {
                    this.$el.addClass("expanded");
                },
                dragleave : function(event) {
                    if (this.$("img").length == 0) this.$el.removeClass("expanded");
                }
            });
        },
        submit : function(form) {
            this.collection.unshift({
                name : this.$("input[name='name']").val(),
                price : this.$("input[name='price']").val(),
                src : this.$("img").attr("src")
            });
            this.$("input").val("");
            this.$(".control-group").removeClass("error success");
            this.$("img").remove();
            this.$("label.error,label.valid").remove()
        },
        render : function() {
            this.$el.validate({
                rules : {
                    name : {
                        required : true
                    },
                    price : {
                        required : true,
                        number : true,
                        min : 0
                    }
                },
                messages:{
                    name : {
                        required : "Required"
                    },
                    price : {
                        required : "Required"
                    }
                },
                highlight : function(label) {
                    $(label).closest('.control-group').removeClass('success').addClass('error');
                },
                success : function(label) {
                    label.addClass('valid').closest('.control-group').addClass('success');
                },
                submitHandler : this.submit
            });
            return this;
        }
    });

    var ItemCollectionView = Backbone.View.extend({
        el : $("#items"),
        initialize : function () {
            this.collection.on("add", this.render, this);
        },
        render : function() {
            this.$el.empty(); // So that we don't append the categories several times
            var $this = this;
            this.collection.each(function(item) {
                $this.$el.append(new ItemView({ model : item }).render().el);
            });
            return this;
        }
    });

    var TextView = Backbone.View.extend({
        el : $("#custom-texts"),
        events : {
            "keyup #more-currency-text" : function(event) {
                this.model.set({moreCurrencyText : $(event.target).val()});
            },
            "keyup #template-title" : function(event) {
                this.model.set({templateTitle : $(event.target).val()});
            }
        },
        render : function() {
            this.$("#more-currency-text").val(this.model.get("moreCurrencyText"));
            this.$("#template-title").val(this.model.get("templateTitle"));
        }
    });


    return {
        ItemCollectionView : ItemCollectionView,
        NewItemView : NewItemView,
        SlidingFrameView : SlidingFrameView,
        DragDropView : DragDropView,
        TextView : TextView
    };
});