"use strict";(self.webpackChunktest_web=self.webpackChunktest_web||[]).push([[5524],{6113:(e,s,a)=>{a.d(s,{Z:()=>m});var r=a(72791),t=a(75017),n=a(38254),l=a(13811),i=a(20409),o=a(3746),c=a(20165),u=a(28182),d=a(80184);const m=function(e){const{error:s,...a}=e,[m,p]=r.useState(!1),h=r.useCallback((()=>p((e=>!e))),[]);return(0,d.jsx)(t.Z,{type:m?"text":"password",InputProps:{endAdornment:(0,d.jsx)(n.Z,{position:"end",children:(0,d.jsx)(l.Z,{"aria-label":"toggle password visibility",onClick:h,disabled:e.disabled,children:(0,d.jsx)(i.Z,{className:(0,u.Z)(s?"text-danger":"text-primary"),children:m?(0,d.jsx)(c.Z,{}):(0,d.jsx)(o.Z,{})})})})},error:s,...a})}},85524:(e,s,a)=>{a.r(s),a.d(s,{default:()=>q});var r=a(72791),t=a(43973);const n="/Auth",l=t.R.injectEndpoints({endpoints:e=>({signup:e.mutation({query:e=>({url:"".concat(n,"/signup"),method:"POST",...e})}),login:e.mutation({query:e=>({url:"".concat(n,"/Sign-In"),method:"POST",...e})}),stockDelivery:e.mutation({query:e=>({url:"".concat(n,"/Sign-In"),method:"POST",...e})}),getCompanyStatistics:e.query({query:e=>{const{userType:s}=e;return{url:"".concat(n,"/super-admin/adminStatistics"),method:"GET"}}}),getCategories:e.query({query:e=>{const{userType:s}=e;return{url:"".concat(n,"/category"),method:"GET"}}}),getAllBikes:e.query({query:e=>{const{pageNo:s}=e;return console.log(s),{url:"".concat(n,"/company/bikes"),method:"GET",params:{pageNo:s}}}}),getAll:e.query({query:e=>{const{userType:s,pageNo:a}=e;return{url:"".concat(n,"/company/getalluser"),method:"GET",params:{userType:s,pageNo:a}}}}),getAllVerified:e.query({query:e=>{const{userType:s,verified:a,pageNo:r}=e;return{url:"".concat(n,"/company/getBothVerifiedUnverifiedUsers"),method:"GET",params:{userType:s,verified:a}}}}),getAllCompanyRiders:e.query({query:e=>{const{userType:s}=e;return{url:"".concat(n,"/company/getalluser"),method:"GET",params:{userType:s}}}}),getAllCompanyCustomers:e.query({query:e=>{const{userType:s}=e;return{url:"".concat(n,"/company/getalluser"),method:"GET",params:{userType:s}}}}),getAllTrips:e.query({query:e=>({url:"".concat(n,"/super-admin/getAllTripRequest"),method:"GET"})}),getStats:e.query({query:e=>({url:"".concat(n,"/super-admin/userStatsChart"),method:"GET"})})})});var i=a(55705),o=a(81724),c=a(70393),u=a(6113);function d(e,s){var a,r,t,n,l;return{...e.getFieldProps(s),error:!(null===(a=e.touched)||void 0===a||!a[s])&&!(null===(r=e.errors)||void 0===r||!r[s]),helperText:!(null===(t=e.touched)||void 0===t||!t[s])&&(null===(n=e.errors)||void 0===n?void 0:n[s]),focused:null===(l=e.values)||void 0===l?void 0:l[s]}}a(60676);var m=a(43504),p=(a(88871),a(24360)),h=a(54871),g=a(72900),x=a(88823);a(77328),a(61306);const y=a.p+"static/media/homePageBackground.eb0c877186b303e3d5df7de3ef15661d.svg";var A=a(67660),v=(a(84861),a(92699),a(4565)),f=a(75017),j=a(17205),b=a(16871),w=a(80184);const q=function(e){const[s,a]=r.useState(!1),t=(0,b.s0)(),{enqueueSnackbar:n}=(0,c.Ds)(),[q,N]=l.useLoginMutation(),T=(0,i.TA)({initialValues:{username:"",password:""},validationSchema:o.Ry({username:o.Z_().trim().required(),password:o.Z_().trim().required()}),onSubmit:async e=>{console.log(e),localStorage.setItem("il",!0);try{a(!0);const s=await q({data:e}).unwrap();a(!1),s.data&&n("Logged in successful",{variant:"success"}),t("/dashboard")}catch(r){var s;a(!1),n((null===r||void 0===r||null===(s=r.data)||void 0===s?void 0:s.message)||"Something went wrong","Failed to login",{variant:"error"})}}});return(0,w.jsx)("div",{className:" w-full",children:(0,w.jsxs)("div",{className:"flex justify-between",children:[(0,w.jsx)("div",{className:"pt-4 w-[43%] px-16",children:(0,w.jsxs)("div",{className:"flex flex-col w-full h-full",children:[(0,w.jsx)(p.Z,{}),(0,w.jsxs)("div",{className:"w-full h-full",children:[(0,w.jsx)("div",{className:"my-4",children:(0,w.jsx)(v.Z,{variant:"h5",className:"font-bold",children:"Sign In"})}),(0,w.jsxs)("form",{onSubmit:T.handleSubmit,children:[(0,w.jsx)(v.Z,{variant:"h6",className:"mb-2",children:"Username"}),(0,w.jsx)(f.Z,{size:"medium",className:"w-full",placeholder:"Enter your username",name:"username",...d(T,"username")}),(0,w.jsx)(v.Z,{variant:"h6",className:"mt-10 mb-2",children:"Password"}),(0,w.jsx)(u.Z,{className:"w-full ",placeholder:"Enter your Password",name:"password",...d(T,"password")}),(0,w.jsxs)("div",{className:"flex items-center justify-between mt-2",children:[(0,w.jsx)(h.Z,{children:(0,w.jsx)(g.Z,{className:"",control:(0,w.jsx)(x.Z,{defaultChecked:!0}),label:"Keep me logged in"})}),(0,w.jsx)(m.rU,{className:"text-primary-main underline-offset-1",to:"/",children:"Forgot Password"})]}),(0,w.jsx)("div",{className:"text-white m-b-30 mt-5  ",children:(0,w.jsxs)(j.Z,{className:"p-3 w-full flex justify-center gap-9 items-center text-base",type:"submit",children:[s&&(0,w.jsx)("div",{class:"flex items-center justify-center",children:(0,w.jsx)("div",{class:"border-t-4 border-white border-solid rounded-full animate-spin h-4 w-4"})}),"Sign In"]})})]})]})]})}),(0,w.jsxs)("div",{className:"relative bg-no-repeat bg-center bg-cover min-h-screen opacity-[83%] flex flex-col items-stretch bg-primary-main text-white p-10 justify-center w-3/5",style:{position:"relative",backgroundImage:"url('".concat(y,"')")},children:[(0,w.jsx)("div",{class:"absolute inset-0 bg-black bg-opacity-40"}),(0,w.jsxs)("div",{className:"z-10 mx-auto flex flex-col gap-4",children:[(0,w.jsx)(v.Z,{className:"text-3xl font-bold",children:"Welcome to"}),(0,w.jsxs)("div",{className:"flex gap-4 items-center",children:[(0,w.jsx)("img",{src:A.Z}),(0,w.jsx)(v.Z,{variant:"",className:"font-bold text-7xl",children:"MANILOS"})]}),(0,w.jsx)(v.Z,{className:"text-2xl ",children:"Smart Warehouse Inventory Management Solution (SWIMS)"})]})]})]})})}},77328:e=>{e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOxSURBVHgB3ZrdUtpAFMfPnigkWGfwCcxVx4/pwBtIrzsdQW1vhSfQPoHpE9Q+gXrVm4o4nV4X3wCn9WOmN/EJZEaE+pE93Q3C8BUJECTJ7wLysWTy55w9u3v2MBgD9/nXCYtPJxnxJCGLAzG9qxEjU3yayKHEkUra+sUVeAwDD7je0+Pq7MwqAaWBsZR4aBwGhBGUgHiRFCpoa5cn4AEjibv+tqBrU2yLI2aHEeSMsCpxQ9u4PIARGEqcFKVO446wUhbGymgiBxZXPVrcAo6Gt5bqh+yflBq0X7oWV7eWsid+kYKJQYa2fv7ZbWtX4ir55YRCVBDNdZgwJN7j7qaam8uZ5X5t+4qr5Rc2iZTdl3XDfrhz02fFSWFAyj74kv4CHcXVXVGMPT5Gjo21m9u3Ti6KvS7K4FHvY/6GGCTV2dgXp/s9xakR/OWH4OEKMdZWv4vhqQdd4mqHSzuBEdaAoVE7XJzvvNwmTrqjaGlAwLAjOeF+5/U2cfaUKqiIyYWI7iutl5riHvJvVsY/VxwzXDFaT5viHrmVhaDTYT1bnN3Xgm61Bi3Ws8VFVbYKYUFYTy6e5aEtDi3MQoiIzmqb8hulS8qRHsKESHXIL4xFMQGh40kcUf0gTMhBnX4uzmPoXPKJ6h1LIuN+WoR6B+OkI2egQwhhjMXRX+kDT9ERQky4xRFA3xRZQDFlnwulOJHfLCMj8nWGa1jE1pmJImaaEELo8eEKHy06hZAh48irj39L+DAd8X1+cnCoKD9xLlMqi5lmEUKEmJ3YBquPc1RXGhbUKC/Kb1vcP4x8hbBAUGTv6psjtrgwuSZH2m0cN6dfU4AGBB9zZu38uHHSFDe99vsk8NZjYLSetk+cmZWDgEIg61fO2qoe2sRpmUtTbqpDANFU2u681rXkkdUCzOc7qt2Q0YiQrfRcz5FiZQK0FNp3Kt/oKU6651RkkvUm7pAepuLtJ6f7jivxyPuzUxF9suBfzKjG0yzjXI/ybJrBjj4+FGhbTOWpXv2srR244P7HcsK6BzkZ1WHCELCChpXccxZr4Lr2q3Yk9vBI2RNPT8GEIOLbsY0L1/Pggav2ZLWD+Pe2XzLfKd0Qo5C148Agv4MhsK3IFVkckIUxIv7EMpBlDGKtVkaqlG2IFC+RZkDeWVLMcUksODWoHLjpW86P8YhafnlTpNPSIgCnhhRqipcpEGfH2oc/RfAAz8S1UjlaSjJL0RXGVziQLjclWu/LnKLMlxJiiSx2FVNuiqNYyIn/719aphORCaEAAAAASUVORK5CYII="},92699:(e,s,a)=>{e.exports=a.p+"static/media/Rectangle 106.c9fc47c89560e724cf39.png"},84861:(e,s,a)=>{e.exports=a.p+"static/media/Rectangle 7.3a39a2242bd68e3f457e.png"},61306:(e,s,a)=>{e.exports=a.p+"static/media/background.d6226b2e65b747407a3a.png"}}]);
//# sourceMappingURL=5524.8fdccb3d.chunk.js.map