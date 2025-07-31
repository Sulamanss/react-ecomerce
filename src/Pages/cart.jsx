import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

const Cart = () => {
  const { handleDecrease, handleIncrease, handleDelete, cart, total, loading } =
    useContext(CartContext);
 const truncateWords = (description, maxWords) => {
    const words = description.trim().split(/\s+/);
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + " ..."
      : description;
  };
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
    <Box sx={{ mt: "120px" }}>
      <h1 style={{textAlign:"center"}}>Cart </h1>
      <Box style={{}}>
        {cart.map((Item, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: "80%", sm: "50%" },
              display:"flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mb: 4,
              border: "1px solid rgb(207, 207, 207)",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.27)",
              backgroundColor: "rgba(214, 214, 214, 0.74)",
              p: 2,
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <img src={Item.image} alt="" width={100} />
              <Typography variant="h6" sx={{marginTop:"20px", marginBottom:"20px"}}>{Item.title}</Typography>
              <Typography variant="p"><p> {truncateWords(Item.description, 15)} </p></Typography>
              <Typography variant="p">
                <p>
                <strong> Unit Price : </strong> {Item.price}Rs
                </p>
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(index)}
                sx={{ mt: 1, width: { sm: "70%", xs:"50%" },  }}
              >
                Delete
              </Button>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography>
                <strong> Quantity: </strong>
                {Item.qty} / <strong> Price: </strong>
                {Item.unitPrice}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => handleIncrease(index)}
                sx={{ mr: 1, mt: 1,border:"1px solid black", color:"black",  }}
              >
                +
              </Button>
               <Button
                variant="outlined"
                onClick={() => handleDecrease(index)}
                sx={{ mt: 1,border:"1px solid black",color:"black"
                  }}
              >
                -
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        className="total"
      sx={{
          border: "1px solid rgb(168, 168, 168)",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.45)",
          borderRadius: "10px",
          p: 2,
          width: { xs: "30%", sm: "15%" },
          mx: "auto",
          textAlign: "center",
           right: {xs:"130px", sm:"10px"},


        }}
      >
        <Typography variant="h6">Total : {total}</Typography>
      </Box>
      <Typography sx={{marginTop:{xs:"130px"}}}></Typography>
    </Box>
  );
};

export default Cart;
