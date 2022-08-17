import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import ListSubheader from "@mui/material/ListSubheader";
import Checkbox from "@mui/material/Checkbox";
import { VariantType, useSnackbar } from "notistack";
import Skeleton from "@mui/material/Skeleton";

import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useRecoilValueLoadable,
} from "recoil";
import { bookTypeListState, homePageQueryState } from "atoms";

import { fetchBookTypes } from "lib/http";

const BookTypeComponent = (props: { loading: boolean; data: string[] }) => {
  const [homePageQueryData, setHomePageQueryData] =
    useRecoilState(homePageQueryState);
  return (
    <>
      <List>
        <ListSubheader>{`Book Types`}</ListSubheader>
        {props.loading && (
          <>
            <ListItem disablePadding>
              <Skeleton
                sx={{ margin: "0 1rem", width: "100%", height: "3rem" }}
              />
            </ListItem>
          </>
        )}
        {props.data.map((bookType) => (
          <ListItem key={bookType} disablePadding>
            <ListItemButton
              onClick={() => {
                // setBookType(bookType);
                // setHomePageIdx(1);
                setHomePageQueryData({
                  ...homePageQueryData,
                  page: 1,
                  type: bookType,
                });
              }}
              selected={homePageQueryData.type === bookType}
            >
              <ListItemText
                primary={bookType
                  .replaceAll(`_nbsp_`, ` `)
                  .replaceAll(`_amp_`, `&`)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

const SortComponent = () => {
  const [homePageQueryData, setHomePageQueryData] =
    useRecoilState(homePageQueryState);
  const SORT_VALUE = ["published_at", "price"];
  return (
    <>
      <List>
        <ListSubheader>{`Sort By`}</ListSubheader>
        {SORT_VALUE.map((sortType) => (
          <ListItem key={sortType} disablePadding>
            <ListItemButton
              onClick={() => {
                setHomePageQueryData({
                  ...homePageQueryData,
                  page: 1,
                  sort: sortType,
                });
              }}
              selected={homePageQueryData.sort === sortType}
            >
              <ListItemText primary={sortType} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default function BasicList(props: { className?: string }) {
  const [checked, setChecked] = React.useState([0]);
  const [loadingBookType, setLoadingBookType] = React.useState(false);

  const [bookTypeList, setBookTypeList] = useRecoilState(bookTypeListState);

  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    const func = async () => {
      setLoadingBookType(true);
      const res = await fetchBookTypes();
      const { error, content } = res;
      if (error) {
        setLoadingBookType(false);
        enqueueSnackbar(`Error: Fetch Book Types`, {
          variant: "error",
        });
        return;
      }
      setBookTypeList(content);
      setLoadingBookType(false);
    };
    !bookTypeList.length && func();
  });

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Box
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      className={props.className}
    >
      <nav aria-label="main mailbox folders">
        <BookTypeComponent loading={loadingBookType} data={bookTypeList} />
        <SortComponent />

        {/* <List>
          <ListSubheader>{`Popular in Books`}</ListSubheader>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Best books of the month" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="New releases" />
            </ListItemButton>
          </ListItem>
        </List> */}

        {/* <List>
          <ListSubheader>{`Authors`}</ListSubheader>
          <ListItem disablePadding>
            <ListItemButton role={undefined} onClick={handleToggle(0)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(0) !== -1}
                  tabIndex={-1}
                  disableRipple
                  // inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText primary={`Author 1`} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton role={undefined} onClick={handleToggle(0)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(0) !== -1}
                  tabIndex={-1}
                  disableRipple
                  // inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText primary={`Author 2`} />
            </ListItemButton>
          </ListItem>
        </List> */}

        {/* <List>
          <ListSubheader>{`Price`}</ListSubheader>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="0 - 10" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="11 - 20" />
            </ListItemButton>
          </ListItem>
        </List> */}
      </nav>
    </Box>
  );
}
