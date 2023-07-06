"use strict"

function renderCoffee(coffee) {
    var html = '<div class="coffee col-3">';
    // html += '<td>' + coffee.id + '</td>';
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
    localStorage.setItem('searchName', JSON.stringify(newCoffeeObj));

}



// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];


var body = document.querySelector('#coffees');
var roastSelection = document.querySelector('#roast-selection');
var searchCoffeeName = document.querySelector('#searchCoffeeName');
var addCoffee = document.querySelector('#submitBottomSearch');
var  newCoffeeName = document.querySelector('#searchName');

body.innerHTML = renderCoffees(coffees);

roastSelection.addEventListener('change', updateCoffees);
searchCoffeeName.addEventListener('input', updateCoffees);
addCoffee.addEventListener('click', newCoffee);

