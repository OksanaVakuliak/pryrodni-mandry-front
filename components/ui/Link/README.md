# 📄 Документація компонента Link

Компонент **Link** — це універсальна обгортка над `next/link`, яка реалізує
різні візуальні варіанти згідно з дизайн-системою (від текстових посилань до
кнопок-іконок).

## 🛠 Властивості (Props)

| Проп         | Тип         | Дефолт      | ******\*\*******\*\*\*******\*\*******                                |
| :----------- | :---------- | :---------- | :-------------------------------------------------------------------- |
| `href`       | `string`    | —           | **Обов'язковий**. Шлях для переходу.                                  |
| `variant`    | `string`    | `'primary'` | Стиль: `primary`, `secondary`, `nav`, `textWithBorder`, `iconButton`. |
| `iconId`     | `string`    | —           | ID іконки зі спрайту (обов'язково для `iconButton`).                  |
| `isDisabled` | `boolean`   | `false`     | Вимикає посилання (блокує клік та змінює стиль).                      |
| `children`   | `ReactNode` | —           | Текст або елементи всередині.                                         |

## 🚀 Приклади використання

### 1. Текстове посилання з рамкою (`textWithBorder`)

Найкраще підходить для карток товарів або статей, де посилання має чітко
реагувати на наведення.

```typescript
import { Link } from '@/components/ui/Link/Link';

<Link href="/shop" variant="textWithBorder">
  Переглянути все
</Link>

```

2. Кнопка-іконка (iconButton) Квадратна кнопка (35x35px), що містить лише
   іконку. Ідеально для "Закладок" або "Вибраного".

TypeScript

<Link 
  href="/favorites" 
  variant="iconButton" 
  iconId="icon-bookmark" 
  aria-label="Додати у вибране"
/>

3. Навігаційне посилання (nav) Для використання у верхньому меню (Header).

TypeScript

<Link href="/services" variant="nav">
  Послуги
</Link>
1. Заблокований стан (isDisabled)
Вимикає можливість переходу та візуально робить елемент неактивним.

TypeScript

<Link href="#" variant="iconButton" iconId="icon-bookmark" isDisabled />

4.  Кнопка "Мандрівники" (Primary) Використовується для головних закликів до дії
    (CTA), має фоновий колір mantis-dark.

TypeScript <CustomLink href="/travelers" variant="primary"> Всі мандрівники
</CustomLink>

💡 Нотатки для команди

Назва: Ми використовуємо назву Link, тому при імпорті в сторінки, де вже є
стандартний next/link, імпортуйте наш компонент як: import { Link } from
'@/components/ui/Link/Link';

Доступність: Для варіанту iconButton завжди додавайте aria-label, оскільки
всередині немає тексту.

Спрайт: Переконайтеся, що іконка з потрібним id існує у файлі /Icons/sprite.svg.
