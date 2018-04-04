function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    hide_regex: document.querySelector("#hide_regex").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#hide_regex").value = result.hide_regex || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("hide_regex");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
