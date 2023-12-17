import { cn } from '@/lib/utils';
import React from 'react';
import DesignerSidebar from './DesignerSidebar';
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { useDesigner } from './context/DesignerContext';
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from './FormElements';
import { idGenerator } from '@/lib/idGenerator';

function Designer() {
  const { elements, addElement } = useDesigner();

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      const isDroppingOverDesignerDropArea =
        over.data?.current?.isDesignerDropArea;

      const droppingSidebarBtnOverDesignerDropArea =
        isDesignerBtnElement && isDroppingOverDesignerDropArea;

      if (droppingSidebarBtnOverDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElement =
          FormElements[type as ElementsType].construct(idGenerator());

        addElement(elements.length, newElement);
        return;
      }
    },
  });

  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  });

  return (
    <div className='flex h-full w-full'>
      <div className='w-full p-4'>
        <div
          ref={droppable.setNodeRef}
          className={cn(
            'm-auto flex h-full max-w-[920px] flex-1 flex-grow flex-col items-center justify-start overflow-y-auto rounded-xl bg-background',
            droppable.isOver && 'ring-4 ring-inset ring-primary'
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className='flex flex-grow items-center text-3xl font-bold text-muted-foreground'>
              Drop here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className='w-full p-4'>
              <div className='h-[120px] rounded-md bg-primary/20'></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className='flex w-full  flex-col gap-2 p-4'>
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const DesignerElement = FormElements[element.type].designerComponent;
  return <DesignerElement elementInstance={element} />;
}

export default Designer;
