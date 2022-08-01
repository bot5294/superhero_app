// fetching superhero characters
let pub = "be5d12f9f9e02d3103482450d7907ffe";
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
            // creating cards using bootstrap classes
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
            btn.id=arr[i].id; // giving button unique id which is character id
            // fetched from the marvel api
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
    // disableBtn func will disable already added to favorite items add2fav button
    disableBtn();
}

function add2fav(id){
    // fetching favorite's list from localStorage
    let fav = localStorage.getItem("favlist");
    if(fav==null){
        // if null then create new list
        fav = [];
        fav[0]=id;
        localStorage.setItem("favlist",JSON.stringify(fav));
    }else{
        fav = JSON.parse(fav);
        fav.push(id);
        localStorage.setItem("favlist",JSON.stringify(fav));
    }
    // after adding to fav disable the add2fav button
    let btn = document.getElementById(id);
    btn.setAttribute("disabled",true);
}

function disableBtn(){
    let fav = localStorage.getItem("favlist");
        if(fav!=null){
            fav = JSON.parse(fav);
                for(let i=0;i<fav.length;i++){
                    // match the fav btn id from localkStorage and diable it
                        let btn = document.getElementById(fav[i]);
                        if(btn)
                        btn.setAttribute("disabled",true);
                }
        }
}


function searchHeroSearch(){
    // dflag helps in disableBtn execution or not
    let dflag = false;
    document.getElementById('list').innerHTML="";
    let input = document.getElementById('search-input');
    let value = input.value;
    let pub = "be5d12f9f9e02d3103482450d7907ffe";
    let request = new XMLHttpRequest();
    let url = `https://gateway.marvel.com:443/v1/public/characters?apikey=`+pub;
    request.open(`GET`,url);
    request.send();
    request.onload = async () =>{
        if(request.status === 200){
            // making async beacuse api call is taking time
            async function createElements(request,value){
                let flag = true; // flag helps in empy result message display 
                let res = JSON.parse(request.response);
                let data = res.data;
                let arr = data.results;
                let list = document.getElementById('list')
                for(let i=0;i<data.count;i++){
                    let str = arr[i].name;
                    // if search text is in fetched character's name then display
                    // those result otherwise diplay no result found msg
                    if(str.includes(value)){
                        flag=false;
                        // creating cards and appending
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
                        // redirecting with id as url parameter to superhero page
                        // img and name are made clickable
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
            // calling if search produces some results
            disableBtn();
        }
    }
}

