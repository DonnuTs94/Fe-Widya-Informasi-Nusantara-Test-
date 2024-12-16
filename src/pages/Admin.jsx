import { Box } from "@mui/material"
import Navbar from "../components/Navbar"
import Product from "../components/Product"
import Footer from "../components/Footer"

const Admin = () => {
  return (
    <>
      <Box>
        <Navbar />
        <Box
          display="flex"
          position="relative"
          sx={{ width: "100vw", height: "100vh", bgcolor: "grey" }}
        >
          <Box
            sx={{
              position: "relative",
              px: "30px",
              top: "20px",
              width: "100%",
            }}
          >
            <Product />
          </Box>
          <Footer />
        </Box>
      </Box>
    </>
  )
}

export default Admin
