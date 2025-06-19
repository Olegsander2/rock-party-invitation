document.getElementById('rsvpForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');
  const messageEl = document.getElementById('formMessage');
  
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    attendance: formData.get('attendance'),
    plus_one: formData.get('plus_one'),
    message: formData.get('message')
  };
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Отправка...';
  messageEl.style.display = 'none';
  
  try {
    // Добавляем проверку URL
    const scriptUrl = formData.get('google-script-url');
    if (!scriptUrl.includes('https://script.google.com')) {
      throw new Error('Некорректный URL скрипта');
    }
    
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      mode: 'no-cors' // Добавляем этот параметр
    });
    
    // Упрощенная обработка ответа
    messageEl.textContent = 'Спасибо! Ваш ответ сохранён. До встречи на вечеринке! 🤘';
    messageEl.className = 'form-message success';
    form.reset();
    
  } catch (error) {
    messageEl.textContent = `Ошибка: ${error.message}. Попробуйте позже или свяжитесь с организатором.`;
    messageEl.className = 'form-message error';
    console.error('Ошибка отправки:', error);
  } finally {
    messageEl.style.display = 'block';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Отправить';
    messageEl.scrollIntoView({ behavior: 'smooth' });
  }
});