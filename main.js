(()=>{"use strict";function e(e){var n=function(n){"Escape"===n.key&&t(e)};document.addEventListener("keydown",n),e._closeByEscape=n,e.classList.add("popup_is-opened")}function t(e){document.removeEventListener("keydown",e._closeByEscape),e.classList.remove("popup_is-opened")}var n=document.querySelector(".places__list"),o=document.querySelectorAll(".popup"),r=document.querySelector(".profile__edit-button"),c=document.querySelector(".popup_type_edit"),a=document.querySelector(".profile__add-button"),s=document.querySelector(".popup_type_new-card"),u=document.querySelector(".popup_type_image"),d=document.querySelector(".profile__title"),i=document.querySelector(".profile__description"),l=document.forms["edit-profile"],p=l.elements.name,m=l.elements.description,_=document.forms["new-place"],f=_.elements["place-name"],v=_.elements.link,y=document.querySelector(".popup__image"),k=document.querySelector(".popup__caption"),g={deleteFunc:function(e){e.remove()},likeFunc:function(e){e.classList.toggle("card__like-button_is-active")},imageFunc:function(t){!function(e){var t=e.currentTarget;y.src=t.src,y.alt=t.alt,k.textContent=t.alt}(t),e(u)}},q=function(e){return n.prepend(function(e,t){var n=t.deleteFunc,o=t.likeFunc,r=t.imageFunc,c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__image"),s=c.querySelector(".card__title"),u=c.querySelector(".card__delete-button"),d=c.querySelector(".card__like-button");return a.src=e.link,a.alt=e.name,s.textContent=e.name,u.addEventListener("click",(function(){return n(c)})),d.addEventListener("click",(function(){return o(d)})),a.addEventListener("click",r),c}(e,g))};[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach(q),o.forEach((function(e){e.classList.add("popup_is-animated"),e.addEventListener("mousedown",(function(n){n.target.classList.contains("popup_is-opened")&&t(e),n.target.classList.contains("popup__close")&&t(e)}))})),r.addEventListener("click",(function(){p.value=d.textContent,m.value=i.textContent,e(c)})),a.addEventListener("click",(function(){return e(s)})),l.addEventListener("submit",(function(e){!function(e,t,n,o,r){e.preventDefault(),o.textContent=t.value,r.textContent=n.value}(e,p,m,d,i),t(c)})),_.addEventListener("submit",(function(e){var n=function(e,t,n){return e.preventDefault(),{name:t.value,link:n.value}}(e,f,v);q(n),t(s),_.reset()}))})();