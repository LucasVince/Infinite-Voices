const { app, BrowserWindow, Menu } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Infinite Voices',
        icon: 'icon/icon.ico',
        webPreferences: {
            nodeIntegration: true
        }
    });

    Menu.setApplicationMenu(null);

    win.loadFile('dist/client/index.html');
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