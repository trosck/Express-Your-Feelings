# Express Your Feelings - Task Manager

Полнофункциональное приложение для управления задачами с современным React фронтендом и Express.js backend API, построенное с использованием чистой архитектуры.

## 🚀 Возможности

### Backend API
- ✅ **RESTful API** для управления задачами
- ✅ **CRUD операции** (Create, Read, Update, Delete)
- ✅ **CORS поддержка** для фронтенда
- ✅ **In-memory база данных** с Map
- ✅ **Валидация данных** и обработка ошибок
- ✅ **Структурированное логирование**
- ✅ **Статистика задач** по статусам
- ✅ **Health check** endpoint
- ✅ **Чистая архитектура** с разделением ответственности

### Frontend
- ✅ **Современный React интерфейс** с Material-UI
- ✅ **Адаптивный дизайн** для всех устройств
- ✅ **Создание, редактирование, удаление задач**
- ✅ **Изменение статуса задач** (Pending, In Progress, Completed)
- ✅ **Обработка ошибок** и состояний загрузки
- ✅ **Context API** для управления состоянием
- ✅ **Axios** для HTTP запросов

## 🛠 Технологии

### Backend
- **Node.js** - среда выполнения
- **Express.js** - веб-фреймворк
- **CORS** - middleware для кросс-доменных запросов
- **UID** - генерация уникальных идентификаторов
- **Mocha** - фреймворк для тестирования
- **Supertest** - HTTP assertions для тестирования

### Frontend
- **React 18** - библиотека для UI
- **Material-UI (MUI)** - компонентная библиотека
- **Axios** - HTTP клиент
- **React Context** - управление состоянием
- **Create React App** - инструменты разработки

## 📁 Структура проекта

```
express-your-feelings/
├── backend/
│   ├── server.js              # Основной файл сервера
│   ├── services/
│   │   └── TaskManager.js     # Бизнес-логика управления задачами
│   ├── routes/
│   │   └── taskRoutes.js      # Роуты для API задач
│   ├── middleware/
│   │   └── errorHandler.js    # Обработка ошибок
│   ├── utils/
│   │   └── logger.js          # Утилиты логирования
│   ├── tests/                 # Тестовые файлы
│   ├── package.json           # Backend зависимости
│   └── README.md              # Backend документация
├── frontend/
│   ├── src/
│   │   ├── components/        # React компоненты
│   │   │   ├── TaskList.js    # Список задач
│   │   │   ├── TaskCard.js    # Карточка задачи
│   │   │   └── TaskDialog.js  # Диалог создания/редактирования
│   │   ├── context/
│   │   │   └── TaskContext.js # React Context для состояния
│   │   └── App.js             # Главный компонент
│   ├── package.json           # Frontend зависимости
│   └── README.md              # Frontend документация
├── package.json               # Корневые зависимости и скрипты
├── test-api.js                # Тестовый файл для API
└── README.md                  # Этот файл
```

## 🚀 Быстрый старт

### Вариант 1: Запуск всего проекта одной командой

```bash
# Установка всех зависимостей
npm run install-all

# Запуск backend и frontend одновременно
npm run dev
```

### Вариант 2: Запуск по отдельности

#### 1. Запуск Backend

```bash
cd backend
npm install
npm start
```

Backend будет доступен на http://localhost:5000

#### 2. Запуск Frontend

```bash
cd frontend
npm install
npm start
```

Frontend будет доступен на http://localhost:3000

## 📋 API Endpoints

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

### Формат задачи

```json
{
  "id": "unique-id",
  "title": "Название задачи",
  "description": "Описание задачи",
  "status": "pending|in progress|completed",
  "createdAt": "2025-06-20T00:27:03.896Z",
  "updatedAt": "2025-06-20T00:27:03.896Z"
}
```

## 🎨 Скриншоты

Приложение имеет современный Material-UI интерфейс с:
- **Карточками задач** с анимацией при наведении
- **Диалогами** для создания и редактирования
- **Цветными индикаторами** статуса
- **Адаптивной сеткой** для разных размеров экрана
- **Floating Action Button** для добавления задач
- **Уведомлениями** об ошибках и успешных операциях

## 🔧 Разработка

### Backend разработка
```bash
cd backend
npm test          # Запуск тестов
npm start         # Запуск в режиме разработки
```

### Frontend разработка
```bash
cd frontend
npm test          # Запуск тестов
npm run build     # Сборка для продакшена
```

### Тестирование API
```bash
node test-api.js  # Запуск тестового скрипта
```

## 🏗 Архитектура

### Backend архитектура
- **Сервисный слой** - TaskManager для бизнес-логики
- **Роутер** - обработка HTTP запросов
- **Middleware** - обработка ошибок и логирование
- **Утилиты** - переиспользуемые функции

### Frontend архитектура
- **Компонентный подход** - разделение UI на компоненты
- **Context API** - глобальное управление состоянием
- **Custom hooks** - переиспользуемая логика
- **Material-UI** - готовые компоненты

## 📈 Логирование

Backend использует структурированное логирование:
- **INFO** - обычные операции
- **WARN** - предупреждения
- **ERROR** - ошибки сервера
- **DEBUG** - отладочная информация

## 🐳 Docker

### Backend
```bash
cd backend
docker build -t express-your-feelings-backend .
docker run -p 5000:5000 express-your-feelings-backend
```

### Frontend
```bash
cd frontend
docker build -t express-your-feelings-frontend .
docker run -p 3000:3000 express-your-feelings-frontend
```

## 📝 Скрипты

### Корневые скрипты
- `npm run dev` - запуск backend и frontend одновременно
- `npm run install-all` - установка всех зависимостей
- `npm run build` - сборка frontend
- `npm run test` - запуск всех тестов

### Backend скрипты
- `npm start` - запуск сервера
- `npm test` - запуск тестов

### Frontend скрипты
- `npm start` - запуск в режиме разработки
- `npm run build` - сборка для продакшена
- `npm test` - запуск тестов

## 🔗 Ссылки

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health
- **API Documentation:** http://localhost:5000

## 📄 Лицензия

MIT License - см. файл LICENSE для деталей.

## 🚀 Демо

После запуска приложения вы сможете:
1. Создавать новые задачи через кнопку "+"
2. Редактировать существующие задачи
3. Удалять задачи
4. Менять статус задач
5. Просматривать статистику по статусам
6. Видеть логи операций в консоли backend 