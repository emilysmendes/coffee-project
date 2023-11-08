"use strict"
// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Felix Felicis', roast: 'light'},
    {id: 2, name: 'Love Potion', roast: 'light'},
    {id: 3, name: 'Revive Elixir', roast: 'light'},
    {id: 4, name: 'Mandrake Restorative Potion', roast: 'medium'},
    {id: 5, name: 'Truth Serum', roast: 'medium'},
    {id: 6, name: 'Wolfsbane', roast: 'medium'},
    {id: 7, name: 'Skele-Gro', roast: 'dark'},
    {id: 8, name: 'Draught of Living Death', roast: 'dark'},
    {id: 9, name: 'Murtlap Essence', roast: 'dark'},
    {id: 10, name: 'Polyjuice Potion', roast: 'dark'},
    {id: 11, name: 'Rat Tonic', roast: 'dark'},
    {id: 12, name: 'Venomous Tentacula Juice', roast: 'dark'},
    {id: 13, name: 'Veritaserum', roast: 'dark'},
    {id: 14, name: 'Wiggenweld Potion', roast: 'dark'},
];

    // to invoke the function ( to save the new coffee)
    (() => {
        let localStorageItem = localStorage.getItem("storedCoffee");
        if(localStorageItem){
           coffees.push(JSON.parse(localStorageItem));
        }
    })()

function renderCoffee(coffee) {
    var html = '<div class="coffee col-3">';
    if (coffee.roast === 'light') {
        html += '<img src="assets/light-unscreen.gif" class="coffee-pic">';
    } else if (coffee.roast === 'medium') {
        html += '<img src="assets/medium-unscreen.gif" class="coffee-pic">';
    } else if (coffee.roast === 'dark') {
        html += '<img src ="assets/dark-unscreen.gif" class="coffee-pic">';
    }
    html += '<h3>' + coffee.name + '</h3>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}


function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// Used to filer the coffees array

function updateCoffees(e) {
    var selectedRoast = roastSelection.value.toLowerCase()
    var nameSelection = searchCoffeeName.value.toLowerCase()
    var filteredCoffees = coffees;
    if (selectedRoast !== 'all') {
        filteredCoffees = filteredCoffees.filter(function(coffee){
            return coffee.roast.toLowerCase() === selectedRoast
        });
    }
    if (nameSelection !== '') {
        filteredCoffees = filteredCoffees.filter(function(coffee){
            return coffee.name.toLowerCase().includes(nameSelection);
        });
    }
    if (filteredCoffees.length === 0 ) {
        body.innerHTML = `<h3>No coffees were found</h3>`
    } else {
        body.innerHTML = renderCoffees(filteredCoffees);
    }
}

// used to add new coffee (does not save after page reload)

function newCoffee (e) {
    const roastSelection = document.querySelector("#roast-selection2").value
    var newCoffee = newCoffeeName.value
    const newCoffeeObj = {
        id: coffees.length + 1,
        name: newCoffee,
        roast: roastSelection
    }
    coffees.push(newCoffeeObj);
    body.innerHTML = renderCoffees(coffees);
    let coffeeJSON = JSON.stringify(newCoffeeObj);
    localStorage.setItem('storedCoffee', coffeeJSON);
}





var body = document.querySelector('#coffees');
var roastSelection = document.querySelector('#roast-selection');
var searchCoffeeName = document.querySelector('#searchCoffeeName');
var addCoffee = document.querySelector('#submitBottomSearch');
var  newCoffeeName = document.querySelector('#searchName');

body.innerHTML = renderCoffees(coffees);

roastSelection.addEventListener('change', updateCoffees);
searchCoffeeName.addEventListener('input', updateCoffees);
addCoffee.addEventListener('click', newCoffee);

