import { GetFormStats, GetForms } from '@/actions/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React, { Suspense } from 'react';
import { LuView } from 'react-icons/lu';
import { BiRightArrowAlt } from 'react-icons/bi';
import { FaWpforms, FaEdit } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { TbArrowBounce } from 'react-icons/tb';
import { Separator } from '@/components/ui/separator';
import CreateFormBtn from '@/components/CreateFormBtn';
import { Form } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='container pt-4'>
      <Suspense fallback={<StatsCards loading />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className='my-6' />
      <h2 className='col-span-2 text-4xl font-bold'>Your forms</h2>
      <Separator className='my-6' />
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <CreateFormBtn />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardsProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards({ data, loading }: StatsCardsProps) {
  return (
    <div className='grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4'>
      <StatsCard
        title='Total visits'
        icon={<LuView className='text-blue-600' />}
        helperText='All time form visits'
        value={data?.visits.toLocaleString() || ''}
        loading={loading}
        className='shadow-md shadow-blue-600'
      />
      <StatsCard
        title='Total submissions'
        icon={<FaWpforms className='text-yellow-600' />}
        helperText='All time form submissions'
        value={data?.submissions.toLocaleString() || ''}
        loading={loading}
        className='shadow-md shadow-yellow-600'
      />
      <StatsCard
        title='Submission rate'
        icon={<HiCursorClick className='text-green-600' />}
        helperText='Visits that resulted in form submission'
        value={data?.submissionRate.toLocaleString() + '%' || ''}
        loading={loading}
        className='shadow-md shadow-green-600'
      />
      <StatsCard
        title='Bounce rate'
        icon={<TbArrowBounce className='text-red-600' />}
        helperText='Visits that leaves without interacting'
        value={data?.submissionRate.toLocaleString() + '%' || ''}
        loading={loading}
        className='shadow-md shadow-red-600'
      />
    </div>
  );
}

interface StatsCardProps {
  title: string;
  icon: JSX.Element;
  helperText: string;
  value: string;
  loading: boolean;
  className: string;
}

function StatsCard({
  title,
  icon,
  helperText,
  value,
  loading,
  className,
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='text-sm font-semibold text-muted-foreground'>
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {loading ? (
            <Skeleton>
              <span className='opacity-0'>0</span>
            </Skeleton>
          ) : (
            value
          )}
        </div>
        <p className='pt-1 text-xs text-muted-foreground'>{helperText}</p>
      </CardContent>
    </Card>
  );
}

function FormCardSkeleton() {
  return <Skeleton className='h-[190px] w-full border-2 border-primary/20' />;
}

async function FormCards() {
  const forms = await GetForms();

  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between gap-2'>
          <span className='trucnate font-bold'>{form.name}</span>
          {form.published ? (
            <Badge>Published</Badge>
          ) : (
            <Badge variant='destructive'>Draft</Badge>
          )}
        </CardTitle>
        <CardDescription className='flex items-center justify-between text-sm text-muted-foreground'>
          {formatDistance(form.createdAt, new Date(), { addSuffix: true })}
          {form.published && (
            <span className='flex items-center gap-2'>
              <LuView className='text-muted-foreground' />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className='text-muted-foreground' />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className='h-[20px] truncate text-sm text-muted-foreground'>
        {form.description || 'No description'}
      </CardContent>

      <CardFooter>
        {form.published ? (
          <Button asChild className='text-md mt-2 w-full gap-4'>
            <Link href={`/forms/${form.id}`}>
              <span>View Submissions</span> <BiRightArrowAlt />
            </Link>
          </Button>
        ) : (
          <Button
            asChild
            className='text-md mt-2 w-full gap-4'
            variant='secondary'
          >
            <Link href={`/builder/${form.id}`}>
              <span>Edit form</span> <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
