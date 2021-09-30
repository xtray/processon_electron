// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

const mainWindowURL = 'https://www.processon.com';

let mainWindow;

//api:https://wizardforcel.gitbooks.io/electron-doc/content/api/browser-window.html
function createWindow () {
    console.log("createWindow......");
    mainWindow = new BrowserWindow({
        // fullscreen: true,
        maximizable: true, //支持最大化
        show: false,   //为了让初始化窗口显示无闪烁，先关闭显示，等待加载完成后再显示。
        // icon: "https://medical.3vyd.com/alk/prod/pc/icon/icon.ico"
    })

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        console.log("closed......");
        mainWindow = null;
    })
    // mainWindow.once('ready-to-show', () => {    //开启这个以后点击了图片虽然没有白屏，但是会感觉不到点了没点
    mainWindow.maximize();    //打开时最大化打开，不是全屏，保留状态栏
    // })

    // mainWindow.setOverlayIcon(overlay, "ProcessOn")
    mainWindow.setTitle("ProcessOn");
    mainWindow.setAutoHideMenuBar(true);//自动隐藏菜单
    mainWindow.loadURL(mainWindowURL);
    // app.commandLine.appendSwitch("--disable-http-cache")   禁用缓存
    // mainWindow.webContents.openDevTools({mode:'bottom'});
    mainWindow.show();
}
// function createWindow () {
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js')
//     }
//   })
//
//   // and load the index.html of the app.
//   mainWindow.loadFile('index.html')
//
//   // Open the DevTools.
//   // mainWindow.webContents.openDevTools()
// }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
