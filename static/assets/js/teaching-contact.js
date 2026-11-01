(() => {
 const form=document.querySelector('[data-teaching-request]');
 if(!form)return;
 const alert=document.querySelector('[data-contact-alert]'),success=document.querySelector('[data-contact-success]');
 const submit=form.querySelector('[type=submit]'),label=submit.textContent;
 let sending=false;
 function error(message,fields=[]){
  alert.textContent=message;alert.hidden=false;
  fields.forEach(name=>{const input=form.elements.namedItem(name);if(input instanceof HTMLElement){input.setAttribute('aria-invalid','true')}});
  const first=form.querySelector('[aria-invalid=true]');if(first)first.focus();else{alert.tabIndex=-1;alert.focus()}
 }
 form.addEventListener('input',event=>{event.target.removeAttribute('aria-invalid')});
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(sending)return;
  if(!form.reportValidity())return;
  alert.hidden=true;form.querySelectorAll('[aria-invalid]').forEach(input=>input.removeAttribute('aria-invalid'));
  const body=Object.fromEntries(new FormData(form));body.language=form.dataset.language;
  body.turnstile=body['cf-turnstile-response']||'';delete body['cf-turnstile-response'];
  sending=true;submit.disabled=true;submit.textContent=form.dataset.sending;
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
  try{
   const response=await fetch(form.action,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:controller.signal});
   const result=await response.json().catch(()=>({}));
   if(response.ok&&typeof result.id==='string'){form.hidden=true;success.hidden=false;success.focus()}
   else if(result.error==='validation')error(form.dataset.validation,Array.isArray(result.fields)?result.fields:[]);
   else if(result.error==='turnstile')error(form.dataset.verification);
   else error(form.dataset.failure);
  }catch{error(form.dataset.failure)}
  finally{
   clearTimeout(timeout);sending=false;submit.disabled=false;submit.textContent=label;
   if(window.turnstile)window.turnstile.reset();
  }
 });
})();
