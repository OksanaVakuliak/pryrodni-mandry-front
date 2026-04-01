import css from './StoriesCategories.module.css';
import { Category } from '@/types/Category';

interface StoriesCategoriesProps {
  categories: Category[];
  activeCategory: string | undefined;
  onCategoryChange: (categoryId: string | undefined) => void;
}

export const StoriesCategories = ({
  categories,
  activeCategory,
  onCategoryChange,
}: StoriesCategoriesProps) => {
  return (
    <div className={css.container}>
      <div className={css.mobileSelectWrapper}>        
        <div className={css.selectContainer}>
          <select
            id="category-select"
            className={css.mobileSelect}
            value={activeCategory || ''}
            onChange={(e) =>
              onCategoryChange(e.target.value === '' ? undefined : e.target.value)
            }
          >
            <option value="">Всі статті</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ul className={css.list}>
        <li>
          <button
            className={`${css.categoryButton} ${!activeCategory ? css.active : ''}`}
            onClick={() => onCategoryChange(undefined)}
          >
            Всі статті
          </button>
        </li>
        {categories.map((cat) => {
          const isActive = activeCategory === cat._id;

          return (
            <li key={cat._id}>
              <button
                className={`${css.categoryButton} ${isActive ? css.active : ''}`}
                onClick={() => onCategoryChange(cat._id)}
              >
                {cat.category}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
