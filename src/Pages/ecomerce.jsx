import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormControl from "@mui/material/FormControl";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, CircularProgress, IconButton, Menu, MenuItem } from "@mui/material";
const Ecomerce = () => {
  const [search, setSearch] = useState("");
  const [selectedCtegory, setSelectedCtegory] = useState("all");
  const { handleAdd, fetchData, loading} = useContext(CartContext);
  const [anchEl, setanchEl] = useState(null);
  const open = Boolean(anchEl);

   const truncateWords = (description, maxWords) => {
    const words = description.trim().split(/\s+/);
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + " ..."
      : description;
  };

  const handleMenu = (event) => setanchEl(event.currentTarget);
  const handleClose = () => setanchEl(null);

  const filteredProducts = fetchData.filter((item) => {
    const handleCategory =
      selectedCtegory === "all" || item.category === selectedCtegory;

    const handleSearch = item.title.toLowerCase().includes(search.toLowerCase());

    return handleCategory && handleSearch;
  });

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (

    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          marginTop: { xs: "100px", sm:"120px" },
        }}
      >
        <Box sx={{ marginLeft: {xs:"35px", sm:"60px"}, }}>
          <FormControl
            variant="standard"
            sx={{
              "& .MuiInputLabel-root": {
                color: "gray", // default label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "black", // focused label color
              },
              "& .MuiInput-underline:before": {
                borderBottom: "1px solid gray", // default border
              },
              "& .MuiInput-underline:hover:before": {
                borderBottom: "1px solid darkgray", // hover border
              },
              "& .MuiInput-underline:after": {
                borderBottom: "2px solid black", // focused border
              },
            }}
          >
            <InputLabel htmlFor="component-simple">Name</InputLabel>
            <Input
              id="component-simple"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box sx={{ marginRight: "60px", display:{xs:"none", sm:"block",}, ml:"auto"}}>
          <ButtonGroup
            variant="text"
            aria-label="Basic button group"
            sx={{
              boxShadow: "none",
              borderRadius: "8px",
              overflow: "hidden",
              "& .MuiButton-root": {
                color: "#333",
                borderRight: "1px solid #ccc",
                "&:hover": {
                  backgroundColor: " rgb(243, 243, 243)",
                },
              },
              "& .MuiButton-root:last-child": {
                borderRight: "none", 
              },
            }}
          >
            <Button onClick={() => setSelectedCtegory("all")}>All</Button>
            <Button onClick={() => setSelectedCtegory("electronics")}>
              Electronics
            </Button>
            <Button onClick={() => setSelectedCtegory("jewelery")}>
              jewelery
            </Button>
            <Button onClick={() => setSelectedCtegory("men's clothing")}>
              men's clothing
            </Button>
            <Button onClick={() => setSelectedCtegory("women's clothing")}>
              women's clothing
            </Button>
          </ButtonGroup>
        </Box>
        <Box>
          <IconButton
            onClick={handleMenu}
            fontSize="large"
            sx={{ display: { sm: "none" }, color: "black", marginRight:"20px" }}
          >
            <FilterAltIcon fontSize="large" />
          </IconButton>
                  <Menu
                    anchorEl={anchEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    sx={{display:{sm:"none"}}}
                  >
                    <MenuItem onClick={() => {handleClose();setSelectedCtegory("all")}} >All</MenuItem>
                    <MenuItem onClick={() => {handleClose();setSelectedCtegory("fashion")}} >Fashion</MenuItem>
                    <MenuItem onClick={() => {handleClose();setSelectedCtegory("electronics")}}>Electronics</MenuItem>
                  </Menu>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          flexDirection: { xs: "column", sm: "row" },

        }}
      >
        {filteredProducts.map((item, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: "90%", sm: "22%" },
              border: "1px solid rgb(207, 207, 207)",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
              marginLeft:{xs:"auto", sm:"0"},
              marginRight:{xs:"auto", sm:"0"}
            }}
          >
            <div style={{ padding: "10px" }}>
              <img src={item.image} alt="" width={100} />
              <Link
                to={`/details/${item.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {item.title}
                </p>
              </Link>
              <Link to={`/details/${item.id}`} style={{ textDecoration: "none", color: "black" }}>
              <p style={{cursor:"pointer"}}>{truncateWords(item.description, 15)} </p>
              </Link>
              <p>
                <span style={{ fontWeight: "bold" }}>Price: </span>
                {item.price}
              </p>
              <button
                className="black-btn"
                onClick={() => {
                  handleAdd(item);
                  toast.success(`${item.title}  added to cart! 🛒`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                      backgroundColor: "rgba(0, 0, 0, 0.46)",
                      color: "white",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                    },
                  });
                }}
              >
                Add to Cart
              </button>
            </div>
          </Box>
        ))}
      </Box>
      <Link to="/cart">
        <Button
          variant="outlined"
          sx={{
            position: "fixed",
            bottom: "20px",
            left: "630px",
            padding: "12px 24px",
            backgroundColor: "orange",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            zIndex: 999,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "rgb(245, 184, 70)",
            },
          }}
        >
          Cart
        </Button>
      </Link>
    </div>
  );
};

export default Ecomerce;
