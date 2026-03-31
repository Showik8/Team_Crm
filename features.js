// ===== DASHBOARD =====
function renderDashboard(){
const tc=data.payments.reduce((s,p)=>s+p.amount,0);
const exp=data.players.reduce((s,p)=>{const t=data.teams.find(x=>x.id===p.teamId);return s+(t?t.monthlyFee:0);},0);
const debt=Math.max(0,exp-tc);
document.getElementById('dashStats').innerHTML=`
<div class="stat-card stat-blue"><div class="stat-icon"><i class="fa-solid fa-shield-halved"></i></div><div class="stat-details"><h3>გუნდები</h3><p>${data.teams.length}</p></div></div>
<div class="stat-card stat-green"><div class="stat-icon"><i class="fa-solid fa-user-group"></i></div><div class="stat-details"><h3>ფეხბურთელები</h3><p>${data.players.length}</p></div></div>
<div class="stat-card stat-purple"><div class="stat-icon"><i class="fa-solid fa-user-tie"></i></div><div class="stat-details"><h3>მწვრთნელები</h3><p>${data.coaches.length}</p></div></div>
<div class="stat-card stat-orange"><div class="stat-icon"><i class="fa-solid fa-trophy"></i></div><div class="stat-details"><h3>მატჩები</h3><p>${data.matches.length}</p></div></div>
<div class="stat-card stat-red"><div class="stat-icon"><i class="fa-solid fa-hand-holding-dollar"></i></div><div class="stat-details"><h3>შეგროვებული</h3><p>${tc}₾</p></div></div>
<div class="stat-card stat-yellow"><div class="stat-icon"><i class="fa-solid fa-triangle-exclamation"></i></div><div class="stat-details"><h3>დავალიანება</h3><p>${debt}₾</p></div></div>`;

// Activity
const acts=[];
data.payments.slice(-3).reverse().forEach(p=>acts.push({icon:'green',fa:'fa-money-bill',text:`${pn(p.playerId)} - ${p.amount}₾ (${p.month})`,time:p.date}));
data.transfers.slice(-2).reverse().forEach(t=>acts.push({icon:'blue',fa:'fa-right-left',text:`${pn(t.playerId)} → ${tn(t.toTeamId)}`,time:t.date}));
data.injuries.slice(-2).reverse().forEach(i=>acts.push({icon:'red',fa:'fa-kit-medical',text:`${pn(i.playerId)} - ${i.type}`,time:i.date}));
acts.sort((a,b)=>b.time.localeCompare(a.time));
document.getElementById('activityFeed').innerHTML=acts.slice(0,5).map(a=>`<li><div class="feed-icon ${a.icon}"><i class="fa-solid ${a.fa}"></i></div><span class="feed-text">${a.text}</span><span class="feed-time">${a.time}</span></li>`).join('')||'<li class="empty-state">ცარიელია</li>';

// Upcoming
const dO=['ორშაბათი','სამშაბათი','ოთხშაბათი','ხუთშაბათი','პარასკევი','შაბათი','კვირა'];
const tI=new Date().getDay();const todayIdx=tI===0?6:tI-1;
const up=data.practices.map(p=>{let d=dO.indexOf(p.day)-todayIdx;if(d<0)d+=7;return{...p,diff:d};}).sort((a,b)=>a.diff-b.diff||a.time.localeCompare(b.time)).slice(0,5);
document.getElementById('upcomingEvents').innerHTML=up.map(e=>`<li><div class="feed-icon blue"><i class="fa-solid fa-calendar"></i></div><span class="feed-text">${tn(e.teamId)} - ${e.day} ${e.time} <span class="badge badge-${e.type==='თამაში'?'match':e.type==='ამხანაგური'?'friendly':'practice'}">${e.type}</span></span></li>`).join('')||'<li class="empty-state">ცარიელია</li>';

// Injuries
const ai=data.injuries.filter(injActive);
document.getElementById('activeInjuries').innerHTML=ai.map(i=>{const e=new Date(i.date);e.setDate(e.getDate()+i.recoveryDays);const dl=Math.ceil((e-new Date())/86400000);return`<li><div class="feed-icon red"><i class="fa-solid fa-user-injured"></i></div><span class="feed-text">${pn(i.playerId)} - ${i.type}</span><span class="feed-time">${dl}დ</span></li>`;}).join('')||'<li class="empty-state">ტრავმები არ არის</li>';

// Chart
const ch=document.getElementById('attendanceChart');
if(!data.attendance.length){ch.innerHTML='<p class="empty-state" style="width:100%">მონაცემები არ არის</p>';return;}
const ta={};data.teams.forEach(t=>ta[t.id]={tot:0,pres:0});
data.attendance.forEach(a=>{if(!ta[a.teamId])return;Object.values(a.records).forEach(s=>{ta[a.teamId].tot++;if(s==='present'||s==='late')ta[a.teamId].pres++;});});
ch.innerHTML=data.teams.map(t=>{const d=ta[t.id];const p=d.tot?Math.round(d.pres/d.tot*100):0;return`<div class="att-bar-wrap"><div class="att-bar-val">${p}%</div><div class="att-bar" style="height:${Math.max(4,p)}px"></div><div class="att-bar-label">${t.ageCategory}</div></div>`;}).join('');
}

// ===== TEAMS =====
function renderTeams(){
document.getElementById('teamsList').innerHTML=data.teams.map(t=>{const pc=data.players.filter(p=>p.teamId===t.id).length;const ec=data.practices.filter(p=>p.teamId===t.id).length;const paid=data.players.filter(p=>p.teamId===t.id&&p.hasPaidFee).length;
return`<div class="team-card" onclick="showTeamDetail('${t.id}')"><div class="team-icon"><i class="fa-solid fa-shield-halved"></i></div><h3 class="team-title">${t.name}</h3><p class="team-subtitle">${t.monthlyFee}₾/თვე</p><div class="team-stats"><div class="t-stat">მოთამაშე<strong>${pc}</strong></div><div class="t-stat">ღონისძ.<strong>${ec}</strong></div><div class="t-stat">გადახდ.<strong>${paid}/${pc}</strong></div></div></div>`;}).join('')||'<div class="empty-state">ცარიელია</div>';
}
function showTeamDetail(id){const t=data.teams.find(x=>x.id===id);if(!t)return;const ps=data.players.filter(p=>p.teamId===id);const pr=data.practices.filter(p=>p.teamId===id);
document.getElementById('teamsList').style.display='none';document.getElementById('teamDetailPanel').style.display='block';
document.getElementById('teamDetailContent').innerHTML=`<div class="team-detail-header"><div class="team-icon"><i class="fa-solid fa-shield-halved"></i></div><div class="td-info"><h3>${t.name}</h3><p>${t.schoolName} • ${t.monthlyFee}₾/თვე</p></div></div>
<div class="stats-grid"><div class="stat-card stat-blue"><div class="stat-icon"><i class="fa-solid fa-users"></i></div><div class="stat-details"><h3>მოთამაშეები</h3><p>${ps.length}</p></div></div><div class="stat-card stat-green"><div class="stat-icon"><i class="fa-solid fa-money-bill"></i></div><div class="stat-details"><h3>გადახდილი</h3><p>${ps.filter(p=>p.hasPaidFee).length}/${ps.length}</p></div></div></div>
<h3 style="margin:16px 0 8px">შემადგენლობა</h3><div class="table-container"><table class="data-table"><thead><tr><th>#</th><th>სახელი</th><th>პოზ.</th><th>ასაკი</th><th>რეიტ.</th></tr></thead><tbody>${ps.map(p=>`<tr onclick="showPlayerDetail('${p.id}')" style="cursor:pointer"><td>${p.number||'-'}</td><td style="font-weight:500">${p.name}</td><td>${p.position||'-'}</td><td>${age(p.birthDate)}</td><td><strong>${avgSkill(p)}</strong></td></tr>`).join('')}</tbody></table></div>
<h3 style="margin:16px 0 8px">განრიგი</h3>${pr.map(p=>`<div class="practice-item" style="padding:6px 0;border-bottom:1px solid var(--border)"><span class="time">${p.time}</span><span class="team">${p.day} <span class="badge badge-${p.type==='თამაში'?'match':p.type==='ამხანაგური'?'friendly':'practice'}">${p.type}</span></span><span class="coach"><i class="fa-solid fa-user-tie"></i> ${cn(p.coachId)}</span></div>`).join('')||'<p class="empty-state">ცარიელია</p>'}`;
}
function closeTeamDetail(){document.getElementById('teamsList').style.display='';document.getElementById('teamDetailPanel').style.display='none';}

// ===== PLAYERS =====
function renderPlayers(){
const fT=document.getElementById('filterPlayerTeam').value,fF=document.getElementById('filterPlayerFee').value,fD=document.getElementById('filterPlayerDocs').value;
let fl=data.players;if(fT!=='all')fl=fl.filter(p=>p.teamId===fT);if(fF==='paid')fl=fl.filter(p=>p.hasPaidFee);if(fF==='unpaid')fl=fl.filter(p=>!p.hasPaidFee);if(fD==='complete')fl=fl.filter(p=>p.hasDocuments);if(fD==='missing')fl=fl.filter(p=>!p.hasDocuments);
document.getElementById('playersList').innerHTML=fl.length?fl.map(p=>{const ai=data.injuries.filter(i=>i.playerId===p.id&&injActive(i));const ib=ai.length?`<span class="badge badge-danger"><i class="fa-solid fa-user-injured"></i></span>`:'<span class="badge badge-success">✓</span>';const sk=avgSkill(p);
return`<tr><td>${p.number||'-'}</td><td style="font-weight:500;cursor:pointer" onclick="showPlayerDetail('${p.id}')">${p.name}</td><td>${tn(p.teamId)}</td><td>${p.position||'-'}</td><td>${age(p.birthDate)}</td><td>${p.hasPaidFee?'<span class="badge badge-success">✓</span>':'<span class="badge badge-danger">✗</span>'}</td><td>${p.hasDocuments?'<span class="badge badge-success">✓</span>':'<span class="badge badge-danger">✗</span>'}</td><td>${ib}</td><td><strong>${sk}</strong></td><td><div class="action-btns"><button class="btn btn-sm btn-outline" onclick="showPlayerDetail('${p.id}')"><i class="fa-solid fa-eye"></i></button><button class="delete-btn" onclick="deletePlayer('${p.id}')"><i class="fa-regular fa-trash-can"></i></button></div></td></tr>`;}).join(''):'<tr><td colspan="10" class="empty-state">ცარიელია</td></tr>';
}
function deletePlayer(id){if(confirm('წავშალოთ?')){data.players=data.players.filter(p=>p.id!==id);updateUI();}}

function showPlayerDetail(pid){const p=data.players.find(x=>x.id===pid);if(!p)return;
const notes=data.notes.filter(n=>n.playerId===pid),injs=data.injuries.filter(i=>i.playerId===pid),pays=data.payments.filter(x=>x.playerId===pid);
let tAtt=0,pAtt=0;data.attendance.forEach(a=>{if(a.records[pid]){tAtt++;if(a.records[pid]==='present'||a.records[pid]==='late')pAtt++;}});
const attP=tAtt?Math.round(pAtt/tAtt*100):'-';const ini=p.name.split(' ').map(w=>w[0]).join('');
const skillsHtml=p.skills?Object.entries(p.skills).map(([k,v])=>`<div class="skill-bar-wrap"><div class="skill-bar-label"><span>${k.replace('_',' ')}</span><span>${v}</span></div><div class="skill-bar-track"><div class="skill-bar-fill" style="width:${v}%"></div></div></div>`).join(''):'';
document.getElementById('playerDetailContent').innerHTML=`
<div class="player-detail-header"><div class="pd-avatar">${ini}</div><div class="pd-info"><h2>${p.name}</h2><p>${tn(p.teamId)} • #${p.number||'-'} • ${p.position||'-'}</p><div class="pd-badges">${p.hasPaidFee?'<span class="badge badge-success">საწევრო ✓</span>':'<span class="badge badge-danger">დავალიანება</span>'} ${p.hasDocuments?'<span class="badge badge-success">დოკუმენტები ✓</span>':'<span class="badge badge-danger">დოკუმენტები ✗</span>'}</div></div></div>
<div class="pd-section"><h4>პირადი ინფორმაცია</h4><div class="pd-grid"><div class="pd-field"><label>დაბადება</label>${p.birthDate||'-'}</div><div class="pd-field"><label>ასაკი</label>${age(p.birthDate)}</div><div class="pd-field"><label>მშობლის ტელ.</label>${p.parentPhone||'-'}</div><div class="pd-field"><label>დასწრება</label>${attP}%</div></div></div>
<div class="pd-section"><h4>უნარები (${avgSkill(p)})</h4>${skillsHtml}</div>
<div class="pd-section"><h4>ტრავმები</h4>${injs.length?injs.map(i=>`<div class="injury-card ${injActive(i)?'':'recovered'}"><div><strong>${i.type}</strong><br><small>${i.date} • ${i.recoveryDays}დ</small></div><span class="badge ${injActive(i)?'badge-danger':'badge-success'}">${injActive(i)?'აქტიური':'განიკურნა'}</span></div>`).join(''):'<p style="font-size:12px;color:var(--text-muted)">არ არის</p>'}</div>
<div class="pd-section"><h4>გადახდები</h4>${pays.length?pays.map(x=>`<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border);font-size:12px"><span>${x.month}</span><span style="font-weight:600">${x.amount}₾</span><span style="color:var(--text-muted)">${x.date}</span></div>`).join(''):'<p style="font-size:12px;color:var(--text-muted)">არ არის</p>'}</div>
<div class="pd-section"><h4>შენიშვნები</h4>${notes.length?notes.map(n=>`<div class="note-card">${n.text}<div class="note-date">${n.date}</div></div>`).join(''):'<p style="font-size:12px;color:var(--text-muted)">არ არის</p>'}</div>`;
openModal('playerDetailModal');
}

// ===== COACHES =====
function renderCoaches(){
document.getElementById('coachesGrid').innerHTML=data.coaches.map(c=>{const pc=data.practices.filter(p=>p.coachId===c.id).length;const ts=[...new Set(data.practices.filter(p=>p.coachId===c.id).map(p=>tn(p.teamId)))];const ini=c.name.split(' ').map(w=>w[0]).join('');
return`<div class="coach-card"><div class="coach-avatar">${ini}</div><div class="coach-info"><h4>${c.name}</h4><div class="coach-meta">${c.specialty} • ${c.phone||'-'} • ${c.salary}₾/თვე</div><div class="coach-meta">კვირაში: <strong>${pc}</strong> ღონისძ.</div><div class="coach-teams">${ts.map(t=>`<span class="badge badge-info">${t}</span>`).join('')}</div></div></div>`;}).join('')||'<div class="empty-state">ცარიელია</div>';
}

// ===== SCHEDULE =====
function renderSchedule(){
const cs={};data.practices.forEach(p=>{const n=cn(p.coachId);cs[n]=(cs[n]||0)+1;});
document.getElementById('coachesList').innerHTML=Object.keys(cs).length?Object.entries(cs).map(([n,c])=>`<li class="workload-item"><span class="workload-name">${n}</span><span class="badge badge-info">${c} ღონისძ.</span></li>`).join(''):'<li class="empty-state">ცარიელია</li>';
const dO=['ორშაბათი','სამშაბათი','ოთხშაბათი','ხუთშაბათი','პარასკევი','შაბათი','კვირა'];const dm={};data.practices.forEach(p=>{if(!dm[p.day])dm[p.day]=[];dm[p.day].push(p);});
document.getElementById('scheduleList').innerHTML=data.practices.length?dO.filter(d=>dm[d]).map(d=>{dm[d].sort((a,b)=>a.time.localeCompare(b.time));return`<div class="day-card"><h4>${d}</h4>${dm[d].map(p=>`<div class="practice-item"><span class="time">${p.time}</span><span class="team">${tn(p.teamId)} <span class="badge badge-${p.type==='თამაში'?'match':p.type==='ამხანაგური'?'friendly':'practice'}">${p.type}</span></span><span class="coach"><i class="fa-solid fa-user-tie"></i> ${cn(p.coachId)}</span></div>`).join('')}</div>`;}).join(''):'<div class="empty-state">ცარიელია</div>';
}

// ===== MATCHES =====
function renderMatches(){
document.getElementById('matchesList').innerHTML=data.matches.length?data.matches.map(m=>{const rc=m.result==='მოგება'?'badge-success':m.result==='წაგება'?'badge-danger':'badge-warning';
return`<div class="match-card"><div class="match-teams"><div class="match-team"><div class="match-team-name">${tn(m.teamId)}</div></div><div class="match-score">${m.score}</div><div class="match-team"><div class="match-team-name">${m.opponent}</div></div></div><div class="match-meta"><span class="badge ${rc}">${m.result}</span><div class="match-type"><span class="badge badge-${m.type==='თამაში'?'match':'friendly'}">${m.type}</span></div><div style="margin-top:4px;font-size:11px">${m.date}</div>${m.scorers.length?`<div style="margin-top:4px;font-size:11px;color:var(--text-muted)">⚽ ${m.scorers.join(', ')}</div>`:''}</div></div>`;}).join(''):'<div class="empty-state">მატჩები არ არის</div>';
}

// ===== ATTENDANCE =====
function renderAttendance(){
let tot=0,pr=0,ab=0,la=0;data.attendance.forEach(a=>Object.values(a.records).forEach(s=>{tot++;if(s==='present')pr++;else if(s==='absent')ab++;else la++;}));
const pct=tot?Math.round((pr+la)/tot*100):0;
document.getElementById('attendanceSummary').innerHTML=`<div class="att-stat"><h4>ჩანაწერი</h4><p>${data.attendance.length}</p></div><div class="att-stat"><h4>დასწრება</h4><p style="color:#10B981">${pct}%</p></div><div class="att-stat"><h4>არმოსულ.</h4><p style="color:#EF4444">${ab}</p></div><div class="att-stat"><h4>დაგვიანებ.</h4><p style="color:#F59E0B">${la}</p></div>`;
document.getElementById('attendanceList').innerHTML=data.attendance.slice().reverse().map(a=>{const r=Object.entries(a.records);return`<tr><td>${a.date}</td><td>${a.event}</td><td>${tn(a.teamId)}</td><td><span class="badge badge-success">${r.filter(([,s])=>s==='present'||s==='late').length}</span></td><td><span class="badge badge-danger">${r.filter(([,s])=>s==='absent').length}</span></td></tr>`;}).join('')||'<tr><td colspan="5" class="empty-state">ცარიელია</td></tr>';
}

// ===== FINANCES =====
function renderFinances(){
const tc=data.payments.reduce((s,p)=>s+p.amount,0);const sal=data.coaches.reduce((s,c)=>s+c.salary,0);const up=data.players.filter(p=>!p.hasPaidFee).length;
const exp=data.players.reduce((s,p)=>{const t=data.teams.find(x=>x.id===p.teamId);return s+(t?t.monthlyFee:0);},0);
document.getElementById('financeStats').innerHTML=`<div class="fin-card"><h4>შეგროვებული</h4><p class="positive">${tc}₾</p></div><div class="fin-card"><h4>მოსალოდნელი/თვე</h4><p>${exp}₾</p></div><div class="fin-card"><h4>ხელფასები/თვე</h4><p class="negative">${sal}₾</p></div><div class="fin-card"><h4>გადაუხდელი</h4><p class="negative">${up} მოთამაშე</p></div>`;
document.getElementById('paymentsList').innerHTML=data.payments.slice().reverse().map(p=>`<tr><td>${p.date}</td><td>${pn(p.playerId)}</td><td>${tn((data.players.find(x=>x.id===p.playerId)||{}).teamId)}</td><td style="font-weight:600">${p.amount}₾</td><td>${p.month}</td></tr>`).join('')||'<tr><td colspan="5" class="empty-state">ცარიელია</td></tr>';
}

// ===== CALENDAR =====
function renderCalendar(){
const d=currentCalendarDate,y=d.getFullYear(),m=d.getMonth();
const mn=['იანვარი','თებერვალი','მარტი','აპრილი','მაისი','ივნისი','ივლისი','აგვისტო','სექტემბერი','ოქტომბერი','ნოემბერი','დეკემბერი'];
document.getElementById('calendarMonth').textContent=`${mn[m]} ${y}`;
const dn=['ორშ','სამ','ოთხ','ხუთ','პარ','შაბ','კვი'];const dG=['ორშაბათი','სამშაბათი','ოთხშაბათი','ხუთშაბათი','პარასკევი','შაბათი','კვირა'];
let s=new Date(y,m,1).getDay()-1;if(s<0)s=6;const dim=new Date(y,m+1,0).getDate();const pmd=new Date(y,m,0).getDate();const today=new Date();
const pd={};data.practices.forEach(p=>{const i=dG.indexOf(p.day);if(i>=0){if(!pd[i])pd[i]=[];pd[i].push(p);}});
let h=dn.map(x=>`<div class="cal-header">${x}</div>`).join('');
for(let i=s-1;i>=0;i--)h+=`<div class="cal-day other-month"><div class="cal-day-num">${pmd-i}</div></div>`;
for(let x=1;x<=dim;x++){const dt=new Date(y,m,x);let dw=dt.getDay()-1;if(dw<0)dw=6;const it=dt.toDateString()===today.toDateString();const ev=pd[dw]||[];
h+=`<div class="cal-day${it?' today':''}"><div class="cal-day-num">${x}</div>${ev.map(e=>`<div class="cal-event ${e.type==='თამაში'?'match':e.type==='ამხანაგური'?'friendly':'practice'}">${e.time} ${(data.teams.find(t=>t.id===e.teamId)||{}).ageCategory||''}</div>`).join('')}</div>`;}
const tc=s+dim;const rem=tc%7===0?0:7-tc%7;for(let i=1;i<=rem;i++)h+=`<div class="cal-day other-month"><div class="cal-day-num">${i}</div></div>`;
document.getElementById('calendarGrid').innerHTML=h;
}
function changeMonth(d){currentCalendarDate.setMonth(currentCalendarDate.getMonth()+d);renderCalendar();}

// ===== TRANSFERS =====
function renderTransfers(){
document.getElementById('transfersList').innerHTML=data.transfers.length?data.transfers.slice().reverse().map(t=>`<tr><td>${t.date}</td><td style="font-weight:500">${pn(t.playerId)}</td><td>${tn(t.fromTeamId)}</td><td>${tn(t.toTeamId)}</td><td>${t.reason}</td><td><span class="badge badge-success">${t.status}</span></td></tr>`).join(''):'<tr><td colspan="6" class="empty-state">ტრანსფერები არ არის</td></tr>';
}

// ===== DOCUMENTS =====
function generateDocument(type){
document.getElementById('docPreview').style.display='block';
const p=data.players[0];const t=data.teams.find(x=>x.id===p.teamId);const today=new Date().toISOString().split('T')[0];
let html='<div class="doc-logo"><i class="fa-solid fa-futbol"></i> დინამო ბათუმი</div>';
if(type==='enrollment')html+=`<h2>ჩარიცხვის ცნობა</h2><p>მოწმდება, რომ <span class="doc-field">${p.name}</span> ჩარიცხულია საფეხბურთო სკოლა <span class="doc-field">დინამო ბათუმის</span> <span class="doc-field">${t?t.ageCategory:''}</span> გუნდში.</p><p>ფეხბურთელის ნომერი: <span class="doc-field">${p.number||''}</span></p><p>პოზიცია: <span class="doc-field">${p.position||''}</span></p><p>დაბადების თარიღი: <span class="doc-field">${p.birthDate||''}</span></p><br><p>ცნობა გაცემულია: <span class="doc-field">${today}</span></p><div class="doc-stamp">ხელმოწერა: _________________<br>ბეჭედი</div>`;
else if(type==='medical')html+=`<h2>სამედიცინო ცნობა</h2><p>ფეხბურთელი: <span class="doc-field">${p.name}</span></p><p>გუნდი: <span class="doc-field">${t?t.name:''}</span></p><p>დაბადების თარიღი: <span class="doc-field">${p.birthDate||''}</span></p><br><p>ჯანმრთელობის მდგომარეობა: <span class="doc-field">_________________________</span></p><p>დიაგნოზი: <span class="doc-field">_________________________</span></p><p>რეკომენდაცია: <span class="doc-field">_________________________</span></p><br><p>ექიმის ხელმოწერა: _________________</p><p>თარიღი: <span class="doc-field">${today}</span></p>`;
else if(type==='transfer_cert')html+=`<h2>ტრანსფერის ცნობა</h2><p>მოწმდება, რომ ფეხბურთელი <span class="doc-field">_______________</span></p><p>გადაყვანილია გუნდიდან <span class="doc-field">_______________</span></p><p>გუნდში <span class="doc-field">_______________</span></p><p>მიზეზი: <span class="doc-field">_______________</span></p><br><p>თარიღი: <span class="doc-field">${today}</span></p><div class="doc-stamp">ხელმოწერა: _________________<br>ბეჭედი</div>`;
else if(type==='payment_cert')html+=`<h2>გადახდის ქვითარი</h2><p>მოწმდება, რომ <span class="doc-field">${p.name}</span></p><p>გადახდილი აქვს საწევრო თანხა: <span class="doc-field">${t?t.monthlyFee:''} ₾</span></p><p>თვე: <span class="doc-field">_______________</span></p><p>თარიღი: <span class="doc-field">${today}</span></p><div class="doc-stamp">მიმღები: _________________</div>`;
else if(type==='roster'){const ps=data.players.filter(x=>x.teamId===data.teams[0].id);html+=`<h2>გუნდის სია — ${data.teams[0].name}</h2><table style="width:100%;border-collapse:collapse;margin-top:16px"><tr style="border-bottom:2px solid #333"><th style="text-align:left;padding:6px">#</th><th style="text-align:left;padding:6px">სახელი გვარი</th><th style="text-align:left;padding:6px">პოზიცია</th><th style="text-align:left;padding:6px">დაბ. თარიღი</th></tr>${ps.map(x=>`<tr style="border-bottom:1px solid #ddd"><td style="padding:6px">${x.number||'-'}</td><td style="padding:6px">${x.name}</td><td style="padding:6px">${x.position||'-'}</td><td style="padding:6px">${x.birthDate||'-'}</td></tr>`).join('')}</table><p style="margin-top:16px">თარიღი: ${today}</p>`;}
else if(type==='parent_consent')html+=`<h2>მშობლის / მეურვის თანხმობა</h2><p>მე, <span class="doc-field">_______________</span> (მშობელი/მეურვე)</p><p>ვეთანხმები, რომ ჩემი შვილი <span class="doc-field">_______________</span></p><p>დაესწროს საფეხბურთო სკოლა <span class="doc-field">დინამო ბათუმის</span> ვარჯიშებსა და მატჩებს.</p><br><p>ვადასტურებ, რომ ჩემი შვილი ჯანმრთელია და არ აქვს მატჩებში/ვარჯიშებში მონაწილეობის უკუჩვენება.</p><br><p>მშობლის ხელმოწერა: _________________</p><p>თარიღი: <span class="doc-field">${today}</span></p>`;
document.getElementById('docPaper').innerHTML=html;
}
function printDocument(){window.print();}

// ===== RATINGS =====
function switchRatingTab(btn,tab){document.querySelectorAll('.rating-tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
document.querySelectorAll('.rating-content').forEach(c=>{c.style.display='none';c.classList.remove('active');});
const el=document.getElementById(tab==='leaderboard'?'ratingsLeaderboard':'ratingsCompare');el.style.display='block';el.classList.add('active');
if(tab==='compare')renderComparison();}

function renderRatings(){
const sorted=[...data.players].sort((a,b)=>avgSkill(b)-avgSkill(a));
document.getElementById('ratingsLeaderboard').innerHTML=sorted.map((p,i)=>{const rc=i===0?'gold':i===1?'silver':i===2?'bronze':'';const sk=avgSkill(p);const stars=Math.round(sk/20);
return`<div class="lb-row"><div class="lb-rank ${rc}">${i+1}</div><div class="lb-info"><div class="lb-name">${p.name}</div><div class="lb-team">${tn(p.teamId)} • ${p.position||'-'}</div></div><div class="lb-stars">${'★'.repeat(stars)}${'☆'.repeat(5-stars)}</div><div class="lb-rating">${sk}</div></div>`;}).join('');
}

function renderComparison(){
const s1=document.getElementById('comparePlayer1');const s2=document.getElementById('comparePlayer2');if(!s1||!s2||!s1.value||!s2.value)return;
const p1=data.players.find(p=>p.id===s1.value),p2=data.players.find(p=>p.id===s2.value);
if(!p1||!p2||!p1.skills||!p2.skills){document.getElementById('comparisonResult').innerHTML='<p class="empty-state">აირჩიეთ ორი მოთამაშე</p>';return;}
document.getElementById('comparisonResult').innerHTML=`<div style="display:flex;justify-content:space-between;margin-bottom:16px"><div style="text-align:center"><strong>${p1.name}</strong><br><span style="font-size:24px;font-weight:800;color:var(--primary)">${avgSkill(p1)}</span></div><div style="text-align:center"><strong>${p2.name}</strong><br><span style="font-size:24px;font-weight:800;color:var(--secondary)">${avgSkill(p2)}</span></div></div>${Object.keys(p1.skills).map(k=>{const v1=p1.skills[k],v2=p2.skills[k];return`<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px"><span style="font-weight:600;color:${v1>=v2?'var(--primary)':'var(--text-muted)'}">${v1}</span><span>${k.replace('_',' ')}</span><span style="font-weight:600;color:${v2>=v1?'var(--secondary)':'var(--text-muted)'}">${v2}</span></div><div style="display:flex;gap:4px;height:6px"><div style="flex:1;display:flex;justify-content:flex-end"><div style="width:${v1}%;background:var(--primary);border-radius:3px"></div></div><div style="flex:1"><div style="width:${v2}%;background:var(--secondary);border-radius:3px"></div></div></div></div>`;}).join('')}`;
}

// ===== MESSAGES =====
function selectMsgTemplate(type){
document.getElementById('msgCompose').style.display='block';
const titles={'fee_reminder':'საწევრო შეხსენება','schedule_change':'განრიგის ცვლილება','match_invite':'თამაშის მოწვევა','general':'ზოგადი განცხადება'};
document.getElementById('msgComposeTitle').textContent=titles[type]||'შეტყობინება';
const templates={'fee_reminder':'ძვირფასო მშობელო, შეგახსენებთ რომ საწევრო თანხის გადახდის ვადა ახლოვდება. გთხოვთ დროულად განახორციელოთ გადახდა.','schedule_change':'ძვირფასო მშობელო, გაცნობებთ რომ ვარჯიშის განრიგი შეიცვალა. ახალი დეტალები იხილეთ ქვემოთ.','match_invite':'ძვირფასო მშობელო, გიწვევთ თქვენი შვილის მატჩზე! ','general':''};
document.getElementById('msgText').value=templates[type]||'';
document.getElementById('msgPreviewBox').textContent=templates[type]||'ჩაწერეთ ტექსტი...';
document.getElementById('msgText').addEventListener('input',function(){document.getElementById('msgPreviewBox').textContent=this.value||'ჩაწერეთ ტექსტი...';});
}
function sendMessage(){const text=document.getElementById('msgText').value;if(!text)return;
data.messages.push({id:Date.now().toString(),recipient:document.getElementById('msgRecipient').selectedOptions[0].text,text:text,date:new Date().toISOString().split('T')[0]});
document.getElementById('msgCompose').style.display='none';document.getElementById('msgText').value='';renderMessages();alert('შეტყობინება გაიგზავნა! (სიმულაცია)');}
function renderMessages(){
document.getElementById('sentMessages').innerHTML=data.messages.length?data.messages.slice().reverse().map(m=>`<div class="sent-msg"><div class="sent-msg-text"><strong>${m.recipient}</strong><br>${m.text}</div><div class="sent-msg-date">${m.date}</div></div>`).join(''):'<div class="empty-state">შეტყობინებები არ არის</div>';
}
