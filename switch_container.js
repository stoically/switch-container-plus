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
          var currentURL = tab.url;
          var currentIndex = tab.index;

          /* duplicates tab with new identity */
          browser.tabs.create({url: currentURL, cookieStoreId: event.target.dataset.identity, index: currentIndex+1 });
          
          /* removes previous tab */
          browser.tabs.remove( tabs[0].id );
        }
      });
    });
    
    event.preventDefault();
  }
  return;
}

/* GUI */
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
      let button  = document.createElement('a');
      let icon    = document.createElement('span');
      let span    = document.createElement('span');
      let br      = document.createElement('br');
      
      icon.className = 'icon';
      icon.innerHTML = '&#11044';
      icon.style = `color: ${identity.color}`;
      
      span.className = 'identity';
      span.innerText = identity.name;

      button.href = '#';
      button.dataset.action   = 'change';
      button.dataset.identity = identity.cookieStoreId;
      button.addEventListener('click', changeContainer);
      
      button.appendChild(icon);
      button.appendChild(span);
      button.appendChild(br);
     
      div.appendChild(button);
    }
  });
}