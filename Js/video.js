//EXTRA FUNCTIONS
// calculate days hours minutes
const calculateTime = (time) =>{
   console.log(time)
   const hours = parseInt(time/3600)
   let remainingTime = time%3600

   const minutes = parseInt(remainingTime/60)
   remainingTime = remainingTime%60

   return `${hours}h ${minutes}m ${remainingTime}s`
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
    const div = document.createElement('div')
    div.innerHTML= `
    <button class="btn p-3">${item.category}</button>
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
        `

        cardsContainer.appendChild(div)
    })
}





loadAllVideoCategories();
loadCardFromApi();