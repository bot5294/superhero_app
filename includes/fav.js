// fetching fav list from localStorage
let fav = localStorage.getItem("favlist");
if(fav!=null){
    fav = JSON.parse(fav);
    for(let i=0;i<fav.length;i++){
        let pub = "be5d12f9f9e02d3103482450d7907ffe";
        let request = new XMLHttpRequest();
        // fetching fav list characters one by one
        let url = `https://gateway.marvel.com:443/v1/public/characters/`+fav[i]+`?apikey=`+pub;
        request.open(`GET`,url);
        request.send();
        request.onload = () =>{
        if(request.status === 200){
            let res = JSON.parse(request.response);
            let data = res.data;
            let arr = data.results;
            let list = document.getElementById('flist')
            for(let i=0;i<data.count;i++){
                // creating and appending cards
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
                btn.innerHTML="Remove Favorite"
                btn.id=arr[i].id;
                btn.onclick=()=>{remove4rmfav(arr[i].id)};
                img.onclick=()=>{window.location.href=`../superhero.html?`+arr[i].id}
                h5.onclick=()=>{window.location.href=`../superhero.html?`+arr[i].id}
                card.appendChild(btn);

                div.appendChild(card);
                list.appendChild(div);
            }
        }else{
            console.log(`error ${request.status} ${request.statusText}`)
        }
        }
    }
}

function remove4rmfav(id){
    let fav = localStorage.getItem("favlist");
    fav = JSON.parse(fav);
    for(let i=0;i<fav.length;i++){
        if(fav[i]==id){
            // using splice method to alter the fav list
            fav.splice(i,1);
            break;
        }
    }
    // updaing the fav list in localStorage
    localStorage.setItem("favlist",JSON.stringify(fav));
    window.alert("Removed from favorites");
    window.location.reload();

}