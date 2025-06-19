const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000';

async function testAPI() {
  console.log('🧪 Тестирование API...\n');

  try {
    // 1. Получить все задачи (изначально пусто)
    console.log('1. Получение всех задач:');
    const tasks = await axios.get(`${API_BASE_URL}/tasks`);
    console.log('   Результат:', tasks.data);
    console.log('   Количество задач:', tasks.data.length, '\n');

    // 2. Создать первую задачу
    console.log('2. Создание первой задачи:');
    const task1 = await axios.post(`${API_BASE_URL}/tasks`, {
      title: 'Изучить React',
      description: 'Изучить основы React и Material-UI',
      status: 'in progress'
    });
    console.log('   Создана задача:', task1.data, '\n');

    // 3. Создать вторую задачу
    console.log('3. Создание второй задачи:');
    const task2 = await axios.post(`${API_BASE_URL}/tasks`, {
      title: 'Создать API',
      description: 'Разработать RESTful API на Express.js',
      status: 'completed'
    });
    console.log('   Создана задача:', task2.data, '\n');

    // 4. Получить все задачи (теперь должно быть 2)
    console.log('4. Получение всех задач после создания:');
    const allTasks = await axios.get(`${API_BASE_URL}/tasks`);
    console.log('   Результат:', allTasks.data);
    console.log('   Количество задач:', allTasks.data.length, '\n');

    // 5. Получить одну задачу по ID
    console.log('5. Получение задачи по ID:');
    const singleTask = await axios.get(`${API_BASE_URL}/tasks/${task1.data.id}`);
    console.log('   Задача:', singleTask.data, '\n');

    // 6. Обновить задачу
    console.log('6. Обновление задачи:');
    const updatedTask = await axios.put(`${API_BASE_URL}/tasks/${task1.data.id}`, {
      title: 'Изучить React (обновлено)',
      description: 'Изучить основы React и Material-UI - в процессе',
      status: 'completed'
    });
    console.log('   Обновленная задача:', updatedTask.data, '\n');

    // 7. Получить все задачи после обновления
    console.log('7. Получение всех задач после обновления:');
    const finalTasks = await axios.get(`${API_BASE_URL}/tasks`);
    console.log('   Результат:', finalTasks.data);
    console.log('   Количество задач:', finalTasks.data.length, '\n');

    // 8. Удалить задачу
    console.log('8. Удаление задачи:');
    await axios.delete(`${API_BASE_URL}/tasks/${task2.data.id}`);
    console.log('   Задача удалена\n');

    // 9. Финальная проверка
    console.log('9. Финальная проверка:');
    const finalCheck = await axios.get(`${API_BASE_URL}/tasks`);
    console.log('   Оставшиеся задачи:', finalCheck.data);
    console.log('   Количество задач:', finalCheck.data.length, '\n');

    console.log('✅ Все тесты прошли успешно!');

  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error.message);
    if (error.response) {
      console.error('   Статус:', error.response.status);
      console.error('   Данные:', error.response.data);
    }
  }
}

// Запуск тестов
testAPI(); 