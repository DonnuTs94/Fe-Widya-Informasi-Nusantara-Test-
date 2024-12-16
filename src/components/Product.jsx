import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { IoIosAddCircleOutline, IoMdClose } from "react-icons/io"
import axiosInstance from "../configs/api"
import { useEffect, useRef, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { HiDotsVertical } from "react-icons/hi"
import { MdOutlineFileUpload } from "react-icons/md"
import "react-quill/dist/quill.snow.css" // Snow theme CSS
import ReactQuill from "react-quill"

const Product = () => {
  const [products, setProducts] = useState([])
  // const [page, setPage] = useState(1)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  })
  const [pageSize, setPageSize] = useState(null)
  const [totalData, setTotalData] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    image: "",
  })

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

      const response = await axiosInstance.post("product", formDataToSend)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prevFromData) => ({
      ...prevFromData,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    console.log(file)

    setFormData((prevFromData) => ({
      ...prevFromData,
      image: file,
    }))
  }

  console.log(formData)

  const inputFileRef = useRef()

  const getProductData = async () => {
    try {
      const response = await axiosInstance.get(
        `/product?page=${paginationModel.page + 1}`
      )
      setProducts(response.data.data)
      setPageSize(response.data.pageSize)
      setTotalData(response.data.totalItems)

      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    // console.log("Fetching data for page:", page)
    getProductData()
  }, [paginationModel])

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const columns = [
    {
      field: "image",
      headerName: "",
      width: 80,
      renderCell: (params) => (
        <Avatar
          variant="rounded"
          src={`http://localhost:8000/public/${params.row.image}`}
          alt={params.row.name}
          sx={{ width: 50, height: 50 }}
        />
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "createdAt", headerName: "Created at", flex: 1 },
    {
      field: "actions",
      headerName: "",
      width: 50,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
          // onClick={(event) => handleMenuOpen(event, params.row)}
          >
            <HiDotsVertical />
          </IconButton>
        </>
      ),
    },
  ]

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
            onClick={handleOpenModal}
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
          <Box sx={{ width: "100%", mt: "20px" }}>
            <DataGrid
              rows={products}
              columns={columns}
              pageSize={pageSize}
              rowCount={totalData}
              paginationMode="server"
              // onPageChange={(newPage) => {
              //   console.log("New Page Index:", newPage) // Debug
              //   setPage(newPage + 1) // Convert zero-based index to one-based index
              // }}
              // onPageSizeChange={(newSize) => {
              //   console.log("Page Size Changed:", newSize) // Debug
              //   setPageSize(newSize)
              // }}
              onPaginationModelChange={setPaginationModel}
              autoPageSize
              // autoHeight
            />
          </Box>
        </Box>
      </Box>

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
              gridTemplateColumns: "repeat(2, 1fr)", // 2-column grid
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
              }}
            />
            <TextField
              label="quantity"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                width: "auto",
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
                <MenuItem value="PRODUCT_A">Product A</MenuItem>
                <MenuItem value="PRODUCT_B">Product B</MenuItem>
                <MenuItem value="PRODUCT_C">Product C</MenuItem>
                <MenuItem value="PRODUCT_D">Product D</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <ReactQuill
            theme="snow" // The "snow" theme is the default
            value={formData.description} // Content of the editor
            onChange={(content) =>
              setFormData({ ...formData, description: content })
            } // Handle content changes
            placeholder="Write something here..."
            style={{ height: "200px", marginBottom: "50px" }} // Customize editor height
          />

          <Box
            sx={{
              gridColumn: "span 2", // Spans across both columns
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2, // Space between the buttons
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
              }}
            >
              Upload file
              <Input
                type="file"
                inputProps={{ multiple: true }}
                sx={{ display: "none" }}
                ref={inputFileRef}
                required
                onChange={handleFileChange}
              />
            </Button>
            <Button
              sx={{ width: "30%" }}
              color="success"
              variant="contained"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseModal}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Product
