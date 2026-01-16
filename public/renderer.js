// renderer.js - Processo de renderização (UI)

const handleClick = () => {
  alert('Olá! Você clicou no botão.');
  console.log('Botão clicado com sucesso!');
};

// Exemplo de comunicação com o processo principal via IPC
const sendToMain = (channel, data) => {
  if (window.electron) {
    window.electron.send(channel, data);
  }
};

// Exemplo de escuta de eventos do processo principal
const onMainEvent = (channel, callback) => {
  if (window.electron) {
    window.electron.on(channel, callback);
  }
};

// Log de inicialização
console.log('Aplicação Electron iniciada com sucesso!');
console.log('Versão do Node:', process.versions.node);
console.log('Versão do Chromium:', process.versions.chrome);
console.log('Versão do Electron:', process.versions.electron);
