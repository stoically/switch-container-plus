# Switch Containers

**Switch Containers** is a WebExt-based Firefox add-on that allows users to switch the current tab's container on the fly.

The add-on is officially available here: https://addons.mozilla.org/en-US/firefox/addon/switch-container/

## Known bugs

### Switching the container tab removes the tab's history

As far as I've figured out,. the API doesn't allow for changing the `cookieStoreId` of a given tab unless a new tab is created with `browser.tabs.create`. This implementation basically recreates the current tab into a newly created tab then removes the original, which means that the tab's history is gone with the original tab.

Unless I can find a way to change the `cookieStoreId` of a tab without creating a new tab, or copy a previous tab's history into a newly created tab, then the tab history of any switched tab will be gone.

However, considering the assumed purpose of container tabs, this might be a trivial(?).

## Sources

This add-on was built based on the following sources:

- **Button enabling only on `http(s)` url tabs:**
-- `https://github.com/mdn/webextensions-examples/blob/master/apply-css/background.js`
- **Contextual identities handling:**
-- `https://github.com/mdn/webextensions-examples/blob/master/contextual-identities/context.js`
- **Pop-up html/css:**
-- `https://github.com/mdn/webextensions-examples/blob/master/contextual-identities/context.html` (html)
-- `https://github.com/mdn/webextensions-examples/blob/master/contextual-identities/context.css` (css)
- **Icon:**
-- `omni.ja\chrome\browser\content\browser\`