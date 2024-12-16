import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material"
import { IoIosAddCircleOutline } from "react-icons/io"
import { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { HiDotsVertical } from "react-icons/hi"
import CreateProductModal from "./CreateProductModal"
import DetailProductModal from "./DetailProductModal"
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md"
import DeleteConfirmationModal from "./DeleteConfirmationModal"
import UpdateProductModal from "./updateProductModal"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts, setSearchQuery } from "../redux/productSlice"
import { IoSearch } from "react-icons/io5"

const Product = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openEditProductModal, setOpenEditProductModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  })

  const open = Boolean(anchorEl)
  const dispatch = useDispatch()

  const { products, totalItems, currentPage, searchQuery, isLoading } =
    useSelector((state) => state.products)

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchSubmit = () => {
    dispatch(setSearchQuery(searchTerm))
    dispatch(fetchProducts({ searchQuery: searchTerm, page: 1, pageSize: 7 })) // Fetch products with search term
  }

  useEffect(() => {
    dispatch(
      fetchProducts({
        searchQuery,
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
      })
    )
  }, [dispatch, searchQuery, paginationModel])

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
    {
      field: "createdAt",
      headerName: "Created at",
      flex: 1,
      renderCell: (params) => {
        return new Date(params.row.createdAt).toLocaleDateString()
      },
    },
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
            sx={{ color: "white", gap: "10px", height: "40px" }}
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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
              Products
            </Typography>
            <Box sx={{ position: "relative" }}>
              <IconButton sx={{ left: "14%" }} onClick={handleSearchSubmit}>
                <IoSearch fontSize="small" color="black" />
              </IconButton>
              <InputBase
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit()}
                sx={{
                  flex: 1,
                  paddingY: "2px",
                  paddingLeft: "28px",
                  fontSize: "14px",
                  height: "36px",
                  color: "black",
                  border: "1px solid black",
                  borderRadius: "4px",
                  "&::placeholder": {
                    color: "black",
                  },
                }}
                placeholder="Search products"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchSubmit()
                  }
                }}
              />
            </Box>
          </Box>
          <Box sx={{ width: "100%", mt: "20px" }}>
            <DataGrid
              rows={products}
              columns={columns}
              pageSize={paginationModel.pageSize}
              rowCount={totalItems}
              paginationMode="server"
              paginationModel={paginationModel}
              onPaginationModelChange={(model) => setPaginationModel(model)}
              onRowClick={handleRowClick}
              loading={isLoading}
              disableSelectionOnClick
              style={{
                height: paginationModel.pageSize * 66,
              }}
            />
          </Box>
        </Box>
        <CreateProductModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          refetch={() =>
            dispatch(fetchProducts({ searchQuery, page: currentPage }))
          }
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
          refetch={() =>
            dispatch(fetchProducts({ searchQuery, page: currentPage }))
          }
        />

        <UpdateProductModal
          open={openEditProductModal}
          handleClose={() => setOpenEditProductModal(false)}
          product={selectedProduct}
          refetch={() =>
            dispatch(fetchProducts({ searchQuery, page: currentPage }))
          }
        />
      </Box>
    </>
  )
}

export default Product
