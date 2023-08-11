import * as React from 'react';
import NextLink from 'next/link';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
  ShoppingCartIcon,
  BookOpenIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

export interface HeaderProps {}

export default function Header(props: HeaderProps) {
  return (
    <>
      <div className='navbar bg-base-100 mx-auto max-w-7xl mt-4 shadow-xl rounded-box'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <label
              tabIndex={0}
              className='btn btn-ghost btn-circle content-center'
            >
              <Bars3Icon className='w-6 h-6' />
            </label>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
              {/* TODO */}
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
        </div>
        <div className='navbar-center'>
          <NextLink href='/'>
            <a className='btn btn-ghost normal-case text-xl'>
              <BookOpenIcon className='w-6 h-6' />
              Bookstore</a>
          </NextLink>
        </div>
        <div className='navbar-end'>
          <NextLink href='/cart'>
            <a className='btn btn-ghost btn-circle'>
              <div className='indicator'>
                <ShoppingCartIcon className='w-6 h-6' />
                <span className='badge badge-sm indicator-item'>8</span>
              </div>
            </a>
          </NextLink>

          {/* <button className='btn btn-ghost btn-circle'>
              <div className='indicator'>
                <UserIcon className='w-6 h-6' />
                <span className='badge badge-xs badge-primary indicator-item'></span>
              </div>
            </button> */}
        </div>
      </div>
    </>
  );
}
