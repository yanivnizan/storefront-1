Soomla.initialize({
    template : {
        name : "basic",
        elements : {
            title : {
                name : "The surfboard store"
            },
            buyMore : {
                text : "Buy more clams"
            }
        }
    },
    background : "img/theme-lime-bubbles.jpg",
    currency : {
        name : "clams",
        image : "img/assets/clam.png"
    },
    virtualGoods : [
        {
            name : "Rip Curl Shortboard",
            description : "Shred the small waves with this super-fast board",
            src : "img/surfboards/blue-surfboard.png",
            price : 100,
            productId : 2988822
        },
        {
            name : "Billanbog Vintage Longboard",
            description : "Slowly glide through low power surf and hang five",
            src : "img/surfboards/girl-surfboard-th.png",
            price : 150,
            productId : 2988823
        }
    ]


});
