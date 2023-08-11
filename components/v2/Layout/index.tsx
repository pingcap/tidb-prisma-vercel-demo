import * as React from 'react';
import NextLink from 'next/link';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

import Header, { HeaderProps } from 'components/v2/Layout/Header';

export interface CommonLayoutProps {
  children?: any;
  headers: HeaderProps;
}

export default function CommonLayout(props: { children?: any }) {
  return (
    <>
      <div className='min-h-full'>
        <Header />

        <main>
          <div className='mx-auto max-w-7xl py-6 px-4'>
            {/* Your content */}
            {props?.children}
          </div>
        </main>
      </div>
    </>
  );
}
