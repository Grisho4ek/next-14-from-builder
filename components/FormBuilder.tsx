'use client';

import { Form } from '@prisma/client';
import React from 'react';
import PreviewDialogBtn from './PreviewDialogBtn';
import SaveFormBtn from './SaveFormBtn';
import PublishFormBtn from './PublishFormBtn';
import Designer from './Designer';
import { DndContext } from '@dnd-kit/core';
import DragOverlayWrapper from './DragOverlayWrapper';

function FormBuilder({ form }: { form: Form }) {
  return (
    <DndContext>
      <main className='flex w-full flex-col'>
        <nav className='flex justify-between gap-3 border-b p-4'>
          <h2 className='truncate font-medium'>
            <span className='mr-2 text-muted-foreground'>Form: </span>
            <span>{form.name}</span>
          </h2>
          <div className='flex items-center gap-2'>
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn />
                <PublishFormBtn />
              </>
            )}
          </div>
        </nav>
        <div className='relative flex h-[200px] w-full flex-grow items-center justify-center overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]'>
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default FormBuilder;
