const { app, BrowserWindow } = require("electron");

console.log("do it");

const createWindow = () => {
  const window = new BrowserWindow({
    width: 500,
    height: 500,
  });

  window.loadFile("main.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
