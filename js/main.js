var form = document.querySelector('form');
// TODO Url encode for Icelandic characters?
// No... use FormData object, see https://youtu.be/9Qtvjd0UbAs?t=4m38s

function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function readResponseAsJSON(response) {
  return response.json();
}

function logResult(result) {
  console.log(result);
}

function logError(error) {
  console.log('Looks like there was a problem: \n', error);
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  let formData = new FormData(form);

  fetch('https://rbaoh16pa5.execute-api.eu-west-1.amazonaws.com/prod', {
    method: 'POST',
    body: formData
  })
  .then(validateResponse)
  .then(readResponseAsJSON)
  .then(logResult)
  .catch(logError);

  this.reset();
  Materialize.toast('Takk! Við verðum í bandi.', 4000);
});
