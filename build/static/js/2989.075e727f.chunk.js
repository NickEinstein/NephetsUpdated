"use strict";(self.webpackChunktest_web=self.webpackChunktest_web||[]).push([[2989],{22989:(e,t,o)=>{o.r(t),o.d(t,{default:()=>Z});var n=o(72791),a=o(17205),c=o(21680),s=o(19773),l=o(24390),r=o(69963),i=o(9827),d=o(60807),u=o(56650),m=o(88823),h=o(4565),x=o(48928),p=o(80184);const Z=()=>{const[e,t]=n.useState({field1:"",field2:"",field3:"",field4:"",field5:"",field6:"",selectField:""}),o=[{id:1,column1:(0,p.jsx)(m.Z,{}),column2:"Value 2",column3:"Value 3",column4:"Value 4",column5:"Value 5",column6:"Value 5",column7:"Value 5",column8:(0,p.jsx)(a.Z,{className:"bg-[#2BDF27]",children:"Releases"})},{id:2,column1:(0,p.jsx)(m.Z,{}),column2:"Value 7",column3:"Value 8",column4:"Value 9",column5:"Value 10",column6:"Value 5",column7:"Value 5",column8:(0,p.jsx)(a.Z,{className:"bg-[#2BDF27]",children:"Releases"})}];return(0,p.jsxs)("div",{children:[(0,p.jsx)(h.Z,{className:"text-center font-bold my-5 ",variant:"h4",children:"User Management"}),(0,p.jsx)("div",{className:"flex flex-col gap-6 items-start",children:(0,p.jsxs)(x.Z,{className:"px-8 py-4 w-full bg-black rounded-2xl flex flex-col gap-6 items-start text-white",children:[(0,p.jsxs)("div",{className:"flex items-center",children:[(0,p.jsx)(a.Z,{children:"Excel"}),(0,p.jsx)(a.Z,{className:"ml-4",children:"PDF"})]}),(0,p.jsx)(r.Z,{component:u.Z,children:(0,p.jsxs)(c.Z,{children:[(0,p.jsx)(i.Z,{children:(0,p.jsxs)(d.Z,{children:[(0,p.jsx)(l.Z,{className:"font-bold text-base",children:"#"}),(0,p.jsx)(l.Z,{className:"font-bold text-base",children:"Code"}),(0,p.jsx)(l.Z,{className:"font-bold text-base",children:"Name"}),(0,p.jsx)(l.Z,{className:"font-bold text-base",children:"Username by"}),(0,p.jsx)(l.Z,{className:"font-bold text-base",children:"Email"}),(0,p.jsx)(l.Z,{className:"font-bold text-base",children:"Mobile"}),(0,p.jsx)(l.Z,{className:"font-bold text-base",children:"Location"}),(0,p.jsx)(l.Z,{className:"font-bold text-base",children:"Roles"}),(0,p.jsx)(l.Z,{className:"font-bold text-base",children:"Status"}),(0,p.jsx)(l.Z,{})]})}),(0,p.jsx)(s.Z,{children:o.map((e=>(0,p.jsx)(d.Z,{},e.id)))})]})}),(0,p.jsxs)("div",{className:"flex items-center mt-12 self-end",children:[(0,p.jsx)(a.Z,{children:"First"}),(0,p.jsx)(a.Z,{children:"Prev"}),(0,p.jsx)(a.Z,{children:"Next"}),(0,p.jsx)(a.Z,{children:"Last"})]})]})})]})}},48928:(e,t,o)=>{o.d(t,{Z:()=>Z});var n=o(87462),a=o(63366),c=o(72791),s=o(28182),l=o(94419),r=o(76863),i=o(67254),d=o(56650),u=o(21217);function m(e){return(0,u.Z)("MuiCard",e)}(0,o(75878).Z)("MuiCard",["root"]);var h=o(80184);const x=["className","raised"],p=(0,r.ZP)(d.Z,{name:"MuiCard",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({overflow:"hidden"}))),Z=c.forwardRef((function(e,t){const o=(0,i.Z)({props:e,name:"MuiCard"}),{className:c,raised:r=!1}=o,d=(0,a.Z)(o,x),u=(0,n.Z)({},o,{raised:r}),Z=(e=>{const{classes:t}=e;return(0,l.Z)({root:["root"]},m,t)})(u);return(0,h.jsx)(p,(0,n.Z)({className:(0,s.Z)(Z.root,c),elevation:r?8:void 0,ref:t,ownerState:u},d))}))},88823:(e,t,o)=>{o.d(t,{Z:()=>I});var n=o(63366),a=o(87462),c=o(72791),s=o(94419),l=o(12065),r=o(28182),i=o(49853),d=o(76863),u=o(15178),m=o(66155),h=o(92842),x=o(21217),p=o(75878);function Z(e){return(0,x.Z)("PrivateSwitchBase",e)}(0,p.Z)("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);var f=o(80184);const b=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],v=(0,d.ZP)(h.Z)((e=>{let{ownerState:t}=e;return(0,a.Z)({padding:9,borderRadius:"50%"},"start"===t.edge&&{marginLeft:"small"===t.size?-3:-12},"end"===t.edge&&{marginRight:"small"===t.size?-3:-12})})),j=(0,d.ZP)("input")({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),k=c.forwardRef((function(e,t){const{autoFocus:o,checked:c,checkedIcon:l,className:d,defaultChecked:h,disabled:x,disableFocusRipple:p=!1,edge:k=!1,icon:g,id:C,inputProps:N,inputRef:w,name:R,onBlur:y,onChange:F,onFocus:S,readOnly:P,required:V,tabIndex:z,type:B,value:I}=e,M=(0,n.Z)(e,b),[O,E]=(0,u.Z)({controlled:c,default:Boolean(h),name:"SwitchBase",state:"checked"}),H=(0,m.Z)();let L=x;H&&"undefined"===typeof L&&(L=H.disabled);const q="checkbox"===B||"radio"===B,D=(0,a.Z)({},e,{checked:O,disabled:L,disableFocusRipple:p,edge:k}),U=(e=>{const{classes:t,checked:o,disabled:n,edge:a}=e,c={root:["root",o&&"checked",n&&"disabled",a&&"edge".concat((0,i.Z)(a))],input:["input"]};return(0,s.Z)(c,Z,t)})(D);return(0,f.jsxs)(v,(0,a.Z)({component:"span",className:(0,r.Z)(U.root,d),centerRipple:!0,focusRipple:!p,disabled:L,tabIndex:null,role:void 0,onFocus:e=>{S&&S(e),H&&H.onFocus&&H.onFocus(e)},onBlur:e=>{y&&y(e),H&&H.onBlur&&H.onBlur(e)},ownerState:D,ref:t},M,{children:[(0,f.jsx)(j,(0,a.Z)({autoFocus:o,checked:c,defaultChecked:h,className:U.input,disabled:L,id:q&&C,name:R,onChange:e=>{if(e.nativeEvent.defaultPrevented)return;const t=e.target.checked;E(t),F&&F(e,t)},readOnly:P,ref:w,required:V,ownerState:D,tabIndex:z,type:B},"checkbox"===B&&void 0===I?{}:{value:I},N)),O?l:g]}))}));var g=o(40233);const C=(0,g.Z)((0,f.jsx)("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),N=(0,g.Z)((0,f.jsx)("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),w=(0,g.Z)((0,f.jsx)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");var R=o(67254);function y(e){return(0,x.Z)("MuiCheckbox",e)}const F=(0,p.Z)("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]),S=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size"],P=(0,d.ZP)(k,{shouldForwardProp:e=>(0,d.FO)(e)||"classes"===e,name:"MuiCheckbox",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.indeterminate&&t.indeterminate,"default"!==o.color&&t["color".concat((0,i.Z)(o.color))]]}})((e=>{let{theme:t,ownerState:o}=e;return(0,a.Z)({color:(t.vars||t).palette.text.secondary},!o.disableRipple&&{"&:hover":{backgroundColor:t.vars?"rgba(".concat("default"===o.color?t.vars.palette.action.activeChannel:t.vars.palette.primary.mainChannel," / ").concat(t.vars.palette.action.hoverOpacity,")"):(0,l.Fq)("default"===o.color?t.palette.action.active:t.palette[o.color].main,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==o.color&&{["&.".concat(F.checked,", &.").concat(F.indeterminate)]:{color:(t.vars||t).palette[o.color].main},["&.".concat(F.disabled)]:{color:(t.vars||t).palette.action.disabled}})})),V=(0,f.jsx)(N,{}),z=(0,f.jsx)(C,{}),B=(0,f.jsx)(w,{}),I=c.forwardRef((function(e,t){var o,l;const r=(0,R.Z)({props:e,name:"MuiCheckbox"}),{checkedIcon:d=V,color:u="primary",icon:m=z,indeterminate:h=!1,indeterminateIcon:x=B,inputProps:p,size:Z="medium"}=r,b=(0,n.Z)(r,S),v=h?x:m,j=h?x:d,k=(0,a.Z)({},r,{color:u,indeterminate:h,size:Z}),g=(e=>{const{classes:t,indeterminate:o,color:n}=e,c={root:["root",o&&"indeterminate","color".concat((0,i.Z)(n))]},l=(0,s.Z)(c,y,t);return(0,a.Z)({},t,l)})(k);return(0,f.jsx)(P,(0,a.Z)({type:"checkbox",inputProps:(0,a.Z)({"data-indeterminate":h},p),icon:c.cloneElement(v,{fontSize:null!=(o=v.props.fontSize)?o:Z}),checkedIcon:c.cloneElement(j,{fontSize:null!=(l=j.props.fontSize)?l:Z}),ownerState:k,ref:t},b,{classes:g}))}))},51211:(e,t,o)=>{o.d(t,{Z:()=>n});const n=o(72791).createContext()},66155:(e,t,o)=>{o.d(t,{Z:()=>c});var n=o(72791),a=o(51211);function c(){return n.useContext(a.Z)}}}]);
//# sourceMappingURL=2989.075e727f.chunk.js.map