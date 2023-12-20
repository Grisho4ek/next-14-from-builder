import React from 'react';
import { FormElements } from './FormElements';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import useDesigner from './hooks/useDesigner';

function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;

  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className='flex flex-col p-2'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-foreground/70'>Element properties</p>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <Separator className='mb-4' />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}

export default PropertiesFormSidebar;
