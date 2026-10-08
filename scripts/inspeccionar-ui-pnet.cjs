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
const result = await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('DOM inspection timed out.')), 5000);
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.id !== 1) return;
    clearTimeout(timer);
    resolve(message.result?.result?.value ?? message.result?.exceptionDetails?.text ?? 'No page result');
  };
  socket.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: {
      returnByValue: true,
      expression: `(()=>{const e=[...document.querySelectorAll('*')].find(x=>x.children.length===0&&x.textContent.trim()==='Login');const ancestors=[];for(let n=e;n&&ancestors.length<6;n=n.parentElement)ancestors.push({tag:n.tagName,id:n.id,cls:n.className,onclick:n.getAttribute('onclick'),html:n.outerHTML.slice(0,450)});return JSON.stringify({title:document.title,url:location.href,text:document.body.innerText.slice(0,2500),fields:[...document.querySelectorAll('input')].map(x=>({type:x.type,name:x.name,id:x.id,placeholder:x.placeholder,outer:x.outerHTML,parent:x.parentElement?.outerHTML.slice(0,500)})),loginAncestors:ancestors,images:[...document.images].map(x=>({alt:x.alt,width:x.naturalWidth,height:x.naturalHeight,srcStart:x.src.slice(0,60)})),clickables:[...document.querySelectorAll('button,a,[role=button],input[type=submit]')].map(x=>({text:x.innerText,value:x.value,id:x.id,href:x.href,onclick:x.getAttribute('onclick'),outer:x.outerHTML.slice(0,600)}))})})()`
    }
  }));
});
console.log(result);
socket.close();
}

main().catch((error) => { console.error(error.message); process.exitCode = 1; });
