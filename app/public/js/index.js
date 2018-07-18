const baseUrl = 'https://intern-challenge.herokuapp.com';
const userRequest = document.querySelector('#body');
const createRequestForm = document.querySelector('#output');


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
          
          myRequest.innerHTML += `
          
      <section class="request wallpaper">
        <a href="#" class="edit">
        <p class="id" id="id${n}">${id}</p>
        <br>
        <div class="image" id="image${n}"><img src="${photo}" style="width: 150px; height: 150px;"></div>
        <h1 class="name" id="name${n}">${name}</h1><br>
        <small class="age" id="userAge${n}">Age: &nbsp ${age}</small>
        <h2 class="description">Description</h2>
        <p class="info" id="userProfile${n}">${description}</p>
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
if (createRequestForm) {
  createRequestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const description = document.querySelector('.inputText').value;
    const details = document.querySelector('.modalPro');
    const userId = document.querySelector('.modalId').innerHTML;

    fetch(`${baseUrl}/persons/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ description }),
    }).then(res => res.json())
      .then((data) => {
        if (data.status === true) {
          details.innerHTML = `<p class="info modalPro">${data[0].persons[n].description}</p>`;
        } else {
          let output = '<h3>Error<h3/>';
          Object.keys(data).forEach((key) => {
            output += `<p>${data[key]}<p/>`;
          });
          document.querySelector('#request')
            .innerHTML = output;
        }
      }).catch((error) => {
        document.querySelector('#error')
          .innerHTML = `<h2>server error<h2/>
          <h3>${error}<h3/>`;
      });
  });
}



if (userRequest) {
  userRequest.addEventListener('load', getRequest());
}

