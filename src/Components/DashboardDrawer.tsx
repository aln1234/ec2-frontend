import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import UserUpdateForm from "./UserUpdate";
import useAppSelector from "../hooks/useAppSelector";
import { Paper } from "@mui/material";

import ProductForm from "./admin/Product/ProductForm";
import ProductsTable from "./admin/Product/ProductsTable";
import Loader from "./Loader";
import CategoryForm from "./admin/Category/CategoryForm";
import CategoryTable from "./admin/Category/CategoryTable";
import UserTable from "./admin/User/UserTable";
import { getAllUser, userProfile } from "../api/userLogin";
import useAppDispatch from "../hooks/useAppDispatch";
import { categoriesFilter, categoriesGet } from "../api/productFetch";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            display: "flex",
            marginLeft: "6rem",
            width: "100%",
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function DashboardDrawer() {
  const [value, setValue] = React.useState(0);
  const { user } = useAppSelector((state) => state.credentialReducer);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.credentialReducer.token);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(categoriesGet());
    if (token) {
      dispatch(getAllUser(token?.accessToken));
      dispatch(userProfile(token?.accessToken));
    }

    dispatch(
      categoriesFilter({
        limit: 0,
        offset: 0,
        categoryId: "",
        searchText: "",
      })
    );
  }, [dispatch, token]);

  return (
    <Paper
      sx={{
        flexGrow: 1,
        display: "flex",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        marginTop: "4rem",
        width: "100%",
      }}
      elevation={1}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
      >
        <Tab
          label="Profile"
          {...a11yProps(0)}
          sx={{ alignItems: "flex-start", fontWeight: "bold" }}
        />
        {user?.role === "ADMIN" && (
          <Tab
            label="Create Product"
            {...a11yProps(1)}
            sx={{ alignItems: "flex-start", fontWeight: "bold" }}
          />
        )}
        {user?.role === "ADMIN" && (
          <Tab
            label="View Product"
            {...a11yProps(2)}
            sx={{ alignItems: "flex-start", fontWeight: "bold" }}
          />
        )}
        {user?.role === "ADMIN" && (
          <Tab
            label="Create Category"
            {...a11yProps(2)}
            sx={{ alignItems: "flex-start", fontWeight: "bold" }}
          />
        )}
        {user?.role === "ADMIN" && (
          <Tab
            label="View Category"
            {...a11yProps(2)}
            sx={{ alignItems: "flex-start", fontWeight: "bold" }}
          />
        )}
        {user?.role === "ADMIN" && (
          <Tab
            label="View User"
            {...a11yProps(2)}
            sx={{ alignItems: "flex-start", fontWeight: "bold" }}
          />
        )}
        ;
      </Tabs>

      {/* {user?.role === "ADMIN" && ( */}
      <Box sx={{ width: "80%" }}>
        <TabPanel value={value} index={0}>
          {!user ? <Loader /> : <UserUpdateForm user={user} />}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProductForm />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ProductsTable />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <CategoryForm />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <CategoryTable />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <UserTable />
        </TabPanel>
      </Box>
    </Paper>
  );
}
