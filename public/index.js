var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}


var populateList = function(countries){
  var select = document.querySelector('#drop-down');
  countries.forEach(function(country){
    var option = document.createElement('option');
    option.innerText = country.name;
    select.appendChild(option);
  });
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
