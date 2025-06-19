document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    attendance: formData.get('attendance'),
    plus_one: formData.get('plus_one'),
    message: formData.get('message')
  };
  
  try {
    const response = await fetch(formData.get('https://script.google.com/macros/s/AKfycbxKZIr1ULctHBpFIvaSwdpFYGdVg8NCiczdfNnhaRQgrqWYLCDKFGfmYIOcwVzFFBGz/exec'), {
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    alert('Ваш ответ сохранён! Спасибо!');
  } catch (error) {
    alert('Ошибка отправки: ' + error.message);
  }
});