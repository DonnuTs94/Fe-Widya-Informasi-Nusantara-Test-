/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Input,
  TextField,
  Typography,
} from "@mui/material"
import { IoMdClose } from "react-icons/io"
import ReactQuill from "react-quill"
import { useEffect, useRef, useState } from "react"
import "react-quill/dist/quill.snow.css"
import axiosInstance from "../configs/api"

const UpdateProductModal = ({ open, handleClose, product, refetch }) => {
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [description, setDescription] = useState("")

  const inputFile = useRef()

  const updateImageProduct = async (file) => {
    try {
      const imageToSend = new FormData()
      imageToSend.append("image", file)

      await axiosInstance.put(`product/${product.id}/image`, imageToSend)

      handleClose()
      await refetch()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (product) {
      setPrice(product.price || "")
      setQuantity(product.quantity || "")
      setDescription(product.description || "")
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "price") setPrice(value)
    if (name === "quantity") setQuantity(value)
  }

  const handleDescriptionChange = (content) => {
    setDescription(content)
  }

  const handleSubmit = async () => {
    try {
      await axiosInstance.put(`/product/${product.id}`, {
        price: parseInt(price),
        quantity: parseInt(quantity),
        description: description,
      })

      handleClose()
      refetch()
    } catch (err) {
      console.error("Update Error:", err)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // setNewImage(file)
    updateImageProduct(file)
  }

  const handleImageClick = () => {
    inputFile.current.click()
  }

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
              position: "relative",
              flexDirection: "column",
            }}
          >
            <Box
              component="img"
              src={`http://localhost:8000/public/${product.image}`}
              alt="Product"
              sx={{
                width: "100%",
                height: "95%",
                objectFit: "cover",
                position: "relative",
                bottom: 30,
                cursor: "pointer",
              }}
              onClick={handleImageClick}
            />

            <Button
              component="label"
              variant="outlined"
              sx={{
                color: "black",
                border: "none",
                display: "none",
              }}
              ref={inputFile}
            >
              <Input
                type="file"
                sx={{ display: "none" }}
                required
                onChange={handleFileChange}
              />
            </Button>

            <Typography sx={{ bottom: 15, position: "relative" }}>
              Click on the image to replace the current one.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: "100%",
              maxWidth: "600px",
              height: "500px",
              overflow: "auto",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
              Update Product Form
            </Typography>
            <Divider />

            <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
              {product.name}
            </Typography>
            <Box sx={{ display: "flex", mt: "20px", gap: "20px" }}>
              <TextField
                label="Price"
                type="number"
                name="price"
                value={price}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  width: "auto",
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                }}
              />
              <TextField
                label="Quantity"
                type="number"
                name="quantity"
                value={quantity}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  width: "auto",
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                }}
              />
            </Box>

            <ReactQuill
              theme="snow"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Write something here..."
              style={{ height: "200px", marginBottom: "50px" }}
            />
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProductModal
