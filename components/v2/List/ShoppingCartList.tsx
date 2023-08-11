import * as React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

import { useRecoilState } from 'recoil';
import { shoppingCartState } from 'atoms';
import { calcCartItemSum, calcCartItemTotalPrice } from 'lib/utils';
import ShoppingCartListItem from 'components/v2/List/ShoppingCartListItem';

export default function ShoppingCartList() {
  const [shoppingCart] = useRecoilState(shoppingCartState);

  return (
    <div className='flex flex-col gap-4 py-4'>
      {shoppingCart.map((cartItem) => (
        <ShoppingCartListItem key={cartItem.id} {...cartItem} />
      ))}
      {!!shoppingCart.length && (
        <SubTotal
          sum={calcCartItemSum(shoppingCart)}
          price={calcCartItemTotalPrice(shoppingCart)}
        />
      )}
      {!shoppingCart.length && <EmptyCartAlert />}
    </div>
  );
}

const EmptyCartAlert = () => {
  return (
    <>
      <div className='alert alert-info'>
        <InformationCircleIcon className='stroke-current shrink-0 w-6 h-6' />
        <span>Your shopping cart is empty.</span>
      </div>
    </>
  );
};

const SubTotal = (props: { sum: number; price: number }) => {
  const { sum, price } = props;

  return (
    <div className='flex flex-col items-end gap-4'>
      <p className='font-bold'>
        <span className='pr-1'>
          {sum === 1
            ? `Subtotal: (${sum} item) $`
            : `Subtotal: (${sum} items) $`}
        </span>
        {price}
      </p>
    </div>
  );
};
