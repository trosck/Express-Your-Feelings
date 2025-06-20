# Express Your Feelings - Backend API

RESTful API для управления задачами, построенный на Node.js и Express.js с чистой архитектурой.

## 📋 Содержание

- [🚀 Возможности](#-возможности)
- [🛠 Технологии](#-технологии)
- [📁 Структура проекта](#-структура-проекта)
- [📋 API Endpoints](#-api-endpoints)
- [📊 Модель данных](#-модель-данных)
- [🚀 Установка и запуск](#-установка-и-запуск)
- [🔧 Конфигурация](#-конфигурация)
- [🧪 Тестирование](#-тестирование)
- [📝 Примеры использования](#-примеры-использования)
- [🔗 Интеграция с Frontend](#-интеграция-с-frontend)
- [🏗 Архитектура](#-архитектура)
- [🐳 Docker](#-docker)
- [📈 Логирование](#-логирование)
- [📄 Лицензия](#-лицензия)

## 🚀 Возможности

- ✅ **CRUD операции** для задач (создание, чтение, обновление, удаление)
- ✅ **RESTful API** с стандартными HTTP методами
- ✅ **CORS поддержка** для фронтенд приложений
- ✅ **In-memory хранилище** данных
- ✅ **Уникальные ID** для каждой задачи
- ✅ **Валидация данных** и обработка ошибок
- ✅ **Логирование** запросов и ошибок
- ✅ **Статистика задач** по статусам
- ✅ **Health check** endpoint
- ✅ **Тестирование** с Mocha и Supertest
- ✅ **Чистая архитектура** с разделением ответственности

## 🛠 Технологии

- **Node.js** - среда выполнения
- **Express.js** - веб-фреймворк
- **CORS** - middleware для кросс-доменных запросов
- **UID** - генерация уникальных идентификаторов
- **Mocha** - фреймворк для тестирования
- **Supertest** - HTTP assertions для тестирования

## 📁 Структура проекта

```
backend/
├── server.js              # Основной файл сервера
├── services/
│   └── TaskManager.js     # Бизнес-логика управления задачами
├── routes/
│   └── taskRoutes.js      # Роуты для API задач
├── middleware/
│   └── errorHandler.js    # Обработка ошибок
├── utils/
│   └── logger.js          # Утилиты логирования
├── tests/                 # Тестовые файлы
├── package.json           # Зависимости и скрипты
├── Dockerfile             # Docker конфигурация
└── README.md              # Этот файл
```

## 📋 API Endpoints

### Основные endpoints

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/` | Информация об API |
| GET | `/health` | Проверка состояния сервера |
| GET | `/tasks` | Получить все задачи |
| GET | `/tasks/stats` | Получить статистику задач |
| GET | `/tasks/:id` | Получить задачу по ID |
| POST | `/tasks` | Создать новую задачу |
| PUT | `/tasks/:id` | Обновить задачу |
| DELETE | `/tasks/:id` | Удалить задачу |

### Получить информацию об API
```http
GET /
```

**Ответ:**
```json
{
  "message": "Express Your Feelings - Task Manager API",
  "version": "1.0.0",
  "endpoints": {
    "tasks": "/tasks",
    "health": "/health"
  }
}
```

### Health Check
```http
GET /health
```

**Ответ:**
```json
{
  "status": "OK",
  "timestamp": "2025-06-20T00:26:40.794Z",
  "uptime": 3.059414583
}
```

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
    "status": "pending",
    "createdAt": "2025-06-20T00:27:03.896Z",
    "updatedAt": "2025-06-20T00:27:03.896Z"
  }
]
```

### Получить статистику задач
```http
GET /tasks/stats
```

**Ответ:**
```json
{
  "total": 5,
  "byStatus": {
    "pending": 2,
    "in progress": 2,
    "completed": 1
  }
}
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
  "status": "pending",
  "createdAt": "2025-06-20T00:27:03.896Z",
  "updatedAt": "2025-06-20T00:27:03.896Z"
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
  "status": "pending",
  "createdAt": "2025-06-20T00:27:03.896Z",
  "updatedAt": "2025-06-20T00:27:03.896Z"
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
  "status": "completed",
  "createdAt": "2025-06-20T00:27:03.896Z",
  "updatedAt": "2025-06-20T00:28:15.123Z"
}
```

### Удалить задачу
```http
DELETE /tasks/:id
```

**Ответ:**
```json
{
  "message": "Task deleted successfully",
  "id": "unique-id"
}
```

## 📊 Модель данных

### Task Object
```typescript
interface Task {
  id: string;           // Уникальный идентификатор (автогенерируется)
  title: string;        // Название задачи
  description: string;  // Описание задачи
  status: string;       // Статус: "pending" | "in progress" | "completed"
  createdAt: string;    // Дата создания (ISO string)
  updatedAt: string;    // Дата обновления (ISO string)
}
```

### Статусы задач
- `pending` - Ожидает выполнения
- `in progress` - В процессе выполнения
- `completed` - Завершена

### Error Response
```typescript
interface ErrorResponse {
  error: string;        // Тип ошибки
  message: string;      // Сообщение об ошибке
  status: number;       // HTTP статус код
  timestamp: string;    // Время ошибки
  details?: string[];   // Детали валидации (опционально)
}
```

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
- `NODE_ENV` - окружение (development/production)

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
- Валидацию данных
- Обработку ошибок
- Статистику задач

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

### Получение статистики
```bash
curl http://localhost:5000/tasks/stats
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

### Проверка здоровья сервера
```bash
curl http://localhost:5000/health
```

## 🔗 Интеграция с Frontend

Этот API предназначен для работы с React frontend приложением:

- **Frontend URL:** http://localhost:3000
- **API URL:** http://localhost:5000
- **CORS:** Настроен для разрешения запросов с localhost:3000

## 🏗 Архитектура

### Принципы проектирования
- **Разделение ответственности** - каждый модуль отвечает за свою область
- **Dependency Injection** - зависимости передаются через конструкторы
- **Middleware pattern** - обработка запросов через цепочку middleware
- **Error handling** - централизованная обработка ошибок
- **Logging** - структурированное логирование

### Модули
- **TaskManager** - бизнес-логика управления задачами
- **taskRoutes** - обработка HTTP запросов
- **errorHandler** - обработка ошибок
- **logger** - логирование

## 🐳 Docker

Проект включает Dockerfile для контейнеризации:

```bash
# Сборка образа
docker build -t express-your-feelings-backend .

# Запуск контейнера
docker run -p 5000:5000 express-your-feelings-backend
```

## 📈 Логирование

Сервер использует структурированное логирование:

- **INFO** - обычные операции (создание, обновление, удаление задач)
- **WARN** - предупреждения (задача не найдена)
- **ERROR** - ошибки сервера
- **DEBUG** - отладочная информация (только в development)

### Примеры логов
```
[INFO] 2025-06-20T00:27:03.896Z - Task created: 72c0c472c7f
[INFO] 2025-06-20T00:27:08.844Z - Retrieved task statistics
[WARN] 2025-06-20T00:27:10.123Z - Task not found: invalid-id
```

## 📄 Лицензия

MIT License - см. файл LICENSE для деталей.
