import React, { useTransition } from 'react';
import { Button } from './ui/button';
import { HiSaveAs } from 'react-icons/hi';
import { FaSpinner } from 'react-icons/fa';

function SaveFormBtn() {
  const [loading, startTransition] = useTransition();

  return (
    <Button
      variant={'outline'}
      className='gap-2'
      disabled={loading}
      onClick={() => {}}
    >
      <HiSaveAs className='h-4 w-4' />
      <span>Save</span>
      {loading && <FaSpinner className='animate-spin' />}
    </Button>
  );
}

export default SaveFormBtn;
