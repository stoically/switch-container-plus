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

## What's New
- **Version 0.8**
-- Now the add-on uses proper colors, fonts and icons. Thanks to Martin Giger for contributing to this new version!
- **Version 0.7**
-- Pinned tabs remained pinned, but must be repositioned.
- **Version 0.6**
-- Decontains container tabs.
- **Version 0.5**
-- [Discarded].
- **Version 0.4**
-- Removed leftover debugging features.
- **Version 0.3**
-- Made the icon darker.
- **Version 0.2**
-- Fixed manifest.
- **Version 0.1**
-- First version of the add-on.