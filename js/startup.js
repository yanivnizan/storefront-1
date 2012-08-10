/* Author:

*/
define(["models", "views"], function(Models, Views) {
    return {
        startup : function() {

            // Patch for enabling event.dataTransfer attribute on drag-n-drop event
            jQuery.event.fixHooks.drop = { props: [ "dataTransfer" ] };



            // Bind the preview iframe to the store model once it's load
            $("#preview-frame").load(function() {
                var store = $(this)[0].contentWindow.SoomlaJS.initialize();

                // TODO: Move all DOM binding out, and only assign the store model in here

                var uploadBackgroundView = new Views.DragDropView({
                    el : $("#backgrounds .drag-drop")
                }).on("backgroundAdded", function(img) {
                    store.set("background", img.attr("src"));
                });

                var goodsCollection = store.get("virtualGoods");
                var itemsView = new Views.ItemCollectionView({
                    collection : goodsCollection
                });


                var newItem = new Views.NewItemView({collection : goodsCollection}).render();

                var templateSlider = new Views.SlidingFrameView({
                    el : $("#templates .slider-container"),
                    childrenSelector : ".slider img"
                }).render().on("templates/itemClicked", function(img) {
                    store.set("templateName", img.data("template"));
                });

                var backgroundSlider = new Views.SlidingFrameView({
                    el : $("#backgrounds .slider-container"),
                    childrenSelector : ".slider img"
                }).render().on("templates/itemClicked", function(item) {
                    store.set("background", item.attr("src"));
                });

                // TODO: refactor to a backbone view that controls the entire background selection widget.
                $("#background-upload").change(function() {
                    var option = $(this);
                    if (option.is(":checked") && $("#backgrounds .drag-drop img").length > 0) {
                        store.set("background", $("#backgrounds .drag-drop img").attr("src"));
                    }
                });
                $("#background-predefined").change(function() {
                    var option = $(this);
                    if (option.is(":checked") && $("#backgrounds .slider img.selected").length > 0) {
                        store.set("background", $("#backgrounds .slider img.selected").attr("src"));
                    }
                });


                new Views.TextView({ model : store }).render();


                // Prevent navigation when dropping files in the document
                $("body").on("drop", function(event) { return false; });

                // Bootstrap tabs
                $('#.tabbable a').click(function (e) {
                    e.preventDefault();
                    $(this).tab('show');
                });

                // Background options
                var collapseExpand = function(collapsee, expandee) {
                    collapsee.on("transitionend.collapse webkitTransitionEnd.collapse oTransitionEnd.collapse", function() {
                        collapsee.off(".collapse");
                        expandee.addClass("expand");
                    }).removeClass("expand");
                };
                var first   = $("#backgrounds input:radio:first");
                var second  = $("#backgrounds input:radio:last");
                first.click(function() { collapseExpand(second.parent().next(), first.parent().next()); });
                second.click(function() { collapseExpand(first.parent().next(), second.parent().next()); });



            }).attr("src", "store.html");

        }
    };
});





