define(["handlebars"], function() {

    var itemTemplate = Handlebars.compile($("#item-template").html());
//    var itemCollectionTemplate = Handlebars.compile($("#item-template").html());

    var ItemView = Backbone.View.extend({
        className : "item",
        render : function() {
            console.log(this.model);
            this.$el.append(itemTemplate(this.model.toJSON()));
            return this;
        }
    });

    var NewItemView = Backbone.View.extend({
        el : $("#new-item"),
        initialize : function() {
            _.bindAll(this, "submit");
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
            this.$el.removeClass("drag-over");
            this.$("label.error,label.valid").remove()
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
                        $this.$el.append($("<img>", {src : evt.target.result}));
                    };
                    reader.readAsDataURL(files[0]);
                }
            },
            "dragenter" : function() {
                this.$el.addClass("drag-over");
            },
            "dragleave" : function() {
                this.$el.removeClass("drag-over");
            }
        },
        render : function() {
            $("#new-item").validate({
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

    return {
        ItemCollectionView : ItemCollectionView,
        NewItemView : NewItemView
    };
});