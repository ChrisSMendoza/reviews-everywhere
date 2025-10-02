
const sending = browser.runtime.sendMessage({
    action: "fetchMessages",
});

sending.then(console.log, console.error);
