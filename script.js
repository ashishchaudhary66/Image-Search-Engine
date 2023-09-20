const API_KEY="M6IXG6JSnJl-GoUenyE6LPS3pprAJyUXJO9LDnQcw0o";
const searchBar=document.querySelector(".input-search");
const searchBtn=document.querySelector(".btn-search");
const boxResult=document.querySelector(".box");
const searchedImage=document.querySelector(".searched-image");
const showMore=document.querySelector(".show-more");

let query="";
let page=1;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function fetchData(){
    query=searchBar.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${API_KEY}&per_page=12`;
    const response=await fetch(url);
    const data=await response.json();
    const results=data.results;

    setSrcImage(results);
}

searchBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    page=1;
    if(page=1){
        boxResult.innerHTML="";
    }
    fetchData();
});

function setSrcImage(arr){
    // let index=getRandomInt(arr.length);
    // srcImage=arr[index].urls.small;
    // searchedImage.src=srcImage;

    arr.map((result)=>{
        let srcImage=result.urls.small;
        let name=result.user.first_name;
        const container=document.createElement("div");
        container.classList.add("image-title");

        const title=document.createElement("p");
        title.innerHTML=`Photographer : <b></b><i>${name}</i></b>`;
        const image=document.createElement("img");
        image.src=srcImage;
        container.appendChild(image);
        container.appendChild(title);
        boxResult.appendChild(container);
    })
    
    showMore.style.display="block";
}
showMore.addEventListener("click",()=>{
    ++page;
    fetchData();
})

