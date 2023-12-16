'use server';

import { currentUser } from '@clerk/nextjs';
import prisma from '../lib/prisma';
import { formSchema, formShemaType } from '@/schemes/form';

class UserNotFound extends Error {}

export async function GetFormStats() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFound();
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  const submissionRate = visits > 0 ? (submissions / visits) * 100 : 0;

  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
}

export async function CreateForm(data: formShemaType) {
  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    throw new Error('Form not valid');
  }

  const user = await currentUser();

  if (!user) {
    throw new UserNotFound();
  }

  const form = await prisma.form.create({
    data: {
      name: data.name,
      description: data.description,
      userId: user.id,
    },
  });

  if (!user) {
    throw new Error('Something went wrong');
  }

  return form.id;
}

export async function GetForms() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFound();
  }

  const forms = await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return forms;
}

export async function GetForm(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFound();
  }

  const form = await prisma.form.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  return form;
}
