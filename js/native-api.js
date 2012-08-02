define({
    // in case Market purchases are not supported we only want to show the goods store
    disableCurrencyStore : function() {
        alert("Sorry bub, not implemented yet.");
    },
    /**
     * Android signature : currencyPurchaseEnded(boolean success, String soomlaId, int currentBalance, String failureMessage)
     * @param boolean
     */
    currencyPurchaseEnded : function(success, soomlaId, currentBalance, failureMessage) {
        alert("Sorry bub, not implemented yet.");
    },
    /**
     * Android signature : goodsPurchaseEnded(boolean success, String soomlaId, int currentBalance, String failureMessage)
     * @param boolean
     */
    goodsPurchaseEnded : function(success, soomlaId, currentBalance, failureMessage) {
        alert("Sorry bub, not implemented yet.");
    },
    // The native UI is going to be destroyed
    destroy : function() {
        alert("Sorry bub, not implemented yet.");
    },
    // This might be a duplicate of initialize (we might only want "refresh")
    refresh : function(json) {
        alert("Sorry bub, not implemented yet.");
    }

});