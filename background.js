/* This Source Code Form is subject to the terms of the Mozilla Public
 - License, v. 2.0. If a copy of the MPL was not distributed with this
 - file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* based on https://github.com/mdn/webextensions-examples/blob/master/apply-css/background.js */

/* enable / disable container button */

/* only enable it on http(s) urls */
const APPLICABLE_PROTOCOLS = ["http:", "https:", "about:blank", "about:newtab"];

/* checks if the url is applicable */
function protocolIsApplicable(url) {
  return APPLICABLE_PROTOCOLS.find(protocol => url.startsWith(protocol));
}



/* enable/disable button */
function initializePageAction(tab) {
  if (!tab.incognito && protocolIsApplicable(tab.url)) {
    browser.browserAction.enable(tab.id);
  } else {
    browser.browserAction.disable(tab.id);
  }
}

/* check if any tab changed */
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  if (changeInfo.url) {
    initializePageAction(tab);
  }
});

/* init by checking all tabs */
var currentTabs = browser.tabs.query({});
currentTabs.then((tabs) => {
  for (let tab of tabs) {
    initializePageAction( tab );
  }
});