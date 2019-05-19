let currentPage = 1
document.addEventListener('DOMContentLoaded', function(){
  loadMonsters(currentPage)

  let monsterForm = document.getElementById('monster-form')
  monsterForm.addEventListener('submit', createMonster)

})

//on page load, make a get fetch to load the first 50 monsters and show name, age, and description for each
function loadMonsters(num){

  fetch(`http://localhost:3000/monsters?_limit=50&_page=${num}`)
  .then(res => res.json())
  .then(monsterArray =>
        monsterArray.forEach(monster => displayMonsters(monster))
 )
}

function displayMonsters(monster){

  //find monster container and set to a variable
  let monsterContainer = document.getElementById('monster-container')

  //create div for each individual monster
  let monsterDiv = document.createElement('div')
  monsterDiv.id = 'md-id'

  //create h2 for monster name and associate name
  let nameElement = document.createElement('h2')
  nameElement.id = 'name-id'
  nameElement.innerText = monster.name

  //create h4 for monster age and associate age
  let ageElement = document.createElement('h4')
  ageElement.id = 'age-id'
  ageElement.innerHTML = `Age: ${monster.age}`

  //create p for bio and associate bio
  let bioElement = document.createElement('p')
  bioElement.id = 'bio-id'
  bioElement.innerHTML = `Bio: ${monster.description}`

  //append h2, h4, and p to individual monster div
  monsterDiv.append(nameElement, ageElement, bioElement)

  //append individual monster div to monster container
  monsterContainer.append(monsterDiv)
}

//When submit button is clicked, a post fetch is
// made and the monster is saved to the db
function createMonster(event){
  debugger
  event.preventDefault()

//make fetch post
  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      name: monster.name,
      age: monster.age,
      bio: monster.description,
    // })
  })

//when forward button is clicked, make a get fetch
//then load the next 50 monsters


let forwardBtn = document.getElementById('forward')
let backBtn = document.getElementById('back')

forwardBtn.addEventListener('click', nextPage)
backBtn.addEventListener('click', previousPage)

function nextPage(){
  currentPage++

  let monsterContainer = document.getElementById('monster-container')
  monsterContainer.innerHTML = ''

  loadMonsters(currentPage)

}

function previousPage(){
  // error check for trying to go to negative page
 if (currentPage === 1){
   alert("you have already reached the beginning of the list")
   return
 }
 //update currentPage
 currentPage--

 // clear DOM of current 50
 let monstersContainer = document.getElementById("monster-container");
 monstersContainer.innerHTML = ""
 // fetch the correct page
 loadMonsters(currentPage)
}
}
