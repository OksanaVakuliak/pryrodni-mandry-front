'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import api from '@/lib/api/api'; 
import { Button } from '@/components/ui/Button/Button';

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
  onOpenAuthModal,
}: SaveStoryButtonProps) => {
  const [isSaved, setIsSaved] = useState<boolean>(initialIsSaved);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const handleToggleSave = async () => {
    if (!isAuthenticated) {
      onOpenAuthModal();
      return;
    }

    setIsRequesting(true);

    try {

      if (isSaved) {
        await api.patch(`/stories/${storyId}/delete`);
        setIsSaved(false);
          toast.success('Видалено зі збережених');
          
      } else {
        await api.patch(`/stories/${storyId}/save`);
        setIsSaved(true);
        toast.success('Історію збережено!');
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      
      console.error('API Error:', axiosError.response?.status, axiosError.config?.url);
      
      const errorMessage = axiosError.response?.data?.message || 'Сталася помилка при збереженні';
      toast.error(errorMessage);
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
    >
      {isSaved ? 'Збережено' : 'Зберегти'}
    </Button>
  );
};