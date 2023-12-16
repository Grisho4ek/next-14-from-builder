import { GetForm } from '@/actions/form';
import React from 'react';

async function BuilderPage({ params }: { params: { id: string } }) {
  const form = await GetForm(Number(params.id));

  if (!form) throw new Error('Form not found');

  return <div>{form.name}</div>;
}

export default BuilderPage;
