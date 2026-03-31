'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button/Button';
import { storiesApi } from '@/lib/api/clientApi';
import { useStoriesStore } from '@/lib/store/useStoriesStore';

interface SaveStoryButtonProps {
  storyId: string;
  initialIsSaved: boolean;
  isAuthenticated: boolean;
  onOpenAuthModal: () => void;
}

export const SaveStoryButton = ({
  storyId,
  initialIsSaved,
  isAuthenticated,
//   onOpenAuthModal,
}: SaveStoryButtonProps) => {
  const isSaved = useStoriesStore((state) => state.savedStories[storyId] ?? initialIsSaved);
  const setStorySaved = useStoriesStore((state) => state.setStorySaved);
  
  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const handleToggleSave = async () => {
    if (!isAuthenticated) {
    //   onOpenAuthModal();
      return;
    }

    setIsRequesting(true);

    try {
      if (isSaved) {
        await storiesApi.deleteStory(storyId);
        setStorySaved(storyId, false); 
        toast.success('Видалено зі збережених');
      } else {
        await storiesApi.saveStory(storyId);
        setStorySaved(storyId, true); 
        toast.success('Історію збережено!');
      }
    } catch (error) {
      toast.error('Сталася помилка. Спробуйте пізніше');
      console.error('Save error:', error);
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <Button
      onClick={handleToggleSave}
      isLoading={isRequesting}
      variant={isSaved ? 'secondary' : 'primary'}
      type="button"
      className="flex items-center gap-2"
    >
      {isSaved ? (
        <>
          <span>Збережено</span>
        </>
      ) : (
        <>
          <span>Зберегти</span>
        </>
      )}
    </Button>
  );
};