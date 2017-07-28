import Promise from 'promise-polyfill';

if (!window.Promise) {
  window.Promise = Promise;
}

var form = document.querySelector('form');

let validateResponse = function(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

let readResponseAsJSON = function(response) {
  return response.json();
}

let successHandler = function(result) {
  Materialize.toast('Takk! Við verðum í bandi.', 4000);
  form.reset();
}

let errorHandler = function(error) {
  Materialize.toast('Villa! Sendu okkur bara línu á maul@maul.is og við afgreiðum málið :)', 6000);
  console.log('Looks like there was a problem: \n', error);
}

let getInputValue = function(id) {
  return document.getElementById(id).value;
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let bodyObject = {
    TableName: 'presales-leads',
    Item: {
      company: getInputValue('company_name'),
      zipCode: getInputValue('zip_code'),
      email: getInputValue('email')
    }
  }
  let bodyJSON = JSON.stringify(bodyObject);

  // If Content-Type is text/plain, CORS can be simpler, see more here
  // http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain;charset=UTF-8");

  fetch('https://rbaoh16pa5.execute-api.eu-west-1.amazonaws.com/prod', {
    method: 'POST',
    mode: 'cors',
    headers: myHeaders,
    body: bodyJSON
  })
  .then(validateResponse)
  .then(readResponseAsJSON)
  .then(successHandler)
  .catch(errorHandler);
});
