const { app, BrowserWindow, Menu, screen } = require('electron');

const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const win = new BrowserWindow({
        minWidth: 1280, 
        minHeight: 720, 
        width: width, 
        height: height,
        title: 'Infinite Voices',
        icon: './icon/icon.ico',
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.maximize();

    Menu.setApplicationMenu(null);

    win.loadFile('dist/client/pages/Home/Home.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});