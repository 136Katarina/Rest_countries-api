var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}


var populateList = function(countries){
  var select = document.querySelector('#drop-down');

  countries.forEach(function(country, index){
    var option = document.createElement('option');
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);
  });

  select.addEventListener('change', function(){
    // var li = document.createElement('li');
    var h3 = document.querySelector('#country');
    h3.innerText = countries[select.value].name;
    var h5 = document.querySelector('#population');
    h5.innerText = "Population: " + countries[select.value].population;
    var p = document.querySelector('#capital');
    p.innerText = "Capital: " + countries[select.value].capital;
    var image = document.querySelector('#flag');
    image.src = countries[select.value].flag;
    image.width = 200;
    // var ul = document.querySelector('#country-list')
    // li.appendChild(h3);
    // li.appendChild(h5);
    // li.appendChild(p);
    // ul.appendChild(li);
    save(countries[select.value]);
  })



}


var save = function(country) {
  var jsonString = JSON.stringify(country);
  localStorage.setItem('country', jsonString);
}


var requestComplete = function(){
  // console.log("Wahey!");
  if(this.status !== 200) {
    return;
  }
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  populateList(countries);
}


var app = function(){

  var url = 'https://restcountries.eu/rest/v2';
  makeRequest(url,requestComplete);

  var jsonString = localStorage.getItem('country');
  var savedCountry = JSON.parse(jsonString);
  if( !savedCountry ) return;

  var h3 = document.querySelector('#country');
  h3.innerText = savedCountry.name;
  var h5 = document.querySelector('#population');
  h5.innerText = "Population: " + savedCountry.population;
  var p = document.querySelector('#capital');
  p.innerText = "Capital: " + savedCountry.capital;
  var image = document.querySelector('#flag');
  image.src = savedCountry.flag;
  image.width = 200;


  // var clickButton = document.getElementById("list");
  // clickButton.addEventListener('click', function(){makeRequest(url, requestComplete)})

}



window.addEventListener('load', app);
