```text
src/app/api/
├── auth/
│   ├── register/route.ts      # POST: Реєстрація нового користувача (RegistrationForm)
│   ├── login/route.ts         # POST: Вхід у систему (LoginForm)
│   ├── logout/route.ts        # POST: Вихід (ConfirmModal)
│   └── me/route.ts            # GET: Отримання даних поточного юзера (для UserBar)
│
├── stories/
│   ├── route.ts               # GET: Отримання списку всіх історій (з пагінацією та фільтром)
│   │                          # POST: Створення нової історії (AddStoryForm)
│   ├── [storyId]/route.ts     # GET: Деталі однієї історії (StoryPage)
│   ├── popular/route.ts       # GET: 10 найпопулярніших історій для слайдера (PopularStories)
│   ├── recommended/route.ts   # GET: Рекомендовані історії (RecomendedStories)
│   └── saved/route.ts         # POST/DELETE: Додати/видалити зі збережених (StoryCard/SaveStory)
│
├── travelers/
│   ├── route.ts               # GET: Список усіх мандрівників (TravallersPage)
│   └── [travelerId]/
│       ├── route.ts           # GET: Профіль конкретного мандрівника (TravelerPage)
│       └── stories/route.ts   # GET: Історії конкретного мандрівника
│
├── profile/
│   ├── route.ts               # GET: Дані профілю авторизованого юзера (TravelerInfo)
│   ├── edit/route.ts          # PATCH: Редагування профілю (PersonalPage - Дод. завдання)
│   ├── my-stories/route.ts    # GET: Список власних опублікованих історій (ProfileTabs)
│   └── saved-stories/route.ts # GET: Список збережених історій користувача (ProfileTabs)
│
└── categories/route.ts        # GET: Список усіх категорій для фільтра (CategoriesFilter)
```
