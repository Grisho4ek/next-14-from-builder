'use client';

import React from 'react';
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from '../FormElements';
import { MdTextFields } from 'react-icons/md';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const type: ElementsType = 'TextField';

const extraAttributes = {
  label: 'Text field',
  helperText: 'Helper text',
  required: false,
  placeHolder: 'Value here...',
};

export const TextFieldFormElement: FormElement = {
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: 'Text Field',
      helperText: 'helperText',
      required: false,
      placeHolder: 'value here...',
    },
  }),
  type,
  designerComponent: DesignerComponent,
  formComponent: () => <div>formComponent</div>,
  propertiesComponent: () => <div>propertiesComponent</div>,
  designerBtnElement: {
    icon: MdTextFields,
    label: 'Text Field',
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <div className='flex w-full flex-col gap-2'>
      <Label>
        {label}
        {required && '*'}
      </Label>
      <Input readOnly disabled placeholder={placeHolder} />
      {helperText && (
        <p className='text-[0.8rem] text-muted-foreground'>{helperText}</p>
      )}
    </div>
  );
}
