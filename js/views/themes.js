define(["templates", "components"], function(Templates, Components) {


    var Themes = {
        empty : {
            virtualGoodsView : {
                type : Components.CollectionListView,
                item : {
                    type : Components.ListItemView,
                    template : Templates["empty"]["virtualGood"]
                }
            },
            currencyPacksView : {
                type : Components.CollectionListView,
                item : {
                    type : Components.ListItemView,
                    template : Templates["empty"]["currencyPack"]
                }
            },
            modalDialogTemplate : Templates["empty"]["modalDialog"]
        },
        basic : {
            virtualGoodsView : {
                type : Components.CollectionListView,
                item : {
                    type : Components.ListItemView,
                    template : Templates["basic"]["virtualGood"]
                }
            },
            currencyPacksView : {
                type : Components.CollectionListView,
                item : {
                    type : Components.ListItemView,
                    template : Templates["basic"]["currencyPack"]
                }
            },
            modalDialogTemplate : Templates["basic"]["modalDialog"]
        },
        grid : {
            virtualGoodsView : {
                type : Components.CollectionGridView,
                item : {
                    type : Components.GridItemView,
                    template : Templates["grid"]["virtualGood"]
                }
            },
            currencyPacksView : {
                type : Components.CollectionListView,
                item : {
                    type : Components.ListItemView,
                    template : Templates["grid"]["currencyPack"]
                }
            },
            modalDialogTemplate : Templates["grid"]["modalDialog"]
        },
        muffinRush : {
            virtualGoodsView : {
                type : Components.CollectionListView,
                item : {
                    type : Components.ListItemView,
                    template : Templates["muffinRush"]["virtualGood"]
                }
            },
            currencyPacksView : {
                type : Components.CollectionListView,
                item : {
                    type : Components.ListItemView,
                    template : Templates["muffinRush"]["currencyPack"]
                }
            },
            modalDialogTemplate : Templates["muffinRush"]["modalDialog"]
        }
    };

    return Themes;
});