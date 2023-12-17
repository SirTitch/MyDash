//Reducer Actions
export function setUserLoggedIn(payload) {
    return {type: 'USER_LOGGED_IN', payload};
}
export function setUserProfile(payload) {
    return {type: 'USER_PROFILE', payload};
}
export function setTopSellers(payload) {
    return {type: 'TOP_SELLERS', payload};
}
export function setOutOfStock(payload) {
    return {type: 'OUT_OF_STOCK', payload};
}
export function setAllItems(payload) {
    return {type: 'ALL_ITEMS', payload};
}
