
browser.runtime.sendMessage({ action: "fetchData", url: "https://api.example.com/data" }, (response) => {
  console.log("Content script: response from background", response);
});
