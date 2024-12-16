/* eslint-disable react/prop-types */
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material"
import { IoMdClose } from "react-icons/io"

const DetailProductModal = ({ open, handleClose, product }) => {
  if (!product) {
    return null
  }
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "24px" }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <IoMdClose />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "400px",
              height: "500px",
              backgroundColor: "#f5f5f5",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={`http://localhost:8000/public/${product.image}`}
              alt="Product"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>

          {/* Product Details Box */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: "100%",
              maxWidth: "600px",
              height: "500px", // Match the height of the image box
              overflow: "auto",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "32px" }}
            >
              {product.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 1, fontSize: "24px", fontWeight: "bold" }}
            >
              ${product.price}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "16px" }}>
              Category: {product.category}
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 1, color: "black", bgcolor: "transparent" }}
            >
              Description:
              <div
                dangerouslySetInnerHTML={{
                  __html: product.description,
                }}
              />
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
              Created At: {new Date(product.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default DetailProductModal
