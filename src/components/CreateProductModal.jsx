/* eslint-disable react/prop-types */
import { useState, useRef } from "react"
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Input,
} from "@mui/material"
import { IoMdClose } from "react-icons/io"
import { MdOutlineFileUpload } from "react-icons/md"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import axiosInstance from "../configs/api"
import Toast from "./Toast"

const CreateProductModal = ({ openModal, handleCloseModal, refetch }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
    image: null,
  })
  const [openToast, setOpenToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastStatus, setToastStatus] = useState("")

  const inputFileRef = useRef()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file,
    }))
  }

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpenToast(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formDataToSend = new FormData()

      formDataToSend.append("name", formData.name)
      formDataToSend.append("price", formData.price)
      formDataToSend.append("quantity", formData.quantity)
      formDataToSend.append("category", formData.category)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("image", formData.image)

      if (formData.description.length > 500) {
        setToastMessage("Maximum character is 500")
        setToastStatus("error")
        setOpenToast(true)
      }

      await axiosInstance.post("product", formDataToSend)
      handleCloseModal()

      await refetch()
      setToastMessage("Success create new product")
      setToastStatus("success")
      setOpenToast(true)

      setFormData({
        name: "",
        price: "",
        quantity: "",
        category: "",
        description: "",
        image: null,
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="lg">
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create New Product
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <IoMdClose />
        </IconButton>
        <DialogContent dividers>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "15px",
              mb: "15px",
            }}
          >
            <TextField
              label="Product Name"
              name="name"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                width: "auto",
              }}
              onChange={handleChange}
              value={formData.name}
            />
            <TextField
              label="Price"
              type="number"
              name="price"
              value={formData.price}
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
              value={formData.quantity}
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
            <FormControl>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  width: "auto",
                }}
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <MenuItem value="TSHIRTS">T-Shirts</MenuItem>
                <MenuItem value="JEANS">Jeans</MenuItem>
                <MenuItem value="JACKETS">Jackets</MenuItem>
                <MenuItem value="SHOES">Shoes</MenuItem>
                <MenuItem value="ACCESSORIES">Accessories</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={(content) =>
              setFormData({ ...formData, description: content })
            }
            placeholder="Write something here..."
            style={{
              height: "200px",
              marginBottom: "50px",
              width: "100%",
              maxWidth: "460px",
              wordWrap: "break-word",
              overflow: "hidden",
            }}
          />

          <Box
            sx={{
              gridColumn: "span 2",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mt: "20px",
            }}
          >
            <Button
              component="label"
              variant="outlined"
              startIcon={<MdOutlineFileUpload />}
              sx={{
                color: "black",
                border: "none",
                width: "50%",
              }}
            >
              Upload file
              <Input
                type="file"
                sx={{ display: "none" }}
                ref={inputFileRef}
                required
                onChange={handleFileChange}
              />
            </Button>
            <Button
              sx={{ width: "50%" }}
              variant="contained"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
          <Box
            position={"relative"}
            mb={"10px"}
            mt={"20px"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {formData.image && (
              <>
                <Box
                  component="img"
                  sx={{ height: "300px", width: "400px" }}
                  src={URL.createObjectURL(formData.image)}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "40px",
                    color: "red",
                  }}
                  onClick={() => {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      image: null,
                    }))
                  }}
                >
                  <IoMdClose />
                </IconButton>
              </>
            )}
          </Box>
        </DialogContent>
      </Dialog>
      <Toast
        open={openToast}
        status={toastStatus}
        close={handleClose}
        message={toastMessage}
      />
    </>
  )
}

export default CreateProductModal
