import{u as a,c as r,a as e,o as l}from"./entry.f5e3853e.js";const c={class:"flex"},n={class:"flex flex-col h-screen items-center justify-center gap-40 w-full"},i=e("p",{class:"text-6xl md:text-8xl color-primary flex"},"AcertaNota",-1),f={__name:"index",setup(m){const o=a(),s=()=>{localStorage.setItem("notas",JSON.stringify([])),localStorage.setItem("notasNomes",JSON.stringify([])),localStorage.setItem("nNotas","0"),localStorage.setItem("quantidadeQuestoes","1"),localStorage.setItem("seguirQuestoes","false"),localStorage.setItem("referencia","false"),localStorage.setItem("resultado","0"),localStorage.setItem("progresso","0"),o.push("/configurations")};return(u,t)=>(l(),r("div",c,[e("div",n,[i,e("button",{onClick:t[0]||(t[0]=x=>s()),class:"bg-color-primary color-base md:px-16 px-10 md:py-8 py-5 text-3xl md:text-5xl flex items-center rounded-xl"}," Começar o teste ")])]))}};export{f as default};