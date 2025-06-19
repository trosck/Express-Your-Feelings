# Express Your Feelings - Task Manager

Полнофункциональное приложение для управления задачами с современным React фронтендом и Express.js backend API.

## 🚀 Возможности

### Backend API
- ✅ RESTful API для управления задачами
- ✅ CRUD операции (Create, Read, Update, Delete)
- ✅ CORS поддержка для фронтенда
- ✅ Простая in-memory база данных

### Frontend
- ✅ Современный React интерфейс
- ✅ Material-UI компоненты
- ✅ Адаптивный дизайн
- ✅ Создание, редактирование, удаление задач
- ✅ Изменение статуса задач
- ✅ Обработка ошибок и загрузки

## 🛠 Технологии

### Backend
- Node.js
- Express.js
- CORS middleware
- UID для генерации уникальных ID

### Frontend
- React 18
- Material-UI (MUI)
- Axios для HTTP запросов
- React Context для управления состоянием

## 📁 Структура проекта

```
express-your-feelings/
├── backend/
│   ├── server.js          # Express сервер
│   ├── package.json       # Backend зависимости
│   └── tests/            # Тесты
├── frontend/
│   ├── src/
│   │   ├── components/   # React компоненты
│   │   ├── context/      # React Context
│   │   └── App.js        # Главный компонент
│   └── package.json      # Frontend зависимости
└── README.md             # Этот файл
```

## 🚀 Быстрый старт

### 1. Запуск Backend

```bash
cd backend
npm install
npm start
```

Backend будет доступен на http://localhost:5000

### 2. Запуск Frontend

```bash
cd frontend
npm install
npm start
```

Frontend будет доступен на http://localhost:3000

## 📋 API Endpoints

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/tasks` | Получить все задачи |
| GET | `/tasks/:id` | Получить задачу по ID |
| POST | `/tasks` | Создать новую задачу |
| PUT | `/tasks/:id` | Обновить задачу |
| DELETE | `/tasks/:id` | Удалить задачу |

### Формат задачи

```json
{
  "id": "unique-id",
  "title": "Название задачи",
  "description": "Описание задачи",
  "status": "pending|in progress|completed"
}
```

## 🎨 Скриншоты

Приложение имеет современный Material-UI интерфейс с:
- Карточками задач с анимацией при наведении
- Диалогами для создания и редактирования
- Цветными индикаторами статуса
- Адаптивной сеткой для разных размеров экрана

## 🔧 Разработка

### Backend разработка
```bash
cd backend
npm test          # Запуск тестов
```

### Frontend разработка
```bash
cd frontend
npm test          # Запуск тестов
npm run build     # Сборка для продакшена
```

## 📝 Лицензия

MIT License - см. файл LICENSE для деталей.

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

См. CONTRIBUTING.md для деталей. 