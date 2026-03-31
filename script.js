// ===== DATA =====
let data={teams:[],players:[],coaches:[],practices:[],attendance:[],payments:[],injuries:[],notes:[],transfers:[],matches:[],messages:[],stadiums:[],inventory:[]};
let currentCalendarDate=new Date();
const SKILLS=['სიჩქარე','ტექნიკა','პასი','დრიბლინგი','დარტყმა','თავის თამაში'];

function init(){
data={
teams:[
{id:'1',schoolName:'დინამო ბათუმი',ageCategory:'U-12',name:'დინამო ბათუმი U-12',monthlyFee:80},
{id:'2',schoolName:'დინამო ბათუმი',ageCategory:'U-15',name:'დინამო ბათუმი U-15',monthlyFee:100},
{id:'3',schoolName:'დინამო ბათუმი',ageCategory:'U-17',name:'დინამო ბათუმი U-17',monthlyFee:120},
{id:'4',schoolName:'დინამო ბათუმი',ageCategory:'U-19',name:'დინამო ბათუმი U-19',monthlyFee:150}
],
coaches:[
{id:'c1',name:'ვილი სანიოლი',phone:'+995 555 11 22 33',specialty:'მთავარი მწვრთნელი',salary:2500},
{id:'c2',name:'შოთა არველაძე',phone:'+995 555 44 55 66',specialty:'მთავარი მწვრთნელი',salary:2200},
{id:'c3',name:'თემურ ქეცბაია',phone:'+995 555 77 88 99',specialty:'ასისტენტი',salary:1800},
{id:'c4',name:'კახა კალაძე',phone:'+995 555 00 11 22',specialty:'მეკარეთა მწვრთნელი',salary:1500}
],
players:[
{id:'p1',teamId:'1',name:'ნიკა ჯორბენაძე',birthDate:'2014-03-15',position:'თავდამსხმელი',number:9,parentPhone:'+995 555 101010',hasPaidFee:true,hasDocuments:true,skills:{სიჩქარე:78,ტექნიკა:72,პასი:65,დრიბლინგი:80,დარტყმა:75,თავის_თამაში:60}},
{id:'p2',teamId:'1',name:'დავით ლომაძე',birthDate:'2014-06-22',position:'ნახევარმცველი',number:8,parentPhone:'+995 555 202020',hasPaidFee:true,hasDocuments:true,skills:{სიჩქარე:70,ტექნიკა:82,პასი:85,დრიბლინგი:68,დარტყმა:60,თავის_თამაში:55}},
{id:'p3',teamId:'1',name:'ლუკა ჩხეტია',birthDate:'2014-01-10',position:'მცველი',number:4,parentPhone:'+995 555 303030',hasPaidFee:false,hasDocuments:false,skills:{სიჩქარე:65,ტექნიკა:58,პასი:70,დრიბლინგი:50,დარტყმა:55,თავის_თამაში:78}},
{id:'p4',teamId:'2',name:'გიორგი მიქაუტაძე',birthDate:'2011-10-11',position:'თავდამსხმელი',number:10,parentPhone:'+995 555 404040',hasPaidFee:true,hasDocuments:true,skills:{სიჩქარე:88,ტექნიკა:85,პასი:78,დრიბლინგი:90,დარტყმა:92,თავის_თამაში:70}},
{id:'p5',teamId:'2',name:'ხვიჩა კვარაცხელია',birthDate:'2011-02-12',position:'ნახევარმცველი',number:7,parentPhone:'+995 555 505050',hasPaidFee:false,hasDocuments:true,skills:{სიჩქარე:92,ტექნიკა:95,პასი:82,დრიბლინგი:96,დარტყმა:85,თავის_თამაში:65}},
{id:'p6',teamId:'2',name:'ოთარ კიტეიშვილი',birthDate:'2011-07-30',position:'ნახევარმცველი',number:6,parentPhone:'+995 555 606060',hasPaidFee:true,hasDocuments:false,skills:{სიჩქარე:75,ტექნიკა:80,პასი:88,დრიბლინგი:72,დარტყმა:70,თავის_თამაში:68}},
{id:'p7',teamId:'2',name:'ზურაბ დავითაშვილი',birthDate:'2011-12-05',position:'მცველი',number:3,parentPhone:'+995 555 707070',hasPaidFee:true,hasDocuments:true,skills:{სიჩქარე:72,ტექნიკა:65,პასი:75,დრიბლინგი:55,დარტყმა:50,თავის_თამაში:82}},
{id:'p8',teamId:'3',name:'გიორგი მამარდაშვილი',birthDate:'2009-08-18',position:'მეკარე',number:1,parentPhone:'+995 555 808080',hasPaidFee:true,hasDocuments:true,skills:{სიჩქარე:68,ტექნიკა:60,პასი:72,დრიბლინგი:40,დარტყმა:55,თავის_თამაში:50}},
{id:'p9',teamId:'3',name:'ანზორ მექვაბიშვილი',birthDate:'2009-11-25',position:'მცველი',number:5,parentPhone:'+995 555 909090',hasPaidFee:false,hasDocuments:false,skills:{სიჩქარე:70,ტექნიკა:62,პასი:68,დრიბლინგი:58,დარტყმა:52,თავის_თამაში:75}},
{id:'p10',teamId:'3',name:'სანდრო ალტუნაშვილი',birthDate:'2009-04-08',position:'ნახევარმცველი',number:11,parentPhone:'+995 555 010101',hasPaidFee:true,hasDocuments:true,skills:{სიჩქარე:82,ტექნიკა:78,პასი:80,დრიბლინგი:76,დარტყმა:74,თავის_თამაში:62}},
{id:'p11',teamId:'4',name:'ლევან შენგელია',birthDate:'2007-05-14',position:'თავდამსხმელი',number:9,parentPhone:'+995 555 020202',hasPaidFee:true,hasDocuments:true,skills:{სიჩქარე:85,ტექნიკა:82,პასი:76,დრიბლინგი:84,დარტყმა:88,თავის_თამაში:72}},
{id:'p12',teamId:'4',name:'თორნიკე გორგოძე',birthDate:'2007-09-20',position:'ნახევარმცველი',number:14,parentPhone:'+995 555 030303',hasPaidFee:false,hasDocuments:true,skills:{სიჩქარე:74,ტექნიკა:70,პასი:82,დრიბლინგი:66,დარტყმა:68,თავის_თამაში:70}}
],
stadiums:[
{id:'s1',name:'ბათუმი არენა',location:'ბათუმი, გმირთა ხეივანი',type:'ბუნებრივი'},
{id:'s2',name:'ანგისას ბაზა',location:'ბათუმი, ანგისა',type:'ხელოვნური'},
{id:'s3',name:'ადლიას სტადიონი',location:'ბათუმი, ადლია',type:'ხელოვნური'}
],
practices:[
{id:'e1',teamId:'1',stadiumId:'s2',type:'ვარჯიში',coachId:'c3',day:'ორშაბათი',time:'15:00'},
{id:'e2',teamId:'1',stadiumId:'s2',type:'ვარჯიში',coachId:'c3',day:'ოთხშაბათი',time:'15:00'},
{id:'e3',teamId:'1',stadiumId:'s1',type:'თამაში',coachId:'c3',day:'შაბათი',time:'11:00'},
{id:'e4',teamId:'2',stadiumId:'s2',type:'ვარჯიში',coachId:'c1',day:'ორშაბათი',time:'17:00'},
{id:'e5',teamId:'2',stadiumId:'s2',type:'ვარჯიში',coachId:'c1',day:'ოთხშაბათი',time:'17:00'},
{id:'e6',teamId:'2',stadiumId:'s2',type:'ვარჯიში',coachId:'c1',day:'პარასკევი',time:'17:00'},
{id:'e7',teamId:'2',stadiumId:'s1',type:'თამაში',coachId:'c1',day:'შაბათი',time:'14:00'},
{id:'e8',teamId:'3',stadiumId:'s3',type:'ვარჯიში',coachId:'c2',day:'სამშაბათი',time:'16:00'},
{id:'e9',teamId:'3',stadiumId:'s3',type:'ვარჯიში',coachId:'c2',day:'ხუთშაბათი',time:'16:00'},
{id:'e10',teamId:'3',stadiumId:'s2',type:'ამხანაგური',coachId:'c2',day:'კვირა',time:'12:00'},
{id:'e11',teamId:'4',stadiumId:'s3',type:'ვარჯიში',coachId:'c2',day:'ორშაბათი',time:'18:30'},
{id:'e12',teamId:'4',stadiumId:'s1',type:'თამაში',coachId:'c4',day:'კვირა',time:'16:00'}
],
attendance:[
{id:'a1',date:'2026-03-28',teamId:'2',event:'ვარჯიში',records:{p4:'present',p5:'present',p6:'absent',p7:'present'}},
{id:'a2',date:'2026-03-29',teamId:'1',event:'ვარჯიში',records:{p1:'present',p2:'late',p3:'absent'}},
{id:'a3',date:'2026-03-30',teamId:'3',event:'ვარჯიში',records:{p8:'present',p9:'present',p10:'present'}}
],
payments:[
{id:'pay1',playerId:'p1',amount:80,month:'მარტი',date:'2026-03-05'},
{id:'pay2',playerId:'p2',amount:80,month:'მარტი',date:'2026-03-05'},
{id:'pay3',playerId:'p4',amount:100,month:'მარტი',date:'2026-03-10'},
{id:'pay4',playerId:'p7',amount:100,month:'მარტი',date:'2026-03-10'},
{id:'pay5',playerId:'p8',amount:120,month:'მარტი',date:'2026-03-12'},
{id:'pay6',playerId:'p10',amount:120,month:'მარტი',date:'2026-03-12'},
{id:'pay7',playerId:'p11',amount:150,month:'მარტი',date:'2026-03-15'},
{id:'pay8',playerId:'p6',amount:100,month:'თებერვალი',date:'2026-02-08'}
],
injuries:[
{id:'i1',playerId:'p5',type:'კუნთის გაჭიმვა',date:'2026-03-25',recoveryDays:14},
{id:'i2',playerId:'p9',type:'ტერფის დაზიანება',date:'2026-03-20',recoveryDays:21},
{id:'i3',playerId:'p4',type:'მუხლის ტკივილი',date:'2026-02-10',recoveryDays:10}
],
notes:[
{id:'n1',playerId:'p5',text:'ძალიან მოტივირებულია, კარგი ლიდერი.',date:'2026-03-20'},
{id:'n2',playerId:'p1',text:'სიჩქარეზე სჭირდება მუშაობა.',date:'2026-03-18'},
{id:'n3',playerId:'p8',text:'საუკეთესო მეკარე. რეკომენდირებულია ეროვნულ ნაკრებში.',date:'2026-03-22'}
],
transfers:[
{id:'t1',playerId:'p10',fromTeamId:'2',toTeamId:'3',reason:'ასაკობრივი გადასვლა',date:'2026-02-15',status:'დასრულებული'},
{id:'t2',playerId:'p11',fromTeamId:'3',toTeamId:'4',reason:'მწვრთნელის რეკომენდაცია',date:'2026-01-20',status:'დასრულებული'}
],
matches:[
{id:'m1',teamId:'2',opponent:'თბილისი FC U-15',score:'3:1',type:'თამაში',date:'2026-03-22',result:'მოგება',scorers:['გ. მიქაუტაძე x2','ო. კიტეიშვილი']},
{id:'m2',teamId:'3',opponent:'ბათუმი 2 U-17',score:'2:2',type:'ამხანაგური',date:'2026-03-15',result:'ფრე',scorers:['გ. მამარდაშვილი (პენ.)','ს. ალტუნაშვილი']},
{id:'m3',teamId:'1',opponent:'ქუთაისი U-12',score:'0:2',type:'თამაში',date:'2026-03-08',result:'წაგება',scorers:[]},
{id:'m4',teamId:'4',opponent:'რუსთავი U-19',score:'4:0',type:'თამაში',date:'2026-03-01',result:'მოგება',scorers:['ლ. შენგელია x3','თ. გორგოძე']},
{id:'m5',teamId:'2',opponent:'ზუგდიდი U-15',score:'1:0',type:'ამხანაგური',date:'2026-02-25',result:'მოგება',scorers:['ხვ. კვარაცხელია']}
],
messages:[
{id:'msg1',template:'fee_reminder',recipient:'ყველა მშობელი',text:'ძვირფასო მშობელო, შეგახსენებთ რომ მარტის საწევროს გადახდის ვადაა 15 მარტი.',date:'2026-03-10'}
],
inventory:[
{id:'i1',name:'Nike ბურთები აკადემიის',type:'ბურთი',qty:30,condition:'კარგი',icon:'fa-futbol',color:'#4F46E5'},
{id:'i2',name:'სავარჯიშო კონუსები',type:'კონუსი',qty:50,condition:'ახალი',icon:'fa-triangle-exclamation',color:'#F59E0B'},
{id:'i3',name:'მწვანე ჟილეტები',type:'ჟილეტი',qty:25,condition:'კარგი',icon:'fa-shirt',color:'#10B981'},
{id:'i4',name:'ნარინჯისფერი ჟილეტები',type:'ჟილეტი',qty:25,condition:'კარგი',icon:'fa-shirt',color:'#F97316'},
{id:'i5',name:'სავარჯიშო ჩიხრეები',type:'სავარჯიშო ჯოხი',qty:15,condition:'დაზიანებული',icon:'fa-bars-staggered',color:'#EF4444'}
]
};
setupNavigation(); setupForms(); updateUI();
}

// ===== HELPERS =====
function saveData(){}
function cn(id){const c=data.coaches.find(c=>c.id===id);return c?c.name:'—';}
function tn(id){const t=data.teams.find(t=>t.id===id);return t?t.name:'—';}
function pn(id){const p=data.players.find(p=>p.id===id);return p?p.name:'—';}
function sn(id){const s=data.stadiums.find(s=>s.id===id);return s?s.name:'—';}
function age(bd){if(!bd)return'—';return new Date().getFullYear()-new Date(bd).getFullYear();}
function injActive(i){const e=new Date(i.date);e.setDate(e.getDate()+i.recoveryDays);return e>new Date();}
function avgSkill(p){if(!p.skills)return 0;const v=Object.values(p.skills);return Math.round(v.reduce((a,b)=>a+b,0)/v.length);}

// ===== NAVIGATION =====
function setupNavigation(){
document.querySelectorAll('.nav-btn').forEach(b=>{b.addEventListener('click',()=>{
document.querySelectorAll('.nav-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');
document.querySelectorAll('.page-section').forEach(s=>s.classList.remove('active'));
document.getElementById(b.dataset.target).classList.add('active');
});});
}

// ===== MODALS =====
function openModal(id){populateAllSelects();
if(id==='attendanceModal')document.getElementById('attendanceDate').valueAsDate=new Date();
if(id==='paymentModal')document.getElementById('paymentDate').valueAsDate=new Date();
if(id==='injuryModal')document.getElementById('injuryDate').valueAsDate=new Date();
document.getElementById(id).classList.add('active');}
function closeModal(id){document.getElementById(id).classList.remove('active');
const f=document.querySelector(`#${id} form`);if(f)f.reset();
if(id==='teamModal')document.getElementById('teamNamePreview').textContent='-';}

function populateAllSelects(){
const to=data.teams.map(t=>`<option value="${t.id}">${t.name}</option>`).join('');
const co=data.coaches.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
const po=data.players.map(p=>`<option value="${p.id}">${p.name} (${tn(p.teamId)})</option>`).join('');
const so=data.stadiums.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
['playerTeam','practiceTeam','attendanceTeam','transferToTeam'].forEach(id=>{const e=document.getElementById(id);if(e)e.innerHTML=to;});
const pc=document.getElementById('practiceCoach');if(pc)pc.innerHTML=co;
const ps=document.getElementById('practiceStadium');if(ps)ps.innerHTML=so;
['paymentPlayer','injuryPlayer','notePlayer','transferPlayer','comparePlayer1','comparePlayer2'].forEach(id=>{const e=document.getElementById(id);if(e)e.innerHTML=po;});
const ft=document.getElementById('filterPlayerTeam');
if(ft){const s=ft.value;ft.innerHTML='<option value="all">ყველა გუნდი</option>'+to;ft.value=s||'all';}
const mr=document.getElementById('msgRecipient');
if(mr)mr.innerHTML='<option value="all">ყველა მშობელი</option>'+data.teams.map(t=>`<option value="${t.id}">${t.name} - მშობლები</option>`).join('');
const fss=document.getElementById('filterStadiumSchedule');
if(fss){const s=fss.value;fss.innerHTML='<option value="all">ყველა სტადიონი</option>'+so;fss.value=s||'all';}
}

// ===== FORMS =====
function setupForms(){
const sn=document.getElementById('schoolName'),ac=document.getElementById('ageCategory'),pv=document.getElementById('teamNamePreview');
const up=()=>{pv.textContent=(sn.value||ac.value)?`${sn.value} ${ac.value}`.trim():'-';};
sn.addEventListener('input',up);ac.addEventListener('input',up);

document.getElementById('teamForm').addEventListener('submit',e=>{e.preventDefault();
data.teams.push({id:Date.now().toString(),schoolName:sn.value.trim(),ageCategory:ac.value.trim(),name:`${sn.value.trim()} ${ac.value.trim()}`,monthlyFee:parseInt(document.getElementById('teamFee').value)||0});
closeModal('teamModal');updateUI();});

document.getElementById('playerForm').addEventListener('submit',e=>{e.preventDefault();
const sk={};SKILLS.forEach(s=>sk[s]=50+Math.floor(Math.random()*40));
data.players.push({id:Date.now().toString(),teamId:document.getElementById('playerTeam').value,name:document.getElementById('playerName').value.trim(),birthDate:document.getElementById('playerBirthDate').value,position:document.getElementById('playerPosition').value,number:parseInt(document.getElementById('playerNumber').value)||'',parentPhone:document.getElementById('playerParentPhone').value,hasPaidFee:document.getElementById('hasPaidFee').checked,hasDocuments:document.getElementById('hasDocuments').checked,skills:sk});
closeModal('playerModal');updateUI();});

document.getElementById('coachForm').addEventListener('submit',e=>{e.preventDefault();
data.coaches.push({id:Date.now().toString(),name:document.getElementById('coachNameInput').value.trim(),phone:document.getElementById('coachPhone').value,specialty:document.getElementById('coachSpecialty').value,salary:parseInt(document.getElementById('coachSalary').value)||0});
closeModal('coachModal');updateUI();});

document.getElementById('practiceForm').addEventListener('submit',e=>{e.preventDefault();
data.practices.push({id:Date.now().toString(),type:document.getElementById('eventType').value,teamId:document.getElementById('practiceTeam').value,coachId:document.getElementById('practiceCoach').value,stadiumId:document.getElementById('practiceStadium').value,day:document.getElementById('practiceDay').value,time:document.getElementById('practiceTime').value});
closeModal('practiceModal');updateUI();});

document.getElementById('attendanceForm').addEventListener('submit',e=>{e.preventDefault();
const rec={};document.querySelectorAll('.att-player-row').forEach(r=>{const pid=r.dataset.playerId;const a=r.querySelector('.att-status-btn.present,.att-status-btn.absent,.att-status-btn.late');
if(a){if(a.classList.contains('present'))rec[pid]='present';else if(a.classList.contains('absent'))rec[pid]='absent';else rec[pid]='late';}});
data.attendance.push({id:Date.now().toString(),date:document.getElementById('attendanceDate').value,teamId:document.getElementById('attendanceTeam').value,event:document.getElementById('attendanceEvent').value,records:rec});
closeModal('attendanceModal');updateUI();});

document.getElementById('paymentForm').addEventListener('submit',e=>{e.preventDefault();
const pid=document.getElementById('paymentPlayer').value;
data.payments.push({id:Date.now().toString(),playerId:pid,amount:parseInt(document.getElementById('paymentAmount').value),month:document.getElementById('paymentMonth').value,date:document.getElementById('paymentDate').value});
const pl=data.players.find(p=>p.id===pid);if(pl)pl.hasPaidFee=true;
closeModal('paymentModal');updateUI();});

document.getElementById('transferForm').addEventListener('submit',e=>{e.preventDefault();
const pid=document.getElementById('transferPlayer').value;const toTeam=document.getElementById('transferToTeam').value;
const pl=data.players.find(p=>p.id===pid);if(!pl)return;
data.transfers.push({id:Date.now().toString(),playerId:pid,fromTeamId:pl.teamId,toTeamId:toTeam,reason:document.getElementById('transferReason').value,date:new Date().toISOString().split('T')[0],status:'დასრულებული'});
pl.teamId=toTeam;closeModal('transferModal');updateUI();});

document.getElementById('injuryForm').addEventListener('submit',e=>{e.preventDefault();
data.injuries.push({id:Date.now().toString(),playerId:document.getElementById('injuryPlayer').value,type:document.getElementById('injuryType').value,date:document.getElementById('injuryDate').value,recoveryDays:parseInt(document.getElementById('injuryRecovery').value)||7});
closeModal('injuryModal');updateUI();});

document.getElementById('noteForm').addEventListener('submit',e=>{e.preventDefault();
data.notes.push({id:Date.now().toString(),playerId:document.getElementById('notePlayer').value,text:document.getElementById('noteText').value,date:new Date().toISOString().split('T')[0]});
closeModal('noteModal');updateUI();});

if(document.getElementById('stadiumForm')) {
    document.getElementById('stadiumForm').addEventListener('submit',e=>{e.preventDefault();
    data.stadiums.push({id:Date.now().toString(),name:document.getElementById('stadiumName').value.trim(),location:document.getElementById('stadiumLocation').value.trim(),type:document.getElementById('stadiumType').value});
    closeModal('stadiumModal');updateUI();});
}

if(document.getElementById('inventoryForm')) {
    document.getElementById('inventoryForm').addEventListener('submit',e=>{e.preventDefault();
    const type=document.getElementById('invType').value;
    const icons={'ბურთი':'fa-futbol','კონუსი':'fa-triangle-exclamation','ჟილეტი':'fa-shirt','სავარჯიშო ჯოხი':'fa-bars-staggered','საბაზო ბადე':'fa-border-all','სამედიცინო ჩანთა':'fa-briefcase-medical','სხვა':'fa-box'};
    const colors={'ბურთი':'#4F46E5','კონუსი':'#F59E0B','ჟილეტი':'#10B981','სავარჯიშო ჯოხი':'#8B5CF6','საბაზო ბადე':'#6B7280','სამედიცინო ჩანთა':'#EF4444','სხვა':'#374151'};
    data.inventory.push({id:Date.now().toString(),name:document.getElementById('invName').value.trim(),type:type,qty:parseInt(document.getElementById('invQty').value),condition:document.getElementById('invCond').value,icon:icons[type]||'fa-box',color:colors[type]||'#374151'});
    closeModal('inventoryModal');updateUI();});
}
}

function loadTeamPlayersForAttendance(){
const ps=data.players.filter(p=>p.teamId===document.getElementById('attendanceTeam').value);
document.getElementById('attendanceChecklist').innerHTML=ps.length?ps.map(p=>`<div class="att-player-row" data-player-id="${p.id}"><span>${p.name}</span><div class="att-status-btns"><button type="button" class="att-status-btn" onclick="setAttStatus(this,'present')">✓</button><button type="button" class="att-status-btn" onclick="setAttStatus(this,'late')">⏰</button><button type="button" class="att-status-btn" onclick="setAttStatus(this,'absent')">✗</button></div></div>`).join(''):'<p style="color:var(--text-muted)">არ მოიძებნა</p>';
}
function setAttStatus(b,s){b.closest('.att-player-row').querySelectorAll('.att-status-btn').forEach(x=>x.classList.remove('present','absent','late'));b.classList.add(s);}

// ===== SEARCH =====
function handleGlobalSearch(){
const q=document.getElementById('globalSearch').value.trim().toLowerCase();const c=document.getElementById('searchResults');
if(!q){c.style.display='none';return;}
const r=[];
data.players.filter(p=>p.name.toLowerCase().includes(q)).forEach(p=>r.push({type:'player',name:p.name,meta:tn(p.teamId),id:p.id}));
data.coaches.filter(c=>c.name.toLowerCase().includes(q)).forEach(c=>r.push({type:'coach',name:c.name,meta:c.specialty}));
document.getElementById('searchResultsContent').innerHTML=r.length?r.map(x=>`<div class="search-result-item" onclick="${x.type==='player'?`showPlayerDetail('${x.id}')`:''}; document.getElementById('searchResults').style.display='none';document.getElementById('globalSearch').value='';"><div class="sr-name"><i class="fa-solid ${x.type==='player'?'fa-user':'fa-user-tie'}"></i> ${x.name}</div><div class="sr-meta">${x.meta}</div></div>`).join(''):'<div class="search-result-item"><span class="sr-name">არ მოიძებნა</span></div>';
c.style.display='block';
}

// ===== NOTIFICATIONS =====
function toggleNotifications(){const d=document.getElementById('notifDropdown');d.style.display=d.style.display==='none'?'block':'none';renderNotifications();}
function renderNotifications(){
const notifs=[];
data.players.filter(p=>!p.hasPaidFee).forEach(p=>notifs.push({color:'#EF4444',text:`${p.name} - საწევრო გადაუხდელია`}));
data.injuries.filter(injActive).forEach(i=>notifs.push({color:'#F59E0B',text:`${pn(i.playerId)} - აქტიური ტრავმა: ${i.type}`}));
data.players.filter(p=>!p.hasDocuments).forEach(p=>notifs.push({color:'#F97316',text:`${p.name} - დოკუმენტები არასრული`}));
document.getElementById('notifCount').textContent=notifs.length;
document.getElementById('notifList').innerHTML=notifs.slice(0,8).map(n=>`<div class="notif-item"><div class="notif-dot" style="background:${n.color}"></div><span>${n.text}</span></div>`).join('')||'<div class="notif-item">შეტყობინებები არ არის</div>';
}

// ===== UPDATE UI =====
function updateUI(){renderDashboard();renderTeams();renderPlayers();renderCoaches();renderSchedule();renderMatches();renderStadiums();renderStadiumSchedule();renderInventory();renderAttendance();renderFinances();renderCalendar();renderTransfers();renderRatings();renderMessages();populateAllSelects();renderNotifications();}

document.addEventListener('DOMContentLoaded',init);
