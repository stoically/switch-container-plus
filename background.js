/* This Source Code Form is subject to the terms of the Mozilla Public
 - License, v. 2.0. If a copy of the MPL was not distributed with this
 - file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* based on https://github.com/mdn/webextensions-examples/blob/master/apply-css/background.js */

/* enable / disable container button */

/* only enable it on http(s) urls */
const APPLICABLE_PROTOCOLS = ["http:", "https:"];

/* checks if the url is a http(s) */
function protocolIsApplicable( url )
{
  var anchor  = document.createElement('a');
  anchor.href = url;
  return APPLICABLE_PROTOCOLS.includes( anchor.protocol );
}

 

/* enable/disable button */
function initializePageAction(tab)
{
  if ( protocolIsApplicable( tab.url ) )
  {
    browser.browserAction.enable( tab.id );
  }
  else
  {
    browser.browserAction.disable( tab.id );
  }
}

/* check if any tab changed */
browser.tabs.onUpdated.addListener( (id, changeInfo, tab) =>
{
  initializePageAction( tab );
});

/* init by checking all tabs */
var currentTabs = browser.tabs.query({});
currentTabs.then((tabs) =>
{
  for (let tab of tabs)
  {
    initializePageAction( tab );
  }
});