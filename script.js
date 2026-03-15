// FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDl33Hku2reyOzIQ5OiXwjKXuelXjtMa40",
  authDomain: "thr-2026-358f2.firebaseapp.com",
  databaseURL: "https://thr-2026-358f2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thr-2026-358f2",
  storageBucket: "thr-2026-358f2.firebasestorage.app",
  messagingSenderId: "746679509287",
  appId: "1:746679509287:web:16fc31d20c92f9d5164902"
};

// INIT FIREBASE
firebase.initializeApp(firebaseConfig)

const db = firebase.database()

const endDate = new Date("2026-03-21")

function normalize(name){
return name.toLowerCase().replace(/[^a-z]/g,"")
}

// REALTIME WINNER LIST
db.ref("winners").on("value",(snapshot)=>{

let data=snapshot.val()

let list=document.getElementById("winnerList")

list.innerHTML=""

if(!data) return

for(let id in data){

let row=document.createElement("tr")

row.innerHTML="<td>"+data[id].name+"</td><td>"+data[id].prize+"</td>"

list.appendChild(row)

}

})

let spinData={}

function getResult(name){

let n=normalize(name)

if(!spinData[n]){

let reward

if(n.includes("zaki")){
reward="400K"
}

else if(n.includes("aisah")){
reward="250K"
}

else{

let chance=Math.random()
reward=chance<0.7?"100K":"150K"

}

let zonkSpin=Math.floor(Math.random()*2)

spinData[n]={
spin:0,
reward:reward,
zonkSpin:zonkSpin
}

}

if(spinData[n].spin>=2){
return "LIMIT"
}

let result

if(spinData[n].spin===spinData[n].zonkSpin){
result="ZONK"
}else{
result=spinData[n].reward
}

spinData[n].spin++

return result
}

function openBox(box){

let name=document.getElementById("playerName").value

if(!name){
alert("Masukkan nama dulu")
return
}

if(new Date()>endDate){
alert("Event sudah berakhir")
return
}

let prize=getResult(name)

if(prize==="LIMIT"){

document.getElementById("result").innerText="Kesempatan sudah habis (2x)"
return

}

box.classList.add("open")

setTimeout(()=>{

box.classList.remove("open")

},400)

let result=document.getElementById("result")
let greeting=document.getElementById("greeting")

result.classList.remove("show")

setTimeout(()=>{

result.innerText="Hasil: "+prize
result.classList.add("show")

if(prize==="ZONK"){

result.className="zonk show"
greeting.innerText=""

}else{

result.className="win show"

greeting.innerText="Kami keluarga di perantauan mengucapkan Selamat Hari Raya Idul Fitri. Mohon Maaf Lahir dan Batin."

}

},300)

if(prize!=="ZONK"){

db.ref("winners").push({
name:name,
prize:prize
})

}

}

// RESET DATABASE
function resetData(){

let code=prompt("Masukkan kode reset")

if(code==="lahLUP00"){

db.ref("winners").remove()

alert("Data berhasil di reset")

}else{

alert("Kode salah")

}

}
