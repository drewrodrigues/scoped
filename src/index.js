var _a = require("electron"), app = _a.app, BrowserWindow = _a.BrowserWindow;
var path = require("path");
console.log("do it");
var createWindow = function () {
    var window = new BrowserWindow({
        width: 500,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });
    window.loadFile("main.html");
};
app.whenReady().then(function () {
    createWindow();
    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
app.on("window-all-closed", function () {
    if (process.platform !== "darwin")
        app.quit();
});
