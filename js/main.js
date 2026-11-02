
const state={config:null,lang:'pt'};
const page=document.body.dataset.page;
const $=(s)=>document.querySelector(s);
async function init(){
 try{const r=await fetch('config.json');if(!r.ok)throw new Error('config');state.config=await r.json();}
 catch(e){console.error('Não foi possível carregar config.json. Execute através de um servidor local.',e);return;}
 const saved=localStorage.getItem('ssm-language');state.lang=state.config.languages.includes(saved)?saved:'pt';
 const picker=$('#language');if(picker){picker.value=state.lang;picker.addEventListener('change',()=>setLanguage(picker.value));}
 applyLanguage();$('#year').textContent=new Date().getFullYear();
 const toggle=$('.nav-toggle');toggle?.addEventListener('click',()=>{$('.main-nav').classList.toggle('open');toggle.setAttribute('aria-expanded',$('.main-nav').classList.contains('open'));});
 if(page==='menu')renderMenu();if(page==='booking')renderTables();if(page==='contact')renderContact();if(page==='booking')setupBooking();
}
function setLanguage(lang){state.lang=lang;localStorage.setItem('ssm-language',lang);document.documentElement.lang=lang;applyLanguage();if(page==='menu')renderMenu();if(page==='booking')renderTables();}
function t(key){return state.config.texts[state.lang]?.[key]??state.config.texts.pt[key]??key;}
function applyLanguage(){document.documentElement.lang=state.lang;document.querySelectorAll('[data-i18n]').forEach(el=>{const value=t(el.dataset.i18n);if(value)el.textContent=value;});}
function renderMenu(){
 const cats=state.config.menu.categories||[],items=(state.config.menu.items||[]).filter(x=>x.active!==false);
 const catRoot=$('#menu-categories'),root=$('#menu-items');catRoot.innerHTML='';root.innerHTML='';
 if(!items.length){$('#menu-empty').hidden=false;return;}$('#menu-empty').hidden=true;
 cats.forEach(c=>{const h=document.createElement('h2');h.textContent=c.name?.[state.lang]||c.name?.pt||c.name||'';catRoot.append(h);});
 items.forEach(item=>{const card=document.createElement('article');card.className='dish';const image=document.createElement('img');image.src=item.image||'public/images/prato-a-adicionar.webp';image.alt=item.name?.[state.lang]||item.name?.pt||item.name;image.onerror=()=>image.style.display='none';const h=document.createElement('h3');h.textContent=item.name?.[state.lang]||item.name?.pt||item.name;const desc=document.createElement('p');desc.textContent=item.description?.[state.lang]||item.description?.pt||item.description||'';const price=document.createElement('div');price.className='price';price.textContent=item.price||'';card.append(image,h,desc,price);root.append(card);});
}
function renderTables(){
 const root=$('#table-list');root.innerHTML='';
 const tables=(state.config.tables||[]).filter(x=>x.active!==false).sort((a,b)=>a.order-b.order);
 tables.forEach((table,i)=>{const label=document.createElement('label');label.className='table-option';const input=document.createElement('input');input.type='radio';input.name='table';input.value=table.id;input.required=true;if(i===0)input.checked=true;const strong=document.createElement('strong');strong.textContent=table.id;const small=document.createElement('small');small.textContent=`${table.seats} ${t('seats')}${table.demo?' · '+t('demo'):''}`;label.append(input,strong,small);root.append(label);});
}
function setupBooking(){
 $('#booking-form').addEventListener('submit',e=>{e.preventDefault();const name=$('#customer-name').value.trim(),people=Number($('#party-size').value),table=document.querySelector('input[name="table"]:checked');
 if(!name||!people||people<1||!table){$('#booking-feedback').textContent=t('required');return;}
 const cfg=state.config.restaurant;const number=(cfg.whatsapp||'').replace(/\D/g,'');
 if(!number||number.includes('PREENCHER')){ $('#booking-feedback').textContent='Configure o número de WhatsApp em config.json antes de utilizar as reservas.';return;}
 const message=`Olá! Gostaria de solicitar uma reserva no ${cfg.name}.\n\nNome: ${name}\nMesa escolhida: ${table.value}\nNúmero de pessoas: ${people}\n\nCompreendo que a reserva só fica confirmada após a resposta do restaurante.`;
 $('#booking-feedback').textContent=t('reservationSuccess');
 window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`,'_blank','noopener');
 });
}
function renderContact(){
 const r=state.config.restaurant;$('#address').textContent=r.address;
 $('#contact-phone').textContent=r.phone&&!r.phone.includes('PREENCHER')?r.phone:'Telefone: preencher em config.json';
 $('#contact-email').textContent=r.email||'';
 $('#maps-link').href=r.mapsUrl;$('#maps-link').textContent=t('openMaps');
}
document.addEventListener('DOMContentLoaded',init);
