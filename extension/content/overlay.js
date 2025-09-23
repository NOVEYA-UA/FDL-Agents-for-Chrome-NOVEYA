function escapeHtml(s){
  return String(s ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
function copyAsMarkdown(fdl, tldr){
  const md = [
    `### Σ‑FDL`,
    `**Thesis**: ${fdl.thesis}`,
    `**Antithesis**: ${fdl.antithesis}`,
    `**Synthesis**: ${fdl.synthesis}`,
    fdl.contradictions?.length ? `**Contradictions**:\n- ${fdl.contradictions.join('\n- ')}` : '',
    tldr ? `**TL;DR**:\n${tldr}` : ''
  ].filter(Boolean).join('\n\n');
  navigator.clipboard.writeText(md);
}
function downloadJson(fdl){
  const blob = new Blob([JSON.stringify(fdl, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  const ts = new Date().toISOString().replace(/[:.]/g,'-');
  a.download = `fdl-token-${ts}.json`;
  document.body.appendChild(a);
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 1000);
  a.remove();
}

function getReadableText(){
  const article = document.querySelector('article');
  const text = (article?.textContent || document.body.innerText || '').trim();
  return text.slice(0, 70000);
}
async function analyze(){
  const text = getReadableText();
  const res = await chrome.runtime.sendMessage({ type: 'FDL_ANALYZE', text });
  if (res?.error) return renderError(res.error);
  renderPanel(res.fdl, res.tldr);
}
function renderError(err){
  const div = document.createElement('div');
  div.id = 'fdl-panel';
  div.innerHTML = `<div class="fdl-box"><h3>Σ‑FDL</h3><p style="color:#b00">Error: ${escapeHtml(err)}</p></div>`;
  document.body.appendChild(div);
}
function renderPanel(fdl, tldr){
  const panel = document.createElement('div');
  panel.id = 'fdl-panel';
  panel.innerHTML = `
    <div class="fdl-box">
      <h3>Σ‑FDL</h3>
      <section><h4>Thesis</h4><p>${escapeHtml(fdl.thesis)}</p></section>
      <section><h4>Antithesis</h4><p>${escapeHtml(fdl.antithesis)}</p></section>
      <section><h4>Synthesis</h4><p>${escapeHtml(fdl.synthesis)}</p></section>
      ${fdl.contradictions?.length ? `<section><h4>Contradictions</h4><ul>$${fdl.contradictions.map(c=>`<li>$${escapeHtml(c)}</li>`).join('')}</ul></section>`:''}
      ${tldr ? `<section><h4>Summary</h4><div class="md">$${tldr}</div></section>` : ''}
      <div class="actions">
        <button id="fdl-copy">Copy Markdown</button>
        <button id="fdl-export">Export FDL‑Token</button>
      </div>
    </div>`;
  document.getElementById('fdl-panel')?.remove();
  document.body.appendChild(panel);
  document.getElementById('fdl-copy')?.addEventListener('click', () => copyAsMarkdown(fdl, tldr));
  document.getElementById('fdl-export')?.addEventListener('click', () => downloadJson(fdl));
}
;(()=>{
  // add minimal trigger button in the corner
  const btn = document.createElement('button');
  btn.textContent = 'Σ‑FDL';
  btn.id = 'fdl-trigger';
  btn.addEventListener('click', analyze);
  document.documentElement.appendChild(btn);
})();
