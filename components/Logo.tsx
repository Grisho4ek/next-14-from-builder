import Link from 'next/link';
import React from 'react';

function Logo() {
  return (
    <Link
      href='/'
      className='bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent hover:cursor-pointer'
    >
      PageForm
    </Link>
  );
}

export default Logo;
