import { Box, Button, Typography } from "@mui/material"
import { IoIosAddCircleOutline } from "react-icons/io"

const Product = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "100%",
          top: "10px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            sx={{ color: "white", bgcolor: "green", gap: "10px" }}
          >
            <IoIosAddCircleOutline /> Add Product
          </Button>
        </Box>
        <Box
          sx={{
            width: "99,5%",
            bgcolor: "white",
            borderRadius: "5px",
            mt: "20px",
            p: "20px",
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
              Products
            </Typography>
          </Box>
          <Box>Data</Box>
        </Box>
      </Box>
    </>
  )
}

export default Product
