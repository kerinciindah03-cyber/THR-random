const endDate=new Date("2026-03-21")

function normalize(name){
return name.toLowerCase().replace(/[^a-z]/g,"")
}

function getSpinData(){
return JSON.parse(localStorage.getItem("thrSpinData")||"{}")
}

function saveSpinData(data){
localStorage.setItem("thrSpinData",JSON.stringify(data))
}

function getResult(name){

let data=getSpinData()
let n=normalize(name)

if(!data[n]){

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

data[n]={
spin:0,
reward:reward,
zonkSpin:zonkSpin
}

}

if(data[n].spin>=2){
return "LIMIT"
}

let result

if(data[n].spin===data[n].zonkSpin){
result="ZONK"
}
else{
result=data[n].reward
}

data[n].spin++

saveSpinData(data)

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

saveWinner(name,prize)

renderWinners()

}

function saveWinner(name,prize){

let winners=JSON.parse(localStorage.getItem("thrWinners")||"[]")

winners.push({name,prize})

localStorage.setItem("thrWinners",JSON.stringify(winners))

}

function renderWinners(){

let winners=JSON.parse(localStorage.getItem("thrWinners")||"[]")

let list=document.getElementById("winnerList")

list.innerHTML=""

winners.forEach(w=>{

let row=document.createElement("tr")

row.innerHTML="<td>"+w.name+"</td><td>"+w.prize+"</td>"

list.appendChild(row)

})

}

function resetData(){

let code=prompt("Masukkan kode reset")

if(code==="lahLUP00"){

localStorage.removeItem("thrWinners")
localStorage.removeItem("thrSpinData")

alert("Data berhasil di reset")

location.reload()

}else{

alert("Kode salah")

}

}

renderWinners()