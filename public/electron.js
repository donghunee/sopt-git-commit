const electron = require("electron");
const Notification = electron.Notification;
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

if (isDev) {
    require('electron-debug')();
}

let mainWindow;

require("update-electron-app")({
  repo: "kitze/react-electron-example",
  updateInterval: "1 hour"
});

function createWindow() {
  mainWindow = new BrowserWindow({ width: 400, height: 400, webPreferences: { nodeIntegration: true }});
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );


  ipcMain.on('async-uncommit', (event, arg) => {
    var notification = new Notification({
        title:"sopt-C",
        body: "정민님 진로 한병 기부하실껀가요?? 얼른 커밋하세요",
        closeButtonText:"qwewq"
    });
    notification.show()
    event.sender.send('async-reply', 'async pong 제발좀 되렴')
  });

  ipcMain.on('async-commit', (event, arg) => {
    var notification = new Notification({
        title:"sopt-C",
        body: "1월 8일자 커밋 완료",
        closeButtonText:"qwewq"
    });
    notification.show()
    event.sender.send('async-reply', 'async pong 제발좀 되렴')
    
  });

  ipcMain.on('sync-message', (event, arg) => {
    console.log(arg);  // 'sync ping'
    event.returnValue = 'sync pong 제발좀 되라';
    });
    

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
