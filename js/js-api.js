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
     * Android signature : currencyPurchaseEnded(JSONObject balances)
     * @param boolean
     */
    currencyBalanceChanged : function(balances) {
        SoomlaJS.store.setBalance(balances);
    },
    /**
     * Android signature : goodsPurchaseEnded(String itemId, int balance)
     * @param boolean
     */
    goodsBalanceChanged : function(itemId, balance) {
        SoomlaJS.store.setVirtualGoodBalance(itemId, balance);
    },
    insufficientFunds : function(currency) {
        SoomlaJS.storeView.openDialog(currency);
    },
    unexpectedError : function() {
        alert("An unexpected error has occurred.  Please try again.");
    },
    // The native UI is going to be destroyed
    destroy : function() {
        alert("Sorry bub, not implemented yet.");
    }
});