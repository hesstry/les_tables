// filter functions for the filtering on the coins page

function filterCoinsByNameAscending() {
    //construct the URL and redirect to it
    window.location = '/coins/atoz'
}

function filterCoinsByNameDescending() {
    //construct the URL and redirect to it
    window.location = '/coins/ztoa'
}

function filterCoinsByPriceDescending() {
    //construct the URL and redirect to it
    window.location = '/coins/phitolo'
}

function filterCoinsByPriceAscending() {
    //construct the URL and redirect to it
    window.location = '/coins/plotohi'
}

function filterCoinsByChangeAscending() {
    //construct the URL and redirect to it
    window.location = '/coins/clotohi'
}

function filterCoinsByChangeDescending() {
    //construct the URL and redirect to it
    window.location = '/coins/chitolo'
}

function preventRefresh() {
    event.preventDefault();
}