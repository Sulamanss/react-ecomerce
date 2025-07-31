import { IconButton, Menu, MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const Navbar = () => {
  const [anchEl, setanchEl] = useState(null);
  const open = Boolean(anchEl);

  const handleMenu = (event) => setanchEl(event.currentTarget);
  const handleClose = () => setanchEl(null);
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.66)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        padding: "10px",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "25px",
          }}
        >
          MyShop
        </Typography>

        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
          <Button
            component={Link}
            to="/"
            sx={{ color: "white", textTransform: "none" }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/cart"
            sx={{ color: "white", textTransform: "none" }}
          >
            Cart
          </Button>
          <Button sx={{ color: "white", textTransform: "none" }}>About</Button>
          <Button sx={{ color: "white", textTransform: "none" }}>
            Contact
          </Button>
        </Box>
        <IconButton
        onClick={handleMenu}
          fontSize="large"
          sx={{ display: { sm: "none" }, color: "white"}}
        >
          <MenuIcon  fontSize="large"/>
        </IconButton>
        <Menu
          anchorEl={anchEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "centre" }}
          transformOrigin={{ vertical: "top", horizontal: "cantre" }}
        >
          <MenuItem onClick={handleClose} component={Link} to="/">Home</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/cart">Cart</MenuItem>
          <MenuItem onClick={handleClose}>About</MenuItem>
          <MenuItem onClick={handleClose}>Contact</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
