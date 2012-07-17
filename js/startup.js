/* Author:

*/
define(["models", "views"], function(Models, Views) {
    return {
        startup : function() {

            // Patch for enabling event.dataTransfer attribute on drag-n-drop event
            jQuery.event.fixHooks.drop = { props: [ "dataTransfer" ] };


            var Slider = Backbone.View.extend({
                el : $("#templates"),
                initialize : function(options) {
                    _.bindAll(this, "maxMovement");
                    this.children = options.children;
                    this.slot = this.children.first().outerWidth(true);
                    this.xOffset = 0;
                    this.maxViewable = 3;
                },
                events : {
                    "click .next" : function(event) {
                        this.xOffset -= this.slot;
                        this.$(".slider").css("transform", "translateX(" + this.xOffset + "px)");
                        this.$(".previous").css("visibility", "");
                        if (this.xOffset == this.maxMovement()) this.$(".next").css("visibility", "hidden");
                    },
                    "click .previous" : function(event) {
                        this.xOffset += this.slot;
                        this.$(".slider").css("transform", "translateX(" + this.xOffset + "px)");
                        $(".next").css("visibility", "");
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
                    this.$(".previous").css("visibility", "hidden");
                    this.$(".slider").css("width", this.slot * this.children.length + 50);
                    return this;
                }
            });

            itemCollection = new Models.ItemCollection();

            itemsView = new Views.ItemCollectionView({
                collection : itemCollection
            });
            new Views.NewItemView({collection : itemCollection}).render();

            slider = new Slider({children : $(".slider img")}).render();

            slider.on("templates/itemClicked", function(item) {
                $("#preview-container .template").remove();
                var template = $("<img>", {src : item.attr("src"), class : "template iphone-viewport"});
                $("#preview-container").prepend(template);
            });

        }
    };
});





