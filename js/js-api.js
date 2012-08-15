/**
 * This set of functions is an API implemented by the Javascript code and is provided for the native code to invoke.
 */
define({
    // in case Market purchases are not supported we only want to show the goods store
    disableCurrencyStore : function() {
        alert("Sorry bub, not implemented yet.");
    },
    /**
     *
     * Android signature : currencyPurchaseEnded(boolean success, String itemId, int currentBalance, String failureMessage)
     * @param boolean
     */
    currencyPurchased : function(success, itemId, currentBalance, failureMessage) {
        if (success)
            SoomlaJS.store.get("currency").set("balance", currentBalance);
    },
    /**
     * Android signature : goodsPurchaseEnded(boolean success, String itemId, int currentBalance, String failureMessage)
     * @param boolean
     */
    goodsPurchased : function(success, itemId, currentBalance, failureMessage) {
        alert("Sorry bub, not implemented yet.");
    },
    // The native UI is going to be destroyed
    destroy : function() {
        alert("Sorry bub, not implemented yet.");
    }
});