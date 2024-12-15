/* eslint-disable no-unused-vars */
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material"
import { IoIosAddCircleOutline } from "react-icons/io"
import axiosInstance from "../configs/api"
import { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { HiDotsVertical } from "react-icons/hi"

const Product = () => {
  const [products, setProducts] = useState([])
  // const [page, setPage] = useState(1)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
  })
  const [pageSize, setPageSize] = useState(null)
  const [totalData, setTotalData] = useState(0)

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
    // console.log("Fetching data for page:", page)
    getProductData()
  }, [paginationModel])
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
              onPaginationModelChange={setPaginationModel}
              autoPageSize
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Product
