/**
 * This set of functions is an API implemented by the Javascript code and is provided for the native code to invoke.
 */
define({
    // in case Market purchases are not supported we only want to show the goods store
    disableCurrencyStore : function() {
        // Raise a flag to indicate that the currency store can't be opened (probably due to connectivity issues)
        SoomlaJS.store.set("isCurrencyStoreDisabled", true);
    },
    /**
     *
     * Android signature : currencyPurchaseEnded(boolean success, String productId, int currentBalance, String failureMessage)
     * @param boolean
     */
    currencyPurchased : function(success, productId, currentBalance, failureMessage) {
        if (success)
            SoomlaJS.store.setBalance(currentBalance);
    },
    /**
     * Android signature : goodsPurchaseEnded(boolean success, String itemId, int currentBalance, String failureMessage)
     * @param boolean
     */
    goodsPurchased : function(success, itemId, currentBalance, failureMessage) {
        if (success) {
            SoomlaJS.store.incrementVirtualGoodBalance(itemId);
            SoomlaJS.store.setBalance(currentBalance);
        }
    },
    // The native UI is going to be destroyed
    destroy : function() {
        alert("Sorry bub, not implemented yet.");
    }
});