# Express Your Feelings - Backend API

RESTful API для управления задачами, построенный на Node.js и Express.js.

## 🚀 Возможности

- ✅ **CRUD операции** для задач (создание, чтение, обновление, удаление)
- ✅ **RESTful API** с стандартными HTTP методами
- ✅ **CORS поддержка** для фронтенд приложений
- ✅ **In-memory хранилище** данных
- ✅ **Уникальные ID** для каждой задачи
- ✅ **Валидация данных** и обработка ошибок
- ✅ **Тестирование** с Mocha и Supertest

## 🛠 Технологии

- **Node.js** - среда выполнения
- **Express.js** - веб-фреймворк
- **CORS** - middleware для кросс-доменных запросов
- **UID** - генерация уникальных идентификаторов
- **Mocha** - фреймворк для тестирования
- **Supertest** - HTTP assertions для тестирования

## 📋 API Endpoints

### Получить все задачи
```http
GET /tasks
```

**Ответ:**
```json
[
  {
    "id": "unique-id",
    "title": "Название задачи",
    "description": "Описание задачи",
    "status": "pending"
  }
]
```

### Получить задачу по ID
```http
GET /tasks/:id
```

**Ответ:**
```json
{
  "id": "unique-id",
  "title": "Название задачи",
  "description": "Описание задачи",
  "status": "pending"
}
```

### Создать новую задачу
```http
POST /tasks
Content-Type: application/json

{
  "title": "Название задачи",
  "description": "Описание задачи",
  "status": "pending"
}
```

**Ответ (201 Created):**
```json
{
  "id": "generated-unique-id",
  "title": "Название задачи",
  "description": "Описание задачи",
  "status": "pending"
}
```

### Обновить задачу
```http
PUT /tasks/:id
Content-Type: application/json

{
  "title": "Обновленное название",
  "description": "Обновленное описание",
  "status": "completed"
}
```

**Ответ:**
```json
{
  "id": "unique-id",
  "title": "Обновленное название",
  "description": "Обновленное описание",
  "status": "completed"
}
```

### Удалить задачу
```http
DELETE /tasks/:id
```

**Ответ:** `200 OK` (без тела ответа)

## 📊 Модель данных

### Task Object
```typescript
interface Task {
  id: string;           // Уникальный идентификатор (автогенерируется)
  title: string;        // Название задачи
  description: string;  // Описание задачи
  status: string;       // Статус: "pending" | "in progress" | "completed"
}
```

### Статусы задач
- `pending` - Ожидает выполнения
- `in progress` - В процессе выполнения
- `completed` - Завершена

## 🚀 Установка и запуск

### Предварительные требования
- Node.js >= 16.0.0
- npm >= 8.0.0

### Установка зависимостей
```bash
npm install
```

### Запуск в режиме разработки
```bash
npm start
```

Сервер будет доступен на http://localhost:5000

### Запуск тестов
```bash
npm test
```

## 🔧 Конфигурация

### Переменные окружения
- `PORT` - порт для запуска сервера (по умолчанию: 5000)

### Пример запуска с кастомным портом
```bash
PORT=3000 npm start
```

## 🧪 Тестирование

Проект включает набор тестов для проверки всех API endpoints:

```bash
npm test
```

Тесты проверяют:
- Создание задач
- Получение списка задач
- Получение задачи по ID
- Обновление задач
- Удаление задач
- Обработку ошибок

## 📝 Примеры использования

### Создание задачи с помощью curl
```bash
curl -X POST http://localhost:5000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Изучить React",
    "description": "Изучить основы React и Material-UI",
    "status": "in progress"
  }'
```

### Получение всех задач
```bash
curl http://localhost:5000/tasks
```

### Обновление задачи
```bash
curl -X PUT http://localhost:5000/tasks/task-id \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Изучить React (обновлено)",
    "status": "completed"
  }'
```

### Удаление задачи
```bash
curl -X DELETE http://localhost:5000/tasks/task-id
```

## 🔗 Интеграция с Frontend

Этот API предназначен для работы с React frontend приложением:

- **Frontend URL:** http://localhost:3000
- **API URL:** http://localhost:5000
- **CORS:** Настроен для разрешения запросов с localhost:3000

## 🐳 Docker

Проект включает Dockerfile для контейнеризации:

```bash
# Сборка образа
docker build -t express-your-feelings-backend .

# Запуск контейнера
docker run -p 5000:5000 express-your-feelings-backend
```

## 📁 Структура проекта

```
backend/
├── server.js          # Основной файл сервера
├── package.json       # Зависимости и скрипты
├── tests/            # Тестовые файлы
├── Dockerfile        # Docker конфигурация
└── README.md         # Этот файл
```

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Добавьте тесты для новой функциональности
5. Создайте Pull Request

См. CONTRIBUTING.md для деталей.

## 📄 Лицензия

MIT License - см. файл LICENSE для деталей.
