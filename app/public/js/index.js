const baseUrl = 'https://intern-challenge.herokuapp.com';
const userRequest = document.querySelector('#body');


/*
* Adds an eventListener with a callback to GET all requests for a logged in user
*/
const getRequest = () => {
  fetch(`${baseUrl}/persons`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
  }).then(res => res.json())
    .then((data) => {
      if (data.status === true) {
        
        if (sessionStorage.getItem('requests') === null || sessionStorage.getItem('requests') !== data) {
          const requests = [];
          requests.push(data);
          sessionStorage.setItem('requests', JSON.stringify(requests));
        } else {
          const requests = JSON.parse(sessionStorage.getItem('requests'));
          requests.push(data);
          sessionStorage.setItem('requests', JSON.stringify(requests));
        }

        const userData = JSON.parse(sessionStorage.getItem('requests'));
        const myRequest = document.querySelector('#request');
        console.log(userData);
        console.log(userData[0].persons);

        myRequest.innerHTML = '';
        for (let n = 0; n <= Object.keys(userData[0].persons).length; n += 1) {
          const id = `${userData[0].persons[n].id}`;
          const name = `${userData[0].persons[n].name}`;
          const age = `${userData[0].persons[n].age}`;
          const description = `${userData[0].persons[n].description}`;
          const photo = `${userData[0].persons[n].photo}`;
          myRequest.innerHTML += `<section class="request wallpaper">
        <a href="#">
        <p>${id}</p>
        <br>
        <h1 class="name">${name}</h1>
        <small class="age">${age}</small>
        <div class="image"><img src="${photo}"></div>
        <h2 class="description">Description</h2>
        <p class="info">${description}</p>
        </a>
      </section>`;
        }
      }
    }).catch((error) => {
      document.querySelector('#error')
        .innerHTML = `<h2>server error<h2/>
        <h3>${error}<h3/>`;
    });
};

/*
* Adds an eventListener with a callback to POST user request inputs
*
* @param {object} submitEvent - The submitEvent
*/



if (userRequest) {
  userRequest.addEventListener('load', getRequest());
}

