import * as React from 'react';
import Image from 'next/image';
import { useSnackbar } from 'notistack';
import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline';

import { useRecoilState } from 'recoil';
import { shoppingCartState, currentUserIdState } from 'atoms';

import { shoppingCartItemProps } from 'const';
import { currencyFormat, calcCartItemTotalPrice } from 'lib/utils';
import { buyBook } from 'lib/http';

export default function ShoppingCartListItem(props: shoppingCartItemProps) {
  const {
    id,
    title,
    authors,
    type,
    price,
    averageRating,
    quantity,
    stock,
    publishedAt,
  } = props;
  const [loading, setLoading] = React.useState(false);

  const [shoppingCart, setShoppingCart] = useRecoilState(shoppingCartState);
  const [currentUserId] = useRecoilState(currentUserIdState);

  const { enqueueSnackbar } = useSnackbar();

  function handleAddQty() {
    setShoppingCart((oldShoppingCart) => {
      return oldShoppingCart.reduce<shoppingCartItemProps[]>((prev, item) => {
        if (item.id === id) {
          prev.push({
            ...item,
            quantity: quantity + 1,
          });
        } else {
          prev.push(item);
        }
        return prev;
      }, []);
    });
  }

  function handleRemoveQty() {
    setShoppingCart((oldShoppingCart) => {
      return oldShoppingCart.reduce<shoppingCartItemProps[]>((prev, item) => {
        if (item.id === id) {
          prev.push({
            ...item,
            quantity: quantity - 1,
          });
        } else {
          prev.push(item);
        }
        return prev;
      }, []);
    });
  }

  function deleteItem() {
    setShoppingCart((oldShoppingCart) => {
      return [...oldShoppingCart.filter((i) => i.id !== id)];
    });
  }

  const handleBuyClick = async () => {
    setLoading(true);
    const response = await buyBook(id, {
      userID: currentUserId,
      quality: quantity,
    });
    if (response.error) {
      enqueueSnackbar(`Error: ${response.error}.`, {
        variant: 'error',
      });
      setLoading(false);
      return;
    }
    enqueueSnackbar(`${response.content?.message}`, {
      variant: 'success',
    });
    setLoading(false);
    setShoppingCart((oldShoppingCart) => {
      return oldShoppingCart.filter((i) => i.id !== id);
    });
  };

  return (
    <>
      <div className='card card-side bg-base-100 shadow-xl'>
        <figure>
          <Image
            src={`https://picsum.photos/seed/${id}/200/300`}
            alt={title}
            width={150}
            height={225}
          />
        </figure>
        <div className='card-body'>
          <div className='flex flex-col gap-1'>
            <p>
              <span className='text-lg font-bold pr-4'>Title:</span>
              {title}
            </p>
            <p>
              <span className='text-lg font-bold pr-4'>Type:</span>
              {type.replaceAll(`_nbsp_`, ` `).replaceAll(`_amp_`, `&`)}
            </p>
            <p>
              <span className='text-lg font-bold pr-4'>Publication date:</span>
              {new Date(publishedAt).toLocaleDateString()}
            </p>
            <p>
              <span className='text-lg font-bold pr-4'>Price:</span>
              {`$ ${currencyFormat(price)}`}
            </p>
            <p>
              <span className='text-lg font-bold pr-4'>In stock:</span>
              {stock}
            </p>
            <div className='flex justify-between'>
              <div className='join'>
                <button
                  className='btn btn-sm join-item'
                  disabled={quantity >= stock}
                  onClick={handleAddQty}
                >
                  <PlusIcon className='stroke-current shrink-0 w-6 h-6' />
                </button>
                <input
                  className='input input-sm input-bordered join-item w-12'
                  value={quantity}
                  disabled
                />
                <button
                  className='btn btn-sm join-item'
                  disabled={quantity <= 1}
                  onClick={handleRemoveQty}
                >
                  <MinusIcon className='stroke-current shrink-0 w-6 h-6' />
                </button>
              </div>
              <div className='flex justify-end gap-4'>
                <div className='font-bold'>
                  <span className='pr-1'>
                    {quantity === 1
                      ? `(${quantity} item) $`
                      : `(${quantity} items) $`}
                  </span>
                  {calcCartItemTotalPrice([props])}
                </div>
              </div>
            </div>
            <div className='flex justify-end gap-4'>
              <button className='btn btn-sm btn-error' onClick={deleteItem}>
                <TrashIcon className='stroke-current shrink-0 w-6 h-6' />
                Delete
              </button>
              <button
                className='btn btn-sm btn-info'
                onClick={handleBuyClick}
                disabled={loading}
              >
                {loading && <span className='loading loading-spinner' />}
                Proceed to Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
