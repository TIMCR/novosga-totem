const { app, BrowserWindow } = require('electron')

let win;

function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({
		width: '100%',
		height: '100%',
		backgroundColor: '#ffffff',
		icon: `file://${__dirname}/assets/brasao.png`,
		nativeWindowOpen: true,
	})
	win.setFullScreen(true)


	win.loadURL(`file://${__dirname}/dist/index.html`)

	//// uncomment below to open the DevTools.
	// win.webContents.openDevTools()

	// Event when the window is closed.
	win.on('closed', function () {
		win = null
	})
	win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
		if (frameName === 'senha') {
			// open window as modal
			event.preventDefault()
			Object.assign(options, {
				modal: true,
				parent: win,
				width: 1,
				height: 1,
				transparent: true,
				minimizable: false,
				maximizable: false
			})
			event.newGuest = new BrowserWindow(options)
			event.newGuest.loadURL(url);
			setTimeout(() => {
				event.newGuest.webContents.print({ silent: true })
			}, "1000");
			setTimeout(() => {
				event.newGuest.close()
			}, "2000");
		}
	})
	

}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

	// On macOS specific close process
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	// macOS specific close process
	if (win === null) {
		createWindow()
	}
})