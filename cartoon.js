// Step-by-step story controls for EcoAware's water and air pollution animations.
(function(){
 const stories={
  water:[
   {title:["Step 1: A river gets dirty","चरण 1: नदी गंदी हो जाती है","टप्पा १: नदी घाण होते"],copy:["People throw rubbish into the river. Plastic makes the water unsafe for fish and people.","लोग नदी में कचरा फेंकते हैं। प्लास्टिक से पानी मछलियों और लोगों के लिए असुरक्षित हो जाता है।","लोक नदीत कचरा टाकतात. प्लास्टिकमुळे पाणी मासे आणि माणसांसाठी असुरक्षित होते."]},
   {title:["Step 2: A child takes action","चरण 2: बच्चा कदम उठाता है","टप्पा २: मूल कृती करते"],copy:["The child puts rubbish in a bin and stops litter from reaching the river. Never touch dangerous waste; ask an adult for help.","बच्चा कचरा डिब्बे में डालता है और नदी में कचरा जाने से रोकता है। खतरनाक कचरे को न छुएँ; किसी बड़े से मदद लें।","मूल कचरा पेटीत टाकते आणि नदीत कचरा जाण्यापासून रोखते. धोकादायक कचऱ्याला हात लावू नका; मोठ्यांची मदत घ्या."]},
   {title:["Step 3: Life returns to clean water","चरण 3: साफ पानी में जीवन लौटता है","टप्पा ३: स्वच्छ पाण्यात जीवसृष्टी परतते"],copy:["Less litter means a healthier river. Use a reusable bottle, bin your waste, and keep drains clear.","कम कचरे से नदी स्वस्थ रहती है। दोबारा इस्तेमाल होने वाली बोतल लें, कचरा डिब्बे में डालें और नालियाँ साफ रखें।","कचरा कमी झाल्याने नदी अधिक निरोगी राहते. पुन्हा वापरता येणारी बाटली वापरा, कचरा पेटीत टाका आणि नाले स्वच्छ ठेवा."]}
  ],
  air:[
   {title:["Step 1: Smoke pollutes the air","चरण 1: धुआँ हवा को प्रदूषित करता है","टप्पा १: धूर हवा प्रदूषित करतो"],copy:["Smoke from vehicles and factories makes the air dirty and harder to breathe.","वाहनों और कारखानों का धुआँ हवा को गंदा करता है और साँस लेना मुश्किल बना सकता है।","वाहने आणि कारखान्यांचा धूर हवा घाण करतो आणि श्वास घेणे कठीण करू शकतो."]},
   {title:["Step 2: Choose a cleaner way","चरण 2: स्वच्छ तरीका चुनें","टप्पा २: स्वच्छ पर्याय निवडा"],copy:["For short trips, walk or cycle when safe. Share rides and save electricity to reduce pollution.","छोटी दूरी के लिए सुरक्षित हो तो पैदल चलें या साइकिल चलाएँ। साथ में यात्रा करें और बिजली बचाएँ।","लहान अंतरासाठी सुरक्षित असल्यास पायी चला किंवा सायकल वापरा. एकत्र प्रवास करा आणि वीज वाचवा."]},
   {title:["Step 3: Give nature room to grow","चरण 3: प्रकृति को बढ़ने दें","टप्पा ३: निसर्गाला वाढू द्या"],copy:["Plant and care for trees with adult guidance. Cleaner choices and healthy green spaces help our communities.","बड़ों की मदद से पेड़ लगाएँ और उनकी देखभाल करें। स्वच्छ आदतें और हरियाली हमारे समुदाय के लिए अच्छी हैं।","मोठ्यांच्या मदतीने झाडे लावा आणि त्यांची काळजी घ्या. स्वच्छ सवयी आणि हिरवळ आपल्या समुदायासाठी चांगली आहेत."]}
  ]
 };
 function langIndex(){const v=document.getElementById("languageSelect")?.value||"en";return v==="hi"?1:v==="mr"?2:0}
 document.querySelectorAll(".story-card").forEach(card=>{
  let step=1;const type=card.dataset.story,scene=card.querySelector(".story-scene"),title=card.querySelector(".story-step-title"),copy=card.querySelector(".story-step-copy"),count=card.querySelector(".story-count"),back=card.querySelector(".story-back"),next=card.querySelector(".story-next"),badge=card.querySelector(".story-badge");
  function draw(){const data=stories[type][step-1],li=langIndex();scene.classList.remove("state-1","state-2","state-3");scene.classList.add("state-"+step);title.textContent=data.title[li];copy.textContent=data.copy[li];count.textContent=step+" / 3";badge.textContent=(li===1?"चरण ":li===2?"टप्पा ":"STEP ")+step;back.disabled=step===1;next.disabled=step===3;next.textContent=step===3?(li===1?"फिर से देखें →":li===2?"पुन्हा पाहा →":"Replay story ↻"):(li===1?"अगला चरण →":li===2?"पुढील टप्पा →":"Next step →");}
  back.addEventListener("click",()=>{if(step>1){step--;draw()}});
  next.addEventListener("click",()=>{if(step<3){step++;draw()}else{step=1;draw()}});
  document.getElementById("languageSelect")?.addEventListener("change",draw);draw();
 });
})();
