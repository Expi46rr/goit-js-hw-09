const form = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};


const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  const parsedData = JSON.parse(savedData);


  form.elements.email.value = parsedData.email ?? '';
  form.elements.message.value = parsedData.message ?? '';


  formData.email = parsedData.email ?? '';
  formData.message = parsedData.message ?? '';
}


form.addEventListener('input', (e) => {
  const name = e.target.name;
  if (name !== 'email' && name !== 'message') return;

  formData[name] = e.target.value; 

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});


form.addEventListener('submit', (e) => {
  e.preventDefault();

 if (formData.email.trim() === '' || formData.message.trim() === '') {
  alert('Fill please all fields');
  return;
}

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';

  form.reset();
});