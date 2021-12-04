const { app, BrowserWindow } = require("electron");

console.log("do it");

const createWindow = () => {
  const window = new BrowserWindow({
    width: 500,
    height: 500,
  });

  window.loadFile("main.html");
};

app.on("ready", () => {
  createWindow();
});
