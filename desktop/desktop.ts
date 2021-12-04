import { app, BrowserWindow } from "electron";
import path from "path";

let browserWindow: BrowserWindow;

const createWindow = () => {
  browserWindow = new BrowserWindow({
    // width: 500,
    // height: 500,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // when in prod
  // window.loadFile("../client/client.html");
  browserWindow.loadURL("http://localhost:9000/client.html");
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

app.on("quit", () => {
  if (browserWindow) {
    browserWindow.destroy();
  }
});
