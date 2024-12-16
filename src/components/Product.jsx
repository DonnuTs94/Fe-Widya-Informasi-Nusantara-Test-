import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material"
import { IoIosAddCircleOutline } from "react-icons/io"
import axiosInstance from "../configs/api"
import { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { HiDotsVertical } from "react-icons/hi"
import CreateProductModal from "./CreateProductModal"
import DetailProductModal from "./DetailProductModal"
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md"
import DeleteConfirmationModal from "./DeleteConfirmationModal"
import UpdateProductModal from "./updateProductModal"

const Product = () => {
  const [products, setProducts] = useState([])
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  })
  const [pageSize, setPageSize] = useState(null)
  const [totalData, setTotalData] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openEditProductModal, setOpenEditProductModal] = useState(false)

  const open = Boolean(anchorEl)

  const handleOpenMenu = (event, product) => {
    setAnchorEl(event.currentTarget)
    setSelectedProduct(product)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleRowClick = (params) => {
    setSelectedProduct(params.row)
    setOpenDetailModal(true)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const getProductData = async () => {
    try {
      const response = await axiosInstance.get(
        `/product?page=${paginationModel.page + 1}`
      )
      setProducts(response.data.data)
      setPageSize(response.data.pageSize)
      setTotalData(response.data.totalItems)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProductData()
  }, [paginationModel])

  // console.log(selectedProduct)

  const columns = [
    {
      field: "image",
      headerName: "",
      width: 80,
      sortable: false,
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
            onClick={(e) => {
              e.stopPropagation()
              handleOpenMenu(e, params.row)
            }}
          >
            <HiDotsVertical />
          </IconButton>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                handleCloseMenu()
                setOpenEditProductModal(true)
              }}
              sx={{ gap: 2 }}
            >
              <MdOutlineEdit /> Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMenu()
                setOpenDeleteConfirmationModal(true)
              }}
              sx={{ gap: 2 }}
            >
              <MdOutlineDelete />
              Delete
            </MenuItem>
          </Menu>
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
            mt: "40px",
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
              onPaginationModelChange={setPaginationModel}
              autoPageSize
              onRowClick={handleRowClick}
              disableSelectionOnClick
            />
          </Box>
        </Box>
        <CreateProductModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          refetch={getProductData}
        />

        <DetailProductModal
          open={openDetailModal}
          handleClose={() => setOpenDetailModal(false)}
          product={selectedProduct}
        />

        <DeleteConfirmationModal
          open={openDeleteConfirmationModal}
          handleClose={() => setOpenDeleteConfirmationModal(false)}
          product={selectedProduct}
          refetch={getProductData}
        />

        <UpdateProductModal
          open={openEditProductModal}
          handleClose={() => setOpenEditProductModal(false)}
          product={selectedProduct}
          refetch={getProductData}
        />
      </Box>
    </>
  )
}

export default Product
