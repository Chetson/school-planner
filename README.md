# School Planner — SPA школьной платформы

Демонстрационный проект: интерфейс школьной платформы — расписание, классы
и группы, занятия, журнал оценок, учебные темы, кабинеты и управление
пользователями. Сделан как площадка для отработки архитектуры фронтенда
на реальном по объёму приложении: 31 страница, 51 фича, 11 сущностей.

Все данные — демонстрационные (MSW), приложение запускается без бэкенда.

## Что внутри

- 31 страница: авторизация, расписание, классы, группы, занятия, журнал,
  темы, кабинеты, пользователи, массовые загрузки
- роли и разграничение доступа (`AccessRole`, `RoleBadge`, защищённые layout'ы)
- таблицы с виртуализацией (`@tanstack/react-table` + `react-virtual`)
- формы на React Hook Form + zod
- MSW: полный набор моков, бэкенд не требуется
- Storybook для UI-кита

## Стек

- React 18, TypeScript 5, Vite 5
- React Router 6
- TanStack Query 5, TanStack Table 8, TanStack Virtual
- Radix UI + shadcn/ui, Tailwind CSS 3
- React Hook Form + zod
- axios + `axios-case-converter` (snake_case ↔ camelCase на границе API)
- MSW 2 (моки), Storybook 8
- Docker (multi-stage) + nginx

## Архитектура

Feature-Sliced Design с алиасами путей:

```
src/
├── app/          # провайдеры, роутер, layout'ы, MSW
│   ├── layout/   # PublicLayout, ProtectedLayout
│   ├── mocks/    # handlers + config (демо-данные)
│   └── router/   # конфигурация маршрутов, guard'ы
├── pages/        # 31 страница — только композиция слоёв
├── widgets/      # Header, NavigationSidebar, AuthWidget, OperationModal
├── features/     # 51 фича: формы, фильтры, модалки, действия
├── entities/     # 11 сущностей: user, class, group, event, gradebook,
│                 #                subject, room, theme, activity, settings
└── shared/       # api, ui-kit, helpers, типы, ассеты
```

Правила, которых держится структура:

- страница не содержит логики — только собирает виджеты и фичи
- запросы живут в `entities/*/api` через TanStack Query, а не в компонентах
- UI-кит в `shared/ui`, прикладные компоненты — в фичах
- границы слоёв проверяются алиасами: `@entities/*` не может импортировать
  `@features/*`

## Запуск

```bash
npm ci
cp .env.example .env
npm run dev          # http://localhost:4200
```

По умолчанию `VITE_MOCK=true` — MSW подставляет демо-данные, бэкенд не нужен.
Демо-учётка задаётся в `src/app/mocks/config/auth.ts`.

Storybook:

```bash
npm run storybook
```

Сборка и Docker:

```bash
npm run build
docker build --build-arg VITE_BACKEND_URL=http://localhost:8080/api/v1 -t school-planner .
```

## Что улучшил бы сейчас

- **Тестов нет** — только Storybook. Первым делом покрыл бы Vitest + Testing
  Library критичные формы (создание занятия, загрузка пользователей) и guard'ы
  доступа.
- **Один бандл на 760 КБ.** Роутовый `lazy` + `manualChunks` для вендоров дали
  бы заметно меньший initial load.
- **Типы API генерировал бы из OpenAPI** вместо ручных описаний: сейчас
  `axios-case-converter` сглаживает snake_case ↔ camelCase, и расхождение
  контракта всплывает только в рантайме.
- **Моки и бэкенд расходятся.** MSW-схемы стоит держать в одном месте с типами,
  иначе демо-режим живёт своей жизнью.
