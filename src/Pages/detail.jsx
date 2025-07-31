import { useParams } from "react-router-dom";
import { useContext, } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import { Box, Typography } from "@mui/material";



const Detail = () => {
  const { id,  } = useParams();
  const {handleAdd, fetchData, } = useContext(CartContext)
  
  const product = fetchData.find((item) => item.id === parseInt(id));

  if (!product) return <p>product not found</p>;


   
  return (
    <Box
      sx={{
        marginTop: "100px",
        display: "flex",
        flexDirection:{xs:"column", sm:"row"},
        justifyContent: "center",
        gap: "30px",
        width: "100%",
        marginLeft:{xs:"20px"}
      }}
    >
      <Box
        sx={{
          borderRight:{ sm:"1px solid rgb(175, 175, 175)"},
          boxShadow: "2px 0px 0px rgba(199, 199, 199, 0.3)",
          paddingBottom: "20px",
          paddingTop: "20px",
          width: {xs:"100%", sm:"35%"},
        }}
      >
        <img src={product.image} alt="" width={300} height={300} />
      </Box>
      <Box sx={{width: {xs:"90%", sm:"35%"},}}>
        <Typography variant="h3" sx={{marginBottom:"30px",}}>
        {product.title}
        </Typography>
        <p>{product.description}</p>
        <p><span style={{fontWeight:"bold"}}>Price:</span>{product.price}</p>
          <button
          className="black-btn"
          onClick={() => {
            handleAdd(product);
            toast.success(`${product.title}  added to cart! 🛒`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              style:{backgroundColor:"rgba(0, 0, 0, 0.46)", color:"white", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)"}
            });
          }}
        >
          Add to Cart
        </button>
      </Box>
      
    </Box>
  );
};

export default Detail;
