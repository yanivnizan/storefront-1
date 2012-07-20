/* Author:

*/
define(["models", "views"], function(Models, Views) {
    return {
        startup : function() {

            // Patch for enabling event.dataTransfer attribute on drag-n-drop event
            jQuery.event.fixHooks.drop = { props: [ "dataTransfer" ] };


            var store = new Models.Store();
            var storeView = new Views.StoreView({
                model : store
            });

            var itemCollection = new Models.ItemCollection();
            var itemsView = new Views.ItemCollectionView({
                collection : itemCollection
            });
            new Views.NewItemView({collection : itemCollection}).render();

            var templateSlider = new Views.SlidingFrameView({
                el : $("#templates .slider-container"),
                childrenSelector : ".slider img"
            }).render();

            var backgroundSlider = new Views.SlidingFrameView({
                el : $("#backgrounds .slider-container"),
                childrenSelector : ".slider img"
            }).render();

            backgroundSlider.on("templates/itemClicked", function(item) {
                store.set("background", item.attr("src"));
            });


            // Bootstrap tabs
            $('#.tabbable a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            })


        }
    };
});





