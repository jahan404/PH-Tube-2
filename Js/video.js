const loadAllVideoCategories = ()=>{
   fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
   .then(response => response.json())
   .then(data => displayAllVideoCategories(data.categories))
}
const displayAllVideoCategories = (data)=>{
    console.log(data)
    const categoryButton = document.getElementById('category-button')
    
    data.forEach(item =>{
    const div = document.createElement('div')
    div.innerHTML= `
    <button class="btn p-3">${item.category}</button>
    `

    categoryButton.appendChild(div)
    })
}
loadAllVideoCategories();