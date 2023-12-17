import { GetForm } from '@/actions/form';
import FormBuilder from '@/components/FormBuilder';
import React from 'react';

async function BuilderPage({ params }: { params: { id: string } }) {
  const form = await GetForm(Number(params.id));

  if (!form) throw new Error('Form not found');

  return <FormBuilder form={form} />;
}

export default BuilderPage;
