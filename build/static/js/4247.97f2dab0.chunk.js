"use strict";(self.webpackChunktest_web=self.webpackChunktest_web||[]).push([[4247],{45297:(e,n,t)=>{t.d(n,{Z:()=>l});t(72791);const l=t.p+"static/media/Dashboard.5f1208c2a3c6b1a30ab84457ca713adf.svg"},32172:(e,n,t)=>{t.d(n,{Z:()=>l});t(72791);const l=t.p+"static/media/Documentation.f11d3356743ebc986832ed6845eee89b.svg"},57678:(e,n,t)=>{t.d(n,{Z:()=>l});t(72791);const l=t.p+"static/media/Inventory.5c6fd2e2d22f2056bbaad3f669ea645d.svg"},60735:(e,n,t)=>{t.d(n,{Z:()=>l});t(72791);const l=t.p+"static/media/Shipment.343599bb377d822d86c19f64e548a9cb.svg"},73582:(e,n,t)=>{t.d(n,{Z:()=>l});t(72791);const l=t.p+"static/media/SystemAdmin.04d8c814511ad6806f91e28675202e26.svg"},16859:(e,n,t)=>{t.d(n,{Z:()=>l});t(72791);const l=t.p+"static/media/Warehouse.4b8c9c25a9e68a56da6a33318fedecc1.svg"},24247:(e,n,t)=>{t.r(n),t.d(n,{default:()=>Y});var l=t(72791),a=t(52797);const i=t(73175),o={"2xl":"(min-width: ".concat(i.screens["2xl"],")"),lg:"(min-width: ".concat(i.screens.lg,")"),md:"(min-width: ".concat(i.screens.md,")"),sm:"(min-width: ".concat(i.screens.sm,")"),xl:"(min-width: ".concat(i.screens.xl,")")};var r=t(16871),s=t(24033),c=t(95797),m=t(88871),d=t(96015);t.p;t.p;t.p;t.p;t.p;t.p;t.p;t.p;t.p;t.p;t.p;t.p;t.p;t.p;t(24360);var h=t(95048),g=t(89239);const p=function(e){const n=(0,h.I0)();return{logout:(0,l.useCallback)((function(){return n((0,g.C)())}),[n])}};var u=t(80184);var E=t(60676),A=(t(54164),t(10215)),S=t(56650),T=t(4565),N=t(17205),k=t(30168),R=t(50225),C=t(95452),I=t(24020);const O=l.forwardRef(((e,n)=>{const{parentMenuOpen:t,label:a,rightIcon:i=(0,u.jsx)(A.Z,{style:{fontSize:16}}),keepOpen:o,children:r,customTheme:s,className:c,tabIndex:m,ContainerProps:d={},rightAnchored:h,...g}=e,{ref:p,...E}=d,S=l.useRef(null);l.useImperativeHandle(n,(()=>S.current));const T=l.useRef(null);l.useImperativeHandle(p,(()=>T.current));const N=l.useRef(null),[k,R]=l.useState(!1),O=()=>{var e,n;const t=null===(e=T.current)||void 0===e||null===(n=e.ownerDocument)||void 0===n?void 0:n.activeElement;for(const i of null!==(l=null===(a=N.current)||void 0===a?void 0:a.children)&&void 0!==l?l:[]){var l,a;if(i===t)return!0}return!1},v=k&&t;let _;return e.disabled||(_=void 0!==m?m:-1),(0,u.jsxs)("div",{...E,ref:T,onFocus:e=>{e.target===T.current&&R(!0),null!==E&&void 0!==E&&E.onFocus&&E.onFocus(e)},tabIndex:_,onMouseEnter:e=>{R(!0),null!==E&&void 0!==E&&E.onMouseEnter&&E.onMouseEnter(e)},onMouseLeave:e=>{R(!1),null!==E&&void 0!==E&&E.onMouseLeave&&E.onMouseLeave(e)},onKeyDown:e=>{var n,t;if("Escape"===e.key)return;O()&&e.stopPropagation();const l=null===(n=T.current)||void 0===n||null===(t=n.ownerDocument)||void 0===t?void 0:t.activeElement;var a;"ArrowLeft"===e.key&&O()&&(null===(a=T.current)||void 0===a||a.focus());if("ArrowRight"===e.key&&e.target===T.current&&e.target===l){var i;const e=null===(i=N.current)||void 0===i?void 0:i.children[0];null===e||void 0===e||e.focus()}},children:[(0,u.jsxs)(I.Z,{...g,"data-open":!!v||void 0,className:c,ref:S,keepOpen:o,children:[a,(0,u.jsx)("div",{style:{flexGrow:1}}),i]}),(0,u.jsx)(C.Z,{hideBackdrop:!0,style:{pointerEvents:"none"},anchorEl:S.current,anchorOrigin:{vertical:"top",horizontal:h?"left":"right"},transformOrigin:{vertical:"top",horizontal:h?"right":"left"},css:s,open:!!v,autoFocus:!1,disableAutoFocus:!0,disableEnforceFocus:!0,onClose:()=>{R(!1)},children:(0,u.jsx)("div",{ref:N,style:{pointerEvents:"auto"},children:r})})]})}));var v,_;const b=l.forwardRef(((e,n)=>{let{trigger:t,menu:a,keepOpen:i,isOpen:o,onOpen:r,minWidth:s}=e;const[c,m]=l.useState(null),d=o||c;let h=l.useRef(null);n&&(h=n);const g=e=>{e.stopPropagation(),h.current&&h.current.contains(e.target)||p()},p=()=>{r?r(null):m(null)},E=(e,n)=>{const{keepOpen:t,...a}=e.props;let o={};return a.menu&&(o={parentMenuOpen:d}),l.createElement(e.type,{...a,key:n,...o,onClick:n=>{n.stopPropagation(),i||t||g(n),e.props.onClick&&e.props.onClick(n)},children:a.menu?l.Children.map(a.menu,E):a.children})};return(0,u.jsxs)(u.Fragment,{children:[l.cloneElement(t,{onClick:d?p:e=>{e.stopPropagation(),a.length&&(r?r(e.currentTarget):m(e.currentTarget))},ref:h}),(0,u.jsx)(C.Z,{PaperProps:{sx:{minWidth:null!==s&&void 0!==s?s:0}},anchorEl:d,open:!!d,onClose:g,children:l.Children.map(a,E)})]})})),y=(0,R.Z)(I.Z)(v||(v=(0,k.Z)(["\n  display: flex;\n  justify-content: space-between !important;\n\n  & > svg {\n    margin-left: 32px;\n  }\n"]))),x=(0,R.Z)(O)(_||(_=(0,k.Z)(["\n  display: flex;\n  justify-content: space-between !important;\n\n  & > svg {\n    margin-left: 32px;\n  }\n"])));var P=t(67660);const L=t.p+"static/media/arrow-turn-backward-sharp.86f2250bae22def0372218633c5cecf6.svg";const f=t.p+"static/media/user-circle.b618137cfc246edea9c07330255704df.svg";var M=t(43504);t(63190);const j=e=>{let{image:n,text1:t,text2:l}=e;const a=(0,r.s0)();return(0,u.jsx)("div",{class:"flex",children:(0,u.jsxs)("div",{className:" flex justify-center items-center gap-1  col-span-3",children:[(0,u.jsx)("img",{src:n,alt:"header navigation logo",className:"cursor-pointer w-8",onClick:()=>{a("/")}}),(0,u.jsxs)("div",{className:"flex flex-col text-center cursor-pointer",children:[(0,u.jsx)(T.Z,{className:"text-[10px] text-black",children:t}),(0,u.jsx)(T.Z,{className:"text-[10px] text-black",children:l})]})]})})};var K=t(16859),D=t(57678),G=t(32172),z=t(60735),U=t(73582),B=t(45297);const w=e=>{const n=(0,E.Z)();console.log(n);const{logout:t}=p(),l=(0,r.s0)();let a=[{name:(0,u.jsx)(j,{image:K.Z,text1:"Warehouse",text2:"Management"}),children:[{name:"Stock Management",link:"",children:[{name:"Stock Intake",link:m.g.STOCK_INTAKE},{name:"BDU Intake",link:m.g.BDU_INTAKE},{name:"Stock Deliveries",link:m.g.STOCK_DELIVERIES},{name:"Stock Returns",link:m.g.STOCK_RETURN},{name:"Returning Intake",link:m.g.STOCK_INTAKE_RETURN}]},{name:"Stock Release",link:"",children:[{name:"Material Issuance",link:m.g.STOCK_OUTBOUNDS},{name:"Material Acceptance",link:m.g.MATERIAL_ACCEPTANCE},{name:"Issuance Cancelation",link:m.g.ISSUANCE__CANCELLATION}]},{name:"Alarm",link:"",children:[{name:"Switch Alarm Off",link:""}]},{name:"Requisition",link:m.g.STOCK_REQUISITION}]},{name:(0,u.jsx)(j,{image:D.Z,text1:"Inventory",text2:"Management"}),children:[{name:"Item Management",link:"",children:[{name:"Item Creation",link:m.g.ITEM_CREATION},{name:"Category Creation",link:""},{name:"Item Parameter Management",link:""},{name:"Upload Items",link:""}]},{name:"Stock Taking",link:"",children:[{name:"Spot Inventory Management",link:""},{name:"Cycle Inventory Count",link:""}]},{name:"Inventories",link:"",children:[{name:"Balance Adjustment",link:""},{name:"Inventory Transfer (Within Store Location)",link:""},{name:"Inventory Transfer (Between Store Location)",link:""}]}]},{name:(0,u.jsx)(j,{image:z.Z,text1:"Shipment",text2:"Management"}),children:[{name:"Bills Of Landing",link:"",children:[{name:"B/L Creation",link:""},{name:"Label Printing",link:""}]},{name:"Smart Locks",link:"",children:[{name:"Generate Lock Codes",link:""},{name:"Decode Lock Codes",link:""}]}]},{name:(0,u.jsx)(j,{image:U.Z,text1:"System",text2:"Admin"}),children:[{name:"User & Rights",link:"",children:[{name:"Menu Management",link:""},{name:"Role Management",link:""},{name:"Manage User Groups",link:""},{name:"Pending Profile Updates",link:""},{name:"Resend",link:""}]},{name:"System Settings",link:"",children:[{name:"Link Product to Rack",link:m.g.PRODUCT_RACK},{name:"Rack Management",link:m.g.RACKS}]},{name:"General Admin",link:""}]},{name:(0,u.jsx)(j,{image:B.Z,text1:"Dashboard ",text2:"Reports"}),children:[{name:"Inventory Reports",link:"",children:[{name:"Store Stock Items",link:"#"},{name:"Global Stock Items",link:"#"},{name:"Global Bin Card",link:m.g.GLOBAL_BIN},{name:"Bin Card",link:m.g.BIN_CARD},{name:"Product Statistics",link:"#"},{name:"Stock Balance by SKU",link:m.g.STOCK_BALANCE_SKU},{name:"Stock Balance by Location",link:m.g.STOCK_BALANCE_BY_LOCATION},{name:"Stock Balance by Rack",link:m.g.STOCK_BALANCE_RACK},{name:"Purchase Reports",link:"#"},{name:"Re-Order Level ",link:m.g.PRODUCT_BALANCE},{name:"Status Report",link:"#"},{name:"Minimum Balance Report",link:"#"}]},{name:"Logs",link:"",children:[{name:"Audit Logs",link:m.g.AUDIT_LOGS},{name:"Transaction Logs",link:m.g.TRANSACTION_LOGS},{name:"Receiving Log - Store",link:m.g.RECEIVING_LOG}]},{name:"General Reports",link:"",children:[{name:"Item Release Reports",link:"#"},{name:"Print Items Released",link:"#"},{name:"Search Requests Released",link:"#"},{name:"Requisition Report",link:"#"},{name:"Delivery Report",link:m.g.DELIVERY_REPORT},{name:"Shipment Status",link:"#"}]}]},{name:(0,u.jsx)(j,{image:G.Z,text1:"Documentation",text2:"Support"}),children:[{name:"Support Module",link:"",children:[{name:"Raise Support Ticket",link:""},{name:"Support Ticket Status",link:""}]},{name:"Documentation",link:"",children:[{name:"",link:""}]}]}];const i=(0,r.s0)();return(0,u.jsxs)(S.Z,{className:" w-full flex justify-between gap-20 items-center  py-4 px-8 mb-2",children:[(0,u.jsxs)("div",{className:" flex justify-between items-center gap-1 ",children:[(0,u.jsx)("div",{onClick:()=>{console.log("Navigating back..."),l(-1)},className:"cursor-pointer w-6 mr-10",children:(0,u.jsx)("img",{oncli:!0,src:L,alt:"Manilos Logo"})}),(0,u.jsx)(M.rU,{to:m.g.DASHBOARD,children:(0,u.jsxs)("div",{className:" flex justify-center items-center gap-1  col-span-2",children:[(0,u.jsx)("img",{src:P.Z,alt:"Manilos Logo",className:"cursor-pointer w-8",onClick:()=>{i("/")}}),(0,u.jsx)(T.Z,{children:"MANILOS"})]})})]}),(0,u.jsx)("div",{className:"w-full ",children:(0,u.jsx)(d.Z,{class:"flex gap-16 ",children:null===a||void 0===a?void 0:a.map((e=>{var n;return null!==e&&void 0!==e&&null!==(n=e.children)&&void 0!==n&&n.length?(0,u.jsx)(b,{trigger:(0,u.jsx)("div",{className:"bg-white",children:null===e||void 0===e?void 0:e.name}),menu:null===e||void 0===e?void 0:e.children.map((e=>{var n;return null!==e&&void 0!==e&&null!==(n=e.children)&&void 0!==n&&n.length?(0,u.jsx)(x,{label:null===e||void 0===e?void 0:e.name,rightIcon:(0,u.jsx)(A.Z,{}),menu:(null===e||void 0===e?void 0:e.children)&&[...null===e||void 0===e?void 0:e.children.map((e=>(0,u.jsx)(y,{onClick:()=>{console.log(e.link),i(e.link)},children:null===e||void 0===e?void 0:e.name})))]}):(0,u.jsx)(y,{onClick:()=>{i(e.link)},children:null===e||void 0===e?void 0:e.name})}))}):(0,u.jsx)(b,{trigger:(0,u.jsx)(N.Z,{children:"View"}),menu:[(0,u.jsx)(y,{onClick:()=>{console.log("clicked")},children:"Show preview"}),(0,u.jsx)(y,{onClick:()=>{console.log("clicked")},children:"Show status bar"})]})}))})}),(0,u.jsx)("div",{className:"cursor-pointer  mr-14",children:(0,u.jsx)(b,{trigger:(0,u.jsx)("img",{className:"w-11",src:f,alt:"profile Logo"}),menu:[(0,u.jsxs)(y,{onClick:()=>{console.log("clicked")},children:[(0,u.jsx)(T.Z,{className:"font-bold",children:null===n||void 0===n?void 0:n.fullname}),(0,u.jsx)(T.Z,{className:"font-bold",children:null===n||void 0===n?void 0:n.role})]}),(0,u.jsx)(y,{onClick:()=>{console.log("clicked")},children:"View Profile"}),(0,u.jsx)(y,{onClick:()=>{console.log("clicked")},children:"Update Password"}),(0,u.jsx)(y,{onClick:()=>{t()},children:"Sign Out"})]})})]})};var Z=t(43973);const V="/Locations",H=Z.R.injectEndpoints({endpoints:e=>({returnStock:e.mutation({query:e=>({url:"".concat(V),method:"POST",...e})}),returnIntake:e.mutation({query:e=>({url:"".concat(V,"/Return-Intake"),method:"POST",...e})}),getLocations:e.query({query:e=>{const{userType:n}=e;return{url:"".concat(V,"/"),method:"GET"}}})})});const Y=function(e){var n;(0,a.Z)(o.lg),(0,a.Z)(o.md);const t=(0,r.V$)(F),l=H.useGetLocationsQuery({}),i=null===l||void 0===l?void 0:l.data,c=(0,E.Z)();return console.log(i),(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)("div",{className:"flex flex-col ",children:[(0,u.jsx)(w,{}),(0,u.jsx)(d.Z,{className:"p-8",component:"",sx:{flexGrow:1,bgcolor:"background.default"},children:(0,u.jsx)(s.Z,{children:t})}),(0,u.jsxs)("div",{className:"p-1 w-full text-center text-base fixed bottom-0 bg-[#D9D9D9] z-20 font-bold",children:["Manilos - Smart Warehouse Inventory Management System v1 \xa9 2018-",(new Date).getFullYear()," | Ikeja Electricity PLC |",null===i||void 0===i||null===(n=i.find((e=>(null===e||void 0===e?void 0:e.id)==c.locationId)))||void 0===n?void 0:n.description," "]})]})})},F=(0,c.W)([{path:"*",element:(0,u.jsx)(r.Fg,{to:m.g.DASHBOARD,replace:!0})},{path:m.g.DASHBOARD,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(1766),t.e(2426),t.e(4385),t.e(5209),t.e(623),t.e(7008),t.e(4044),t.e(8653),t.e(5202),t.e(6731)]).then(t.bind(t,6731))))},{path:m.g.WAREHOUSE,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(1766),t.e(64),t.e(3475)]).then(t.bind(t,23475))))},{path:m.g.STOCK_MANAGEMENT,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(1766),t.e(64),t.e(8340)]).then(t.bind(t,98340))))},{path:m.g.STOCK_RELEASE,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(1766),t.e(64),t.e(2653)]).then(t.bind(t,72653))))},{path:m.g.ALARM,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(1766),t.e(64),t.e(268)]).then(t.bind(t,70268))))},{path:m.g.INVENTORY,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(1766),t.e(5310),t.e(4819)]).then(t.bind(t,24819))))},{path:m.g.ITEMS_MANAGEMENT,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(1766),t.e(6383)]).then(t.bind(t,6383))))},{path:m.g.STOCK_TAKING,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(1766),t.e(5021)]).then(t.bind(t,75021))))},{path:m.g.INVENTORIES,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(1766),t.e(5167)]).then(t.bind(t,75167))))},{path:m.g.SHIPMENT,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(1766),t.e(4256)]).then(t.bind(t,14256))))},{path:m.g.SYSTEM_ADMIN,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(1766),t.e(7747)]).then(t.bind(t,97747))))},{path:m.g.USER_RIGHTS,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(1766),t.e(5310),t.e(4588)]).then(t.bind(t,54588))))},{path:m.g.SYSTEM_SETTINGS,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(1766),t.e(5310),t.e(3342),t.e(3717)]).then(t.bind(t,23717))))},{path:m.g.GENERAL_ADMIN,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(1766),t.e(3818)]).then(t.bind(t,73818))))},{path:m.g.DASHBOARD_REPORTS,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(1766),t.e(966)]).then(t.bind(t,966))))},{path:m.g.GENERAL_REPORTS,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(1766),t.e(99)]).then(t.bind(t,20099))))},{path:m.g.INVENTORY_REPORTS,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(1766),t.e(2211)]).then(t.bind(t,62211))))},{path:m.g.LOGS,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(1766),t.e(5709)]).then(t.bind(t,65709))))},{path:m.g.DOCUMENTATION_SUPPORT,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(1766),t.e(478)]).then(t.bind(t,60478))))},{path:m.g.STOCK_INTAKE,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(2426),t.e(4385),t.e(5209),t.e(7008),t.e(5202)]).then(t.bind(t,65202))))},{path:m.g.BDU_INTAKE,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(2426),t.e(4385),t.e(5209),t.e(7008),t.e(9129)]).then(t.bind(t,9129))))},{path:m.g.STOCK_INTAKE_RETURN,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(2426),t.e(4385),t.e(5209),t.e(7008),t.e(8706)]).then(t.bind(t,18706))))},{path:m.g.STOCK_DELIVERIES,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(4385),t.e(5209),t.e(7008),t.e(4044),t.e(9711)]).then(t.bind(t,19711))))},{path:m.g.STOCK_TAGGING,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(744)]).then(t.bind(t,80744))))},{path:m.g.PENDING_STOCK,element:(0,l.lazy)((()=>Promise.all([t.e(6296),t.e(7781)]).then(t.bind(t,47781))))},{path:m.g.STOCK_RETURN,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(4385),t.e(5209),t.e(7008),t.e(2614)]).then(t.bind(t,62614))))},{path:m.g.PARTIAL_ISSUANCE,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(8814)]).then(t.bind(t,48814))))},{path:m.g.ISSUANCE__CANCELLATION,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(3465)]).then(t.bind(t,53465))))},{path:m.g.ILLEGAL_MOVEMENT_CHART,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(42)]).then(t.bind(t,20042))))},{path:m.g.ITEM_CREATION,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(4385),t.e(5209),t.e(623),t.e(7008),t.e(6716)]).then(t.bind(t,26716))))},{path:m.g.PARAMETER_MANAGEMENT,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(4385),t.e(5209),t.e(7008),t.e(2614)]).then(t.bind(t,62614))))},{path:m.g.SPOT_INVENTORY_COUNT,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(4385),t.e(5209),t.e(7008),t.e(2614)]).then(t.bind(t,62614))))},{path:m.g.RACKS,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(5209),t.e(94)]).then(t.bind(t,90094))))},{path:m.g.INVENTORY_TRANSFERS,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(4385),t.e(5209),t.e(7008),t.e(2614)]).then(t.bind(t,62614))))},{path:m.g.USER_CREATION,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(2367)]).then(t.bind(t,42367))))},{path:m.g.USER_MANAGEMENT,element:(0,l.lazy)((()=>Promise.all([t.e(6296),t.e(2989)]).then(t.bind(t,22989))))},{path:m.g.GLOBAL_BIN,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(623),t.e(643),t.e(2832)]).then(t.bind(t,2832))))},{path:m.g.BIN_CARD,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(2426),t.e(623),t.e(643),t.e(2354),t.e(4915)]).then(t.bind(t,95971))))},{path:m.g.STOCK_BALANCE_SKU,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(2426),t.e(623),t.e(5129)]).then(t.bind(t,5129))))},{path:m.g.STOCK_BALANCE_BY_LOCATION,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(2426),t.e(623),t.e(7624)]).then(t.bind(t,7624))))},{path:m.g.PRODUCT_BALANCE,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(2426),t.e(623),t.e(643),t.e(6673)]).then(t.bind(t,86673))))},{path:m.g.AUDIT_LOGS,element:(0,l.lazy)((()=>Promise.all([t.e(6296),t.e(2426),t.e(7097)]).then(t.bind(t,27097))))},{path:m.g.TRANSACTION_LOGS,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(2426),t.e(4385),t.e(623),t.e(2686),t.e(7343)]).then(t.bind(t,87343))))},{path:m.g.STOCK_BALANCE_RACK,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(2426),t.e(623),t.e(643),t.e(6544)]).then(t.bind(t,46544))))},{path:m.g.RECEIVING_LOG,element:(0,l.lazy)((()=>Promise.all([t.e(6296),t.e(2426),t.e(4605)]).then(t.bind(t,24605))))},{path:m.g.RELEASE_LOG,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(6296),t.e(2426),t.e(4189)]).then(t.bind(t,49605))))},{path:m.g.MATERIAL_ISSUANCE,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(4939)]).then(t.bind(t,54939))))},{path:m.g.STOCK_REQUISITION,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(4385),t.e(5209),t.e(7008),t.e(7702)]).then(t.bind(t,47702))))},{path:m.g.MATERIAL_ACCEPTANCE,element:(0,l.lazy)((()=>Promise.all([t.e(6296),t.e(9661)]).then(t.bind(t,69661))))},{path:m.g.PRODUCT_RACK,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(6296),t.e(4385),t.e(5209),t.e(7008),t.e(208)]).then(t.bind(t,208))))},{path:m.g.DELIVERY_REPORT,element:(0,l.lazy)((()=>Promise.all([t.e(6296),t.e(2426),t.e(5440)]).then(t.bind(t,65440))))},{path:m.g.INTAKES_REPORT,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(6296),t.e(2426),t.e(7058)]).then(t.bind(t,7058))))},{path:m.g.LOCATION_MANAGEMENT,element:(0,l.lazy)((()=>Promise.all([t.e(9205),t.e(5017),t.e(1766),t.e(5310),t.e(3342),t.e(6494)]).then(t.bind(t,46494))))}])},88871:(e,n,t)=>{t.d(n,{g:()=>l});const l={HOME:"/",DASHBOARD:"/dashboard",WAREHOUSE:"/warehouse",STOCK_MANAGEMENT:"/warehouse/stock-management",STOCK_RELEASE:"/warehouse/stock-release",ALARM:"/warehouse/alarm",INVENTORY:"/inventory",ITEMS_MANAGEMENT:"/inventory/items-management",STOCK_TAKING:"/inventory/stock-taking",INVENTORIES:"/inventory/inventories",SHIPMENT:"/shipment",SYSTEM_ADMIN:"/system-admin",USER_RIGHTS:"/system-admin/user-rights",SYSTEM_SETTINGS:"/system-admin/system-settings",GENERAL_ADMIN:"/system-admin/general-admin",DASHBOARD_REPORTS:"/dashboard-reports",GENERAL_REPORTS:"/dashboard-reports/general-reports",INVENTORY_REPORTS:"/dashboard-reports/inventory-reports",LOGS:"/dashboard-reports/logs",DOCUMENTATION_SUPPORT:"/documentation",STOCK_INTAKE:"/stock-intake",STOCK_DELIVERIES:"/stock-deliveries",STOCK_TAGGING:"/stock-tagging",PENDING_STOCK:"/pending-stock",STOCK_RETURN:"/stock-return",MATERIAL_ISSUANCE:"/material-issuance",PARTIAL_ISSUANCE:"/partial-issueance",MATERIAL_ACCEPTANCE:"/material-acceptance",ISSUANCE__CANCELLATION:"/issuance-cancellation",ILLEGAL_MOVEMENT_CHART:"/illegal-movement",USER_CREATION:"/user-creation",ITEM_CREATION:"/item-creation",PRODUCT_RACK:"/product-rack",LOCATION_MANAGEMENT:"/system-settings/location",USER_MANAGEMENT:"/user-management",GLOBAL_BIN:"/global-bin",BIN_CARD:"/bin-card",STOCK_BALANCE_SKU:"/stock-balance-SKU",STOCK_BALANCE_BY_LOCATION:"/stock-balance-location",PRODUCT_BALANCE:"/product-balance",AUDIT_LOGS:"/audit-logs",TRANSACTION_LOGS:"/tranaction-logs",STOCK_BALANCE_RACK:"/stock-balance-rack",RECEIVING_LOG:"/receiving-log",RELEASE_LOG:"/release-log",DELIVERY_REPORT:"/delivery-report",INTAKES_REPORT:"/intakes-report",STOCK_OUTBOUNDS:"/material-issuance",STOCK_INTAKE:"/stock-intake",BDU_INTAKE:"/bdu-return",STOCK_INTAKE_RETURN:"/stock-intake-return",STOCK_REQUISITION:"/requisition",RACKS:"/racks",MATERIAL_ACCEPTANCE:"/material-acceptance"}},95797:(e,n,t)=>{t.d(n,{W:()=>a});var l=t(80184);function a(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const{parentPath:t}=n;return e.map(a);function a(e){var n;const i=e.element,o=i.$$typeof===Symbol.for("react.element")?i:(0,l.jsx)(i,{}),r={...e,element:o};return r.path&&(r.path=r.path.replace(new RegExp(t),"")),null!==(n=e.children)&&void 0!==n&&n.length?{...r,children:e.children.map(a)}:r}}}}]);
//# sourceMappingURL=4247.97f2dab0.chunk.js.map