/* Author:

*/
define(["models", "views"], function(Models, Views) {
    return {
        startup : function() {

            // Patch for enabling event.dataTransfer attribute on drag-n-drop event
            jQuery.event.fixHooks.drop = { props: [ "dataTransfer" ] };



            itemCollection = new Models.ItemCollection();

            itemsView = new Views.ItemCollectionView({
                collection : itemCollection
            });
            new Views.NewItemView({collection : itemCollection}).render();

            slider = new Views.SlidingFrameView({
                el : $("#templates"),
                childrenSelector : ".slider img"
            }).render();

            slider.on("templates/itemClicked", function(item) {
                $("#preview-container .template").remove();
                var template = $("<img>", {src : item.attr("src"), class : "template iphone-viewport"});
                $("#preview-container").prepend(template);
            });


            // Bootstrap tabs
            $('#.tabbable a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            })


        }
    };
});





