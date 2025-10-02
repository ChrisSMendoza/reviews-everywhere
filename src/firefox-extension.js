
browser.runtime.sendMessage({ action: "fetchMessages" }, (response) => {
  console.log("Content script: response from background", response);
});
