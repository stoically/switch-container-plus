# Switch Containers

**Switch Containers** is a WebExt-based Firefox add-on that allows users to switch the current tab's container on the fly, and revert a container tab back to a regular tab.

The add-on is officially available here: https://addons.mozilla.org/en-US/firefox/addon/switch-container/

IMPORTANT: There are security concerns involved when changing a tab between containers. Before installing, please read this article on the matter: https://github.com/mozilla/testpilot-containers/wiki/Moving-between-containers

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