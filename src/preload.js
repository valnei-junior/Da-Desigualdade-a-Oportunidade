const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  send: (channel, args) => {
    ipcRenderer.send(channel, args);
  },
  on: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  invoke: (channel, args) => {
    return ipcRenderer.invoke(channel, args);
  }
});
