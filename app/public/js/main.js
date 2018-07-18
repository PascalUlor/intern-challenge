let backdrop = document.querySelector('.backdrop');
let modal = document.querySelector('.modal');
let editProfile = document.querySelector('.editText');
let modalNoButton = document.querySelector('.modal__action--negative');
let modalEdit = document.querySelector('.action');
let modalButton = document.querySelector('.modal__action');
let info = document.querySelector('.info');
let formSubmit = document.querySelector('.submit_button')



setTimeout(() => {
  let popup = document.querySelectorAll('.edit');

  for (let i = 0; i < popup.length; i++) {
    
    popup[i].addEventListener('click', (evt) =>{
      evt.preventDefault();
        let modalId = document.querySelector('#modalId');
        let modalName = document.querySelector('.modalName');
        let modalAge = document.querySelector('.modalAge');
        let modalPro = document.querySelector('.modalPro');
        let modalImage = document.querySelector('.modalImage');
        console.log('working');
        modal.classList.add('open');
        backdrop.classList.add('open');
        
          
        modalId.innerHTML = document.querySelector(`#id${i}`).innerHTML;
        modalName.innerHTML = document.querySelector(`#name${i}`).innerHTML;
        modalAge.innerHTML = document.querySelector(`#userAge${i}`).innerHTML;
        modalPro.innerHTML = document.querySelector(`#userProfile${i}`).innerHTML;
        modalImage.innerHTML = document.querySelector(`#image${i}`).innerHTML;
    });
}
  }, 5000);




if (modalEdit) {
  modalEdit.addEventListener('click', editModal);
}

function editModal() {
  editProfile.classList.add('open');
  backdrop.classList.add('open')
  info.classList.add('close');
  modalButton.classList.add('close');
  modalNoButton.classList.add('close');
}


if (modalNoButton) {
    modalNoButton.addEventListener('click', closeModal);
}

function closeModal() {
   
    if (modal) {
        modal.classList.remove('open');
    }
    backdrop.classList.remove('open');
}


  if (formSubmit) {
    formSubmit.addEventListener('onsubmit', displayEdit);
  }
  
  function displayEdit() {
    modalEdit.removeEventListener();
    modalNoButton.removeEventListener();
    formSubmit.removeEventListener();
    modal.classList.add('open');
    backdrop.classList.add('open');
  }
