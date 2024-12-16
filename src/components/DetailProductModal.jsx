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
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "auto",
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: "100%",
              maxWidth: "600px",
              height: "500px",
              position: "relative",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: "32px",
                top: 60,
                position: "relative",
              }}
            >
              {product.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                position: "relative",
                top: 70,
              }}
            >
              <Typography
                variant="body1"
                sx={{ mt: 1, fontSize: "24px", fontWeight: "bold" }}
              >
                $ {product.price}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "18px" }}>
                {product.category}
              </Typography>

              <Typography>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.description,
                  }}
                />
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default DetailProductModal
