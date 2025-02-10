//EXTRA FUNCTIONS
// calculate days hours minutes
const calculateTime = (time) =>{
//    console.log(time)
   const hours = parseInt(time/3600)
   let remainingTime = time%3600

   const minutes = parseInt(remainingTime/60)
   remainingTime = remainingTime%60

   return `${hours}h ${minutes}m ${remainingTime}s`
}
//button color changing
function addButtonFunctionality(id){
    const allBtn  = document.getElementsByClassName('all-button')
    // console.log(allBtn)-->> HTML collection. etar opor forEach() kaj korbe na.
    for(const btn of allBtn){
        btn.classList.remove('active')
    }
    document.getElementById('all-btn').classList.remove('active')



    document.getElementById(id).classList.add('active')
}


//show Modal Now-->> details
async function showModalNow(id){
    const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
    const data = await response.json();
    
    const modal = document.getElementById('my_modal')

    const modalDetail = document.getElementById('detail-of-modal')
    modalDetail.innerHTML= ``

    const div = document.createElement('div')
    div.innerHTML= `
    <div>
    <div class="h-[300px]">
      <img class="h-full w-full object-cover" src="${data.video.thumbnail}"/>
    </div>
    <h1 class="text-black font-bold text-2xl py-3">${data.video.title}</h1>
    <p>${data.video.description}</p>
    <div>

    `
    modalDetail.appendChild(div)

    modal.showModal();
}


//card category -->> displaying category wise
async function cardCategoryDisplay(category_id){
    addButtonFunctionality(`btn-${category_id}`)

    //fetch category api according to data.category_id
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${category_id}`)
    const data = await res.json()
    
    
    displayCardFromApi(data.category)
}







//load categories from api
const loadAllVideoCategories = ()=>{
   fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
   .then(response => response.json())
   .then(data => displayAllVideoCategories(data.categories))
}






//adding button based on api
const displayAllVideoCategories = (data)=>{
    // console.log(data)

    const categoryButton = document.getElementById('category-button')
    

    data.forEach(item =>{
    //calling cardCategoryDisplay(item.category_id) onclick function for adding functionality to card category
   console.log(item.category_id)
    const div = document.createElement('div')
    div.innerHTML= `
    <button id="btn-${item.category_id}" onclick="cardCategoryDisplay(${item.category_id})"class="btn p-3 all-button">${item.category}</button>
    `

    categoryButton.appendChild(div)
    })
}





//load cards from api
const loadCardFromApi =async()=>{
    const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    const data = await response.json()

    displayCardFromApi(data.videos)
}




//modify card based on api
const displayCardFromApi=(cards)=>{
    
    const cardsContainer = document.getElementById('cards-container')
    cardsContainer.innerHTML= ``

    if(cards.length===0){
        cardsContainer.classList.remove('grid')

        cardsContainer.innerHTML=`
        <div class="flex flex-col py-12">
        <img class="mx-auto" src="images/Icon.png" />
        <p class="text-center">No Video Found</p>
        </div>
        ` 
        return;
    }
    else{
        cardsContainer.classList.add('grid')
    }
    cards.forEach(card =>{
        // console.log(card)
        const div = document.createElement('div')
        div.innerHTML=`
        <div class="card card-compact">
        <figure class="h-[200px] relative">
        <img
        src="${card.thumbnail}" class="h-full w-full object-cover"/>

        ${
            card.others.posted_date === "" ?"" : `<span class="px-3 p-1 absolute right-2 bottom-2 bg-zinc-900 rounded-md text-white">
            ${calculateTime(card.others.posted_date)}
            </span>`
        }
        </figure>
        <div class="flex gap-2 items-center">
        <div class="h-10 w-10">
          <img src="${card.authors[0].profile_picture}" class="h-full w-full object-cover rounded-full"/>
        </div>
        <div>
        <h2 class="card-title">${card.title}</h2>
        <p>${card.authors[0].profile_name}</p>
        </div>
        </div>
        </div>


        <button onclick=showModalNow('${card.video_id}') class="btn btn-error mt-3 mb-6 text-white">Details</button>
        `

        cardsContainer.appendChild(div)
    })
}





loadAllVideoCategories();
loadCardFromApi();