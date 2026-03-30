import React from 'react';
import styles from './StoriesCategories.module.css';

interface StoriesCategoriesProps {
  categories: string[];
  activeCategory: string | undefined;
  onCategoryChange: (category: string | undefined) => void;
}

export const StoriesCategories = ({
  categories,
  activeCategory,
  onCategoryChange,
}: StoriesCategoriesProps) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {categories.map((category) => {
          const isActive =
            category === 'Всі статті' ? !activeCategory : activeCategory === category;

          return (
            <li key={category}>
              <button
                className={`${styles.categoryButton} ${isActive ? styles.active : ''}`}
                onClick={() =>
                  onCategoryChange(category === 'Всі статті' ? undefined : category)
                }
              >
                {category}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
