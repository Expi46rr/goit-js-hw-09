const form = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

// ✅ 1) При завантаженні сторінки: відновлюємо дані
const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  const parsedData = JSON.parse(savedData);

  // заповнюємо поля (без undefined)
  form.elements.email.value = parsedData.email ?? '';
  form.elements.message.value = parsedData.message ?? '';

  // синхронізуємо formData
  formData.email = parsedData.email ?? '';
  formData.message = parsedData.message ?? '';
}

// ✅ 2) Делегування: один слухач input на всю форму
form.addEventListener('input', (e) => {
  const name = e.target.name;
  if (name !== 'email' && name !== 'message') return;

  const value = e.target.value.trim();

  formData[name] = value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// ✅ 3) Submit: перевірка + очищення
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';

  form.reset();
});