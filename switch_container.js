/* This Source Code Form is subject to the terms of the Mozilla Public
 - License, v. 2.0. If a copy of the MPL was not distributed with this
 - file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* based on https://github.com/mdn/webextensions-examples/blob/master/contextual-identities/context.js */

/* switch containers */

function changeContainer(event)
{
  if (event.target.dataset.action = 'change')
  {
    var currentTab = browser.tabs.query({ currentWindow: true, active: true });

    currentTab.then( (tabs) =>
    {
      /* gets current tab info, then stores current tab's url */
      var currentTabInfo = browser.tabs.get( tabs[0].id );

      currentTabInfo.then( (tab) =>
      {
        if (tab.status == "complete")
        {
          var currentURL = tab.url !== "about:newtab" ? tab.url : null;
          var currentIndex = tab.index;
          var currentPinned = tab.pinned;

          var removeOldTab = true;
          if (event.button === 1 ||
              (event.button === 0 &&
              (event.ctrlKey || event.metaKey))) {
            removeOldTab = false;
          }

          /* duplicates tab with new identity */
          if (event.target.dataset.identity != -1)
          {
            browser.tabs.create({url: currentURL, cookieStoreId: event.target.dataset.identity, index: currentIndex+1, pinned: currentPinned, active: removeOldTab });
          }
          else
          {
            browser.tabs.create({url: currentURL, index: currentIndex+1, pinned: currentPinned, active: removeOldTab });
          }

          /* removes previous tab if not middle mouse clicked */
          if ( removeOldTab )
          {
            browser.tabs.remove( tabs[0].id );
          }
        }
      });
    });
  }
  return;
}

/* GUI */
function buildGUI(hide_regex) {
  var div = document.getElementById('identity-list');

  if (browser.contextualIdentities === undefined) { div.innerText = 'Containers are disabled :/'; }
  else
  {
    browser.contextualIdentities.query({})
      .then((identities) =>
      {
        if (!identities.length) { div.innerText = 'No container identities available.'; return; }

        for (let identity of identities)
        {
          if (hide_regex && hide_regex.test(identity.name)) {
            continue;
          }

          let button  = document.createElement('li');
          let icon    = document.createElement('span');
          let span    = document.createElement('span');
          let br      = document.createElement('br');

          let colorType = 'color';
          if (identity.hasOwnProperty('iconUrl')) {
            icon.style.mask = `url(${identity.iconUrl}) center / contain no-repeat`;
            colorType = 'background';
          }
          else {
            icon.innerHTML = '&#11044';
          }
          icon.className = 'icon';
          if (identity.hasOwnProperty('colorCode')) {
            icon.style[colorType] = identity.colorCode;
          }
          else {
            icon.style[colorType] = identity.color;
          }

          span.className = 'identity';
          span.innerText = identity.name;

          button.href = '#';
          button.dataset.action   = 'change';
          button.dataset.identity = identity.cookieStoreId;
          button.addEventListener('mouseup', changeContainer);

          button.appendChild(icon);
          button.appendChild(span);
          button.appendChild(br);

          div.appendChild(button);
        }

        /* decontainer */
        let button  = document.createElement('li');
        let icon    = document.createElement('span');
        let span    = document.createElement('span');
        let br      = document.createElement('br');

        icon.className = 'icon';
        icon.innerHTML = '&#11044';
        icon.style = `color: #888`;

        span.className = 'identity';
        span.innerText = 'Decontain';

        button.href = '#';
        button.dataset.action   = 'change';
        button.dataset.identity = -1;
        button.addEventListener('mouseup', changeContainer);
        button.style = `border-top: 1px solid #ccc`;

        button.appendChild(icon);
        button.appendChild(span);
        button.appendChild(br);

        div.appendChild(button);
      });
  }
}

/* Load options */
function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
  var hide_regex = "";
  if (item.hide_regex) {
    hide_regex = item.hide_regex;
  }
  if (hide_regex !== "") {
    buildGUI(new RegExp(hide_regex));
  } else {
    buildGUI();
  }
}

var getting = browser.storage.local.get("hide_regex");
getting.then(onGot, onError);
