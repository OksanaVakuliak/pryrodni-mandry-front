'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { storiesApi } from '@/lib/api/clientApi';
import { useStoriesStore } from '@/lib/store/useStoriesStore';
import { useAuthModal } from '@/components/providers/AuthModalProvider';
import styles from './SaveStoryButton.module.css';

interface SaveStoryButtonProps {
  storyId: string;
  initialIsSaved: boolean;
  isAuthenticated: boolean;
  variant?: 'text' | 'icon';
  className?: string;
}

export const SaveStoryButton = ({
  storyId,
  initialIsSaved,
  isAuthenticated,
  variant = 'text',
  className = '',
}: SaveStoryButtonProps) => {
  const { openAuthModal } = useAuthModal();
  const savedFromStore = useStoriesStore(
    (state) => state.savedStories[storyId] ?? initialIsSaved,
  );
  const isSaved = isAuthenticated ? savedFromStore : false;
  const setStorySaved = useStoriesStore((state) => state.setStorySaved);

  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const handleToggleSave = async () => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

    const prev = isSaved;
    setStorySaved(storyId, !prev);
    setIsRequesting(true);

    try {
      if (prev) {
        await storiesApi.deleteStory(storyId);
        toast.success('Видалено зі збережених');
      } else {
        await storiesApi.saveStory(storyId);
        toast.success('Історію збережено!');
      }
    } catch (err) {
      setStorySaved(storyId, prev);

      if (axios.isAxiosError(err)) {
        const status = err.response?.status;

        if (status === 401) {
          toast.error('Потрібно увійти, щоб зберігати історії');
          openAuthModal();
          return;
        }

        if (status === 409) {
          setStorySaved(storyId, true);
          toast.success('Історія вже у збережених');
          return;
        }

        toast.error('Сталася помилка. Спробуйте пізніше');
        console.error('Save error:', err);
      } else {
        toast.error('Сталася помилка. Спробуйте пізніше');
      }
    } finally {
      setIsRequesting(false);
    }
  };

  const savedClass = variant === 'icon' && isSaved ? styles.savedIcon : '';
  const buttonClassName = `${className} ${savedClass}`.trim();

  return (
    <Button
      className={buttonClassName}
      onClick={handleToggleSave}
      isLoading={variant === 'icon' ? false : isRequesting}
      disabled={isRequesting}
      variant={variant === 'icon' ? 'secondary' : 'primary'}
      type="button"
      aria-pressed={isSaved}
      aria-label={isSaved ? 'Збережено' : 'Зберегти'}
    >
      {variant === 'icon' ? (
        <Icon name="icon-bookmark" width={20} height={20} />
      ) : (
        <span>{isSaved ? 'Збережено' : 'Зберегти'}</span>
      )}
    </Button>
  );
};
