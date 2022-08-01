let ts = + new Date();
let pub = "be5d12f9f9e02d3103482450d7907ffe";
let priv = "";
// let token = ts+priv+pub;
// token = CryptoJS.MD5(token).toString();
// console.log(token)
let request = new XMLHttpRequest();
let url = `https://gateway.marvel.com:443/v1/public/characters?apikey=`+pub;
request.open(`GET`,url);
request.send();
request.onload = () =>{
    if(request.status === 200){
        let res = JSON.parse(request.response);
        let data = res.data;
        let arr = data.results;
        let list = document.getElementById('list')
        for(let i=0;i<data.count;i++){
            let div = document.createElement('div');
            div.classList.add('col-md-2');
            div.classList.add('card');
            div.classList.add('m-1');
            let img = document.createElement('img');
            img.src=arr[i].thumbnail.path+"."+arr[i].thumbnail.extension;
            img.classList.add('card-img-top');
            div.appendChild(img);

            let card = document.createElement('div');
            card.classList.add('card-body')
            
            let h5 = document.createElement('h5');
            h5.classList.add('card-title');
            h5.classList.add('text-center');
            h5.innerText=arr[i].name;
            card.appendChild(h5);

            let btn = document.createElement('button');
            btn.classList.add('btn');
            btn.classList.add('btn-sm');
            btn.classList.add('btn-danger');
            btn.innerHTML="Add To Favorites"
            btn.id=arr[i].id;
            btn.onclick=()=>{add2fav(arr[i].id)};
            img.onclick=()=>{window.location.href=`./superhero.html?`+arr[i].id}
            h5.onclick=()=>{window.location.href=`./superhero.html?`+arr[i].id}
            card.appendChild(btn);

            div.appendChild(card);
            list.appendChild(div);
        }
    }else{
        console.log(`error ${request.status} ${request.statusText}`)
    }
    disableBtn();
}

function add2fav(id){
    let fav = localStorage.getItem("favlist");
    if(fav==null){
        fav = [];
        fav[0]=id;
        localStorage.setItem("favlist",JSON.stringify(fav));
    }else{
        fav = JSON.parse(fav);
        fav.push(id);
        localStorage.setItem("favlist",JSON.stringify(fav));
    }
    let btn = document.getElementById(id);
    btn.setAttribute("disabled",true);
}

function disableBtn(){
    let fav = localStorage.getItem("favlist");
        if(fav!=null){
            fav = JSON.parse(fav);
                for(let i=0;i<fav.length;i++){
                        let btn = document.getElementById(fav[i]);
                        if(btn)
                        btn.setAttribute("disabled",true);
                }
        }
}


function searchHeroSearch(){
    let dflag = false;
    document.getElementById('list').innerHTML="";
    let input = document.getElementById('search-input');
    let value = input.value;
    let ts = + new Date();
    let pub = "be5d12f9f9e02d3103482450d7907ffe";
    // let priv = "";
    // let token = ts+pub;
    // token = CryptoJS.MD5(token).toString();
    let request = new XMLHttpRequest();
    let url = `https://gateway.marvel.com:443/v1/public/characters?apikey=`+pub;
    request.open(`GET`,url);
    request.send();
    request.onload = async () =>{
        if(request.status === 200){
            async function createElements(request,value){
                let flag = true;
                let res = JSON.parse(request.response);
                let data = res.data;
                let arr = data.results;
                let list = document.getElementById('list')
                for(let i=0;i<data.count;i++){
                    let str = arr[i].name;
                    if(str.includes(value)){
                        flag=false;
                        let div = document.createElement('div');
                        div.classList.add('col-md-2');
                        div.classList.add('card');
                        div.classList.add('m-1');
                        let img = document.createElement('img');
                        img.src=arr[i].thumbnail.path+"."+arr[i].thumbnail.extension;
                        img.classList.add('card-img-top')
                        div.appendChild(img);

                        let card = document.createElement('div');
                        card.classList.add('card-body')
                        
                        let h5 = document.createElement('h5');
                        h5.classList.add('card-title');
                        h5.classList.add('text-center');
                        h5.innerText=arr[i].name;
                        card.appendChild(h5);

                        let btn = document.createElement('button');
                        btn.classList.add('btn');
                        btn.classList.add('btn-sm');
                        btn.classList.add('btn-danger');
                        btn.innerHTML="Add To Favorites"
                        btn.id=arr[i].id;
                        btn.onclick=()=>{add2fav(arr[i].id)};
                        img.onclick=()=>{window.location.href=`../superhero.html?`+arr[i].id}
                        h5.onclick=()=>{window.location.href=`../superhero.html?`+arr[i].id}
                        card.appendChild(btn);

                        div.appendChild(card);
                        list.appendChild(div);
                    }
                }
                if(flag){
                    document.getElementById('list').innerHTML="No Records found for this Query";
                }
                dflag=flag;
            }
            await createElements(request,value);
            
        }else{
            console.log(`error ${request.status} ${request.statusText}`)
        }
        if(!dflag){
            disableBtn();
        }
    }
}

