(this["webpackJsonpthe-phonebook"]=this["webpackJsonpthe-phonebook"]||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(14),l=t.n(u),c=t(4),o=t(2),i=function(e){var n=e.title;return r.a.createElement("h2",null,n)},m=function(e){var n=e.value,t=e.changeHandler,a=e.type;return r.a.createElement("input",{value:n,type:a,onChange:t})},d=function(e){var n=e.title;return r.a.createElement("button",{type:"submit"},n)},s=function(e){var n=e.addPerson,t=e.newName,a=e.handleNameChange,u=e.newPhone,l=e.handlePhoneChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"Name:  ",r.a.createElement(m,{value:t,changeHandler:a,type:"text"}),r.a.createElement("br",null),"Phone: ",r.a.createElement(m,{value:u,changeHandler:l,type:"number"})),r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement(d,{title:"Add a record"})))},f=function(e){var n=e.name,t=e.number,a=e.deleteHandler;return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,n," ",t),r.a.createElement("button",{onClick:a},"delete number"))},h=function(e){var n=e.persons,t=e.deleteHandler;return n.map((function(e,n){return r.a.createElement(f,{key:n,name:e.name,number:e.phone,deleteHandler:function(){return t(e.id)}})}))},p=function(e){var n=e.filterChange,t=e.personFilter;return r.a.createElement("div",null,r.a.createElement(i,{title:"Mauri's personal Phone book:"}),r.a.createElement("p",null,"Filter names shown with: "),r.a.createElement(m,{value:t,type:"text",changeHandler:n}))},b=t(3),E=t.n(b),v="/api/persons",g=function(){return E.a.get(v).then((function(e){return e.data}))},j=function(e){return E.a.post(v,e).then((function(e){return e.data}))},O=function(e,n){return E.a.put("".concat(v,"/").concat(n),e).then((function(e){return e.data}))},w=function(e){return E.a.delete("".concat(v,"/").concat(e)).catch((function(){return alert("Couldn't delete requested user.")}))},y=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"notification"},n)},C=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],u=n[1],l=Object(a.useState)(""),m=Object(o.a)(l,2),d=m[0],f=m[1],b=Object(a.useState)(""),E=Object(o.a)(b,2),v=E[0],C=E[1],N=Object(a.useState)(""),P=Object(o.a)(N,2),k=P[0],H=P[1],S=Object(a.useState)(null),F=Object(o.a)(S,2),U=F[0],x=F[1],T=Object(a.useState)(null),A=Object(o.a)(T,2),J=A[0],q=A[1],B=Object(a.useState)(null),D=Object(o.a)(B,2),I=D[0],M=D[1];Object(a.useEffect)((function(){g().then((function(e){u(e)}))}),[]);var z=k?t.filter((function(e){return-1!==e.name.toUpperCase().search(k.toUpperCase())})):t;return r.a.createElement("div",null,r.a.createElement(p,{filterChange:function(e){return H(e.target.value)},value:k}),r.a.createElement(i,{title:"Add a new: "}),r.a.createElement(y,{message:J}),r.a.createElement(y,{message:I}),r.a.createElement(s,{addPerson:function(e){e.preventDefault();var n,a={name:d,phone:v};if(n=a,void 0===t.find((function(e){return e.name.toUpperCase()===n.name.toUpperCase()}))&&function(e){return void 0===t.find((function(n){return e.phone===n.phone}))}(a))j(a).then((function(e){u(t.concat(e)),q("Number successfully added."),setTimeout((function(){q(null)}),3e3)}));else if(window.confirm("".concat(a.name," is already added on the phone book, replace the old number with the new one?"))){var r=t.find((function(e){return a.name===e.name||e.phone===a.phone})),l=Object(c.a)(Object(c.a)({},r),{},{name:a.name,phone:a.phone});O(l,r.id).then((function(e){u(t.map((function(n){return n.id!==e.id?n:e}))),M("Number of ".concat(e.name," successfully updated.")),setTimeout((function(){M(null)}),3e3)})).catch((function(e){alert("Error, number was already deleted."),u(t.filter((function(e){return e.id!==l.id})))}))}else f(""),C("")},newName:d,handleNameChange:function(e){return f(e.target.value)},newPhone:v,handlePhoneChange:function(e){return C(e.target.value)}}),r.a.createElement(i,{title:"Numbers: "}),r.a.createElement(y,{message:U}),r.a.createElement(h,{persons:z,deleteHandler:function(e){w(e).then((function(n){204===n.status&&(u(t.filter((function(n){return n.id!==e}))),x("Person successfully deleted."),setTimeout((function(){x(null)}),3e3))})).catch((function(n){alert("Error, number was already deleted."),u(t.filter((function(n){return n.id!==e})))}))}}))},N=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(C,null))};t(37);l.a.render(r.a.createElement(N,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.80d8f2b1.chunk.js.map