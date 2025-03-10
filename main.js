(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-33",headers:{authorization:"af35851f-2e16-413a-b4df-859d725d5779","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function n(e,t,n){var r=n.deleteFunc,o=n.likeFunc,c=n.imageFunc,a=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),i=a.querySelector(".card__image"),u=a.querySelector(".card__title"),l=a.querySelector(".card__delete-button"),s=a.querySelector(".card__like-button"),d=a.querySelector(".card__like-counter"),f=t.likes.some((function(t){return e===t._id}));return i.src=t.link,i.alt=t.name,u.textContent=t.name,e===t.owner._id?l.addEventListener("click",(function(){return r(t,a)})):l.remove(),f&&s.classList.add("card__like-button_is-active"),s.addEventListener("click",(function(){return o(t,s,d)})),i.addEventListener("click",(function(){return c(t)})),d.textContent=t.likes.length,a}function r(e){document.addEventListener("keydown",c),e.classList.add("popup_is-opened")}function o(e){document.removeEventListener("keydown",c),e.classList.remove("popup_is-opened")}function c(e){"Escape"===e.key&&o(document.querySelector(".popup_is-opened"))}function a(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function i(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function u(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.setCustomValidity(""),a(e,o,t),i(n,r,t)}))}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var s=document.querySelector(".places__list"),d=document.querySelectorAll(".popup"),f=document.querySelector(".profile__edit-button"),p=document.querySelector(".popup_type_edit"),m=document.querySelector(".profile__add-button"),_=document.querySelector(".popup_type_new-card"),v=document.querySelector(".popup_type_image"),y=document.querySelector(".profile__image-container"),h=document.querySelector(".popup_type_edit-avatar"),S=document.querySelector(".profile__title"),b=document.querySelector(".profile__description"),C=document.querySelector(".profile__image"),q=document.forms["edit-profile"],k=q.elements.name,L=q.elements.description,E=q.querySelector(".popup__button"),g=document.forms["new-place"],x=g.elements["place-name"],A=g.elements.link,U=g.querySelector(".popup__button"),w=document.forms["edit-avatar"],T=w.elements["avatar-link"],j=w.querySelector(".popup__button"),O=document.querySelector(".popup__image"),B=document.querySelector(".popup__caption"),D=document.querySelector(".popup_type_confirm-delete"),F=document.forms["confirm-delete"],P=F.querySelector(".popup__button"),M={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},N=void 0,I=void 0,J=void 0;Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];S.textContent=o.name,b.textContent=o.about,C.src=o.avatar,N=o._id,c.forEach((function(e){return H(N,e)}))})).catch((function(e){console.error(e)}));var V={deleteFunc:function(e,t){r(D),I=e,J=t},likeFunc:function(n,r,o){var c;r.classList.contains("card__like-button_is-active")?function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n._id),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))}(n).then((function(e){r.classList.remove("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){console.error(e)})):(c=n,fetch("".concat(e.baseUrl,"/cards/likes/").concat(c._id),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))).then((function(e){r.classList.add("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){console.error(e)}))},imageFunc:function(e){var t,n,o;t={name:e.name,link:e.link},n=t.name,o=t.link,O.src=o,O.alt=n,B.textContent=n,r(v)}},H=function(e,t){return s.append(n(e,t,V))};d.forEach((function(e){e.classList.add("popup_is-animated"),e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_is-opened")&&o(e),t.target.classList.contains("popup__close")&&o(e)}))})),f.addEventListener("click",(function(){k.value=S.textContent,L.value=b.textContent,u(q,M),r(p)})),m.addEventListener("click",(function(){return r(_)})),y.addEventListener("click",(function(){w.reset(),u(w,M),r(h)})),q.addEventListener("submit",(function(n){var r,c;n.preventDefault(),E.textContent="Сохранение...",(r=k.value,c=L.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:c})}).then((function(e){return t(e)}))).then((function(e){S.textContent=e.name,b.textContent=e.about,o(p)})).catch((function(e){console.error(e)})).finally((function(){E.textContent="Сохранить"}))})),g.addEventListener("submit",(function(r){var c,a;r.preventDefault(),U.textContent="Сохранение...",(c=x.value,a=A.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:c,link:a})}).then((function(e){return t(e)}))).then((function(e){!function(e,t){s.prepend(n(e,t,V))}(N,e),g.reset(),u(g,M),o(_)})).catch((function(e){console.error(e)})).finally((function(){U.textContent="Сохранить"}))})),w.addEventListener("submit",(function(n){var r;n.preventDefault(),j.textContent="Сохранение...",(r=T.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then((function(e){return t(e)}))).then((function(e){C.src=e.avatar,o(h)})).catch((function(e){console.error(e)})).finally((function(){j.textContent="Сохранить"}))})),F.addEventListener("submit",(function(n){var r;n.preventDefault(),P.textContent="Удаление...",(r=I,fetch("".concat(e.baseUrl,"/cards/").concat(r._id),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(){J.remove(),o(D)})).catch((function(e){console.error(e)})).finally((function(){P.textContent="Да"}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);i(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?a(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),i(n,r,t)}))}))}(t,e)}))}(M)})();