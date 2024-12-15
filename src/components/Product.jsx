import { Avatar, Box, Button, Typography } from "@mui/material"
import { IoIosAddCircleOutline } from "react-icons/io"
import axiosInstance from "../configs/api"
import { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"

const Product = () => {
  const [products, setProducts] = useState([])

  const getProductData = async () => {
    try {
      const response = await axiosInstance.get("/product?page=1")
      setProducts(response.data.data)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProductData()
  }, [])

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
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 120,
    //   renderCell: () => (
    //     <Typography
    //       variant="body2"
    //       color="success.main"
    //       sx={{ fontWeight: 600 }}
    //     >
    //       Active
    //     </Typography>
    //   ),
    // },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "createdAt", headerName: "Created at", flex: 1 },
    //  {
    //    field: "actions",
    //    headerName: "",
    //    width: 50,
    //    sortable: false,
    //    renderCell: (params) => (
    //      <>
    //        <IconButton onClick={(event) => handleMenuOpen(event, params.row)}>
    //          <MoreVertIcon />
    //        </IconButton>
    //      </>
    //    ),
    //  },
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
          <Box>
            <DataGrid
              rows={products}
              columns={columns}
              // pageSize={pageSize}
              // rowCount={totalPages * pageSize}
              paginationMode="server"
              // onPageChange={(newPage) => setPage(newPage + 1)} // MUI's page is 0-indexed
              // onPageSizeChange={(newSize) => setPageSize(newSize)}
              autoHeight
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Product
