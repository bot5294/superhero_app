const id = location.search.substring(1);
let ts = + new Date();
let pub = "be5d12f9f9e02d3103482450d7907ffe";
let priv = "";
let token = ts+pub;
token = CryptoJS.MD5(token).toString();
let request = new XMLHttpRequest();
let url = `https://gateway.marvel.com:443/v1/public/characters/`+id+`?ts=`+ts+`&apikey=`+pub+`&hash=`+token;
request.open(`GET`,url);
request.send();
request.onload = () =>{
if(request.status === 200){
    let res = JSON.parse(request.response);
    let data = res.data;
    let arr = data.results;
    let doc = document;
    let img = doc.getElementById('s-img');
    img.src=arr[0].thumbnail.path+"."+arr[0].thumbnail.extension;
    let p = doc.getElementById('s-desc');
    p.innerText=arr[0].description;
    let h1 = doc.getElementById('s-title');
    h1.innerText= arr[0].name;
    // adding comics
    let comics = doc.getElementById('s-comics');
    comics.innerText="Comics Availabe : "+arr[0].comics.available;
    let cList = doc.getElementById('s-comics-list');
    for(let i=0;i<arr[0].comics.items.length;i++){
        let li = doc.createElement('li');
        li.innerText="➪ "+arr[0].comics.items[i].name;
        cList.appendChild(li);
    }
    // adding series
    let series = doc.getElementById('s-series');
    series.innerText="Series Availabe : "+arr[0].series.available;
    let sList = doc.getElementById('s-series-list');
    for(let i=0;i<arr[0].series.items.length;i++){
        let li = doc.createElement('li');
        li.innerText="➽ "+arr[0].series.items[i].name;
        sList.appendChild(li);
    }
    // adding stories
    let stList = doc.getElementById('s-stories');
    for(let i=0;i<arr[0].stories.items.length;i++){
        let div = doc.createElement('div');
        div.classList.add('col-2')
        div.innerHTML="⇒ "+arr[0].stories.items[i].name;
        stList.appendChild(div);
    }
}else{
    console.log(`error ${request.status} ${request.statusText}`)
}
}