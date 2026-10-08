const fs = require('node:fs');
const path = require('node:path');

async function main() {
  const targets = await (await fetch('http://127.0.0.1:9223/json/list')).json();
  const page = targets.find((item) => item.type === 'page' && item.url.includes('192.168.22.132'));
  if (!page) throw new Error('PNETLab page not found in the isolated Edge session.');
  const socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('DevTools connection timed out.')), 5000);
    socket.onopen = () => { clearTimeout(timer); resolve(); };
    socket.onerror = () => { clearTimeout(timer); reject(new Error('DevTools WebSocket failed.')); };
  });
  const evaluate = (id, method, params) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('GUI operation timed out.')), 5000);
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id !== id) return;
      clearTimeout(timer);
      resolve(message.result);
    };
    socket.send(JSON.stringify({ id, method, params }));
  });
  await evaluate(1, 'Runtime.evaluate', { expression: `(()=>{const image=document.querySelector('img[alt="captchar"]');if(image){image.style.width='320px';image.style.height='160px';image.style.imageRendering='pixelated';}return 'captcha enlarged';})()` });
  const screenshot = await evaluate(2, 'Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  const image = screenshot?.data;
  if (!image) throw new Error('Screenshot returned no image data.');
  const file = path.join(process.env.TEMP, 'pnet-infra2-login.png');
  fs.writeFileSync(file, Buffer.from(image, 'base64'));
  console.log(file);
  socket.close();
}

main().catch((error) => { console.error(error.message); process.exitCode = 1; });
