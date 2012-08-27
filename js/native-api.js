/**
 * This set of functions is an API implemented by the native code and is provided for the Javascript code to invoke.
 * Since the native code should provide this interface, it is currently implemented with stubs.
 */
define({
    wantsToBuyVirtualGoods  : function(model) {},
    wantsToBuyCurrencyPacks : function(model) {},
    wantsToLeaveStore       : function() {},
    storeInitialized        : function() {}
});