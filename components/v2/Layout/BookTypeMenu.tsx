import * as React from 'react';
import { useSnackbar } from 'notistack';

import { useRecoilState } from 'recoil';
import { bookTypeListState, homePageQueryState } from 'atoms';
import clsx from 'clsx';

import { SORT_VALUE } from 'const';
import { upperCaseEachWord } from 'lib/utils';
import { fetchBookTypes } from 'lib/http';

export default function BookTypeMenu() {
  const [loadingBookType, setLoadingBookType] = React.useState(false);

  const [bookTypeList, setBookTypeList] = useRecoilState(bookTypeListState);
  const [homePageQueryData, setHomePageQueryData] =
    useRecoilState(homePageQueryState);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    const func = async () => {
      setLoadingBookType(true);
      const res = await fetchBookTypes();
      const { error, content } = res;
      if (error) {
        setLoadingBookType(false);
        enqueueSnackbar(`Error: Fetch Book Types`, {
          variant: 'error',
        });
        return;
      }
      setBookTypeList(content);
      setLoadingBookType(false);
    };
    !bookTypeList.length && func();
  }, [bookTypeList.length, enqueueSnackbar, setBookTypeList]);

  return (
    <>
      <ul
        tabIndex={0}
        className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
      >
        <li>
          <div className='menu-title'>Book Type</div>
          <ul>
            {bookTypeList.map((bookType) => (
              <li
                key={bookType}
                onClick={() => {
                  setHomePageQueryData({
                    ...homePageQueryData,
                    page: 1,
                    type: bookType,
                  });
                }}
              >
                <span
                  className={clsx({
                    active: homePageQueryData.type === bookType,
                  })}
                >
                  {bookType.replaceAll(`_nbsp_`, ` `).replaceAll(`_amp_`, `&`)}
                </span>
              </li>
            ))}
          </ul>
        </li>

        <li>
          <div className='menu-title'>Order by</div>
          <ul>
            {SORT_VALUE.map((sortType) => (
              <li
                key={sortType}
                onClick={() => {
                  setHomePageQueryData({
                    ...homePageQueryData,
                    page: 1,
                    sort: sortType,
                  });
                }}
              >
                <span
                  className={clsx({
                    active: homePageQueryData?.sort === sortType,
                  })}
                >
                  {upperCaseEachWord(sortType.replaceAll(`_`, ` `))}
                </span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
}
