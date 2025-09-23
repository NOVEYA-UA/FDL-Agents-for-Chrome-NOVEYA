let hybrid=false;
document.getElementById('toggle-hybrid').addEventListener('click', e=>{
  hybrid=!hybrid;
  e.target.textContent = 'Hybrid: ' + (hybrid?'On':'Off');
  chrome.storage.local.set({fdl_hybrid: hybrid});
});
document.getElementById('run-fdl').addEventListener('click', async ()=>{
  const [tab] = await chrome.tabs.query({active:true, currentWindow:true});
  if (!tab?.id) return;
  await chrome.scripting.executeScript({target:{tabId:tab.id}, func:()=>window.dispatchEvent(new Event('fdl-run'))});
});
