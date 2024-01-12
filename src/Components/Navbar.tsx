import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import HeaderMenuCart from "./HeaderMenuIcon";
import { logOut } from "../redux/reducers/credentialReducer";
import { toast } from "react-toastify";

const pages = [
  {
    href: "/products",
    title: "Products",
  },
];

function Navbar() {
  const { user } = useAppSelector((state) => state.credentialReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.credentialReducer.token);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    dispatch(logOut());

    return navigate("/");
  };

  const email = useAppSelector(
    (state) => state.credentialReducer.user?.email || ""
  );

  const cartState = useAppSelector((state) => {
    return state.cartReducer.carts;
  });
  const userIndex: number = cartState.findIndex(function (c) {
    return c.userEmail === email;
  });

  const products = userIndex === -1 ? [] : cartState[userIndex]?.products;
  const notify = () => toast("Cart is empty");
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        border: "none",
        boxShadow: "none",
        cursor: "pointer",
      }}
    >
      <Container>
        <Toolbar disableGutters>
          {/* Mobile Nav */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.href} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    color="primary.main"
                    fontWeight={600}
                    sx={{ fontFamily: "roboto" }}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <img src="/assets/images/logo.png" alt="logo" width={30} />
          </Box>

          {/* Desktop Nav */}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/">
              <img src="/assets/images/logo.png" alt="logo" width={60} />
            </Link>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", textDecoration: "none" },
            }}
          >
            {pages.map((page, index) => (
              <Link
                to={page.href}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "primary.main",
                    display: "block",
                  }}
                >
                  <Typography
                    textAlign="center"
                    color="primary.main"
                    fontWeight={600}
                    sx={{ fontFamily: "roboto" }}
                  >
                    {page.title}
                  </Typography>
                </Button>
              </Link>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {products.length <= 0 ? (
              <ShoppingCartIcon color="primary" onClick={() => notify()} />
            ) : (
              <Link to="/cart">
                <Box sx={{ flexGrow: 0, position: "relative" }}>
                  <HeaderMenuCart products={products} />
                </Box>
              </Link>
            )}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                {user ? (
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={user.avatar} />
                  </IconButton>
                ) : (
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/assets/images/user.png" />
                  </IconButton>
                )}
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {!token?.accessToken ? (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <Typography textAlign="center" color="primary.main">
                        Login
                      </Typography>
                    </Link>
                  </MenuItem>
                ) : (
                  <>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link
                        to={`/dashboard`}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography textAlign="center" color="primary.main">
                          Dashboard
                        </Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to={`/order`} style={{ textDecoration: "none" }}>
                        <Typography textAlign="center" color="primary.main">
                          Order
                        </Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        color="primary.main"
                        onClick={handleLogout}
                      >
                        Logout
                      </Typography>
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
