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
    var li = document.createElement('li');
    var h3 = document.createElement('h3');
    h3.innerText = "Country " + countries[select.value].name;
    var h5 = document.createElement('h5');
    h5.innerText = "Population " + countries[select.value].population;
    var p = document.createElement('p');
    p.innerText = "Capital " + countries[select.value].capital;
    var ul = document.querySelector('#country-list')
    li.appendChild(h3);
    li.appendChild(h5);
    li.appendChild(p);
    ul.appendChild(li);
  })

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


  // var clickButton = document.getElementById("list");
  // clickButton.addEventListener('click', function(){makeRequest(url, requestComplete)})

}



window.addEventListener('load', app);
