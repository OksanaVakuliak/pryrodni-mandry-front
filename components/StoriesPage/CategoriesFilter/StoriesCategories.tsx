import { Select } from '@/components/ui/Select/Select';
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
  const selectOptions = [
    { value: '', label: 'Всі статті' },
    ...categories.map((cat) => ({ value: cat._id, label: cat.category })),
  ];

  return (
    <div className={css.container}>
      <div className={css.mobileSelectWrapper}>        
        <div className={css.selectContainer}>
          <Select
            className={css.mobileSelect}
            value={activeCategory || ''}
            onChange={(value) =>
              onCategoryChange(value === '' ? undefined : String(value))
            }
            options={selectOptions}
          />
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
