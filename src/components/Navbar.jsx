import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { FaRegUser, FaUser } from "react-icons/fa"
import { IoSearch } from "react-icons/io5"
import { MdLogout } from "react-icons/md"

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#25293c",
          height: "7vh",
          px: "30px",
          width: "screen",
        }}
      >
        <Box sx={{ cursor: "pointer", color: "white" }}>
          <Typography>Dashboard</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <Box sx={{ position: "relative" }}>
            <IconButton sx={{ left: "14%" }}>
              <IoSearch fontSize="small" color="white" />
            </IconButton>
            <InputBase
              sx={{
                flex: 1,
                paddingY: "2px",
                paddingLeft: "28px",
                fontSize: "14px",
                height: "36px",
                color: "white",
                border: "1px solid white",
                borderRadius: "4px",
                "&::placeholder": {
                  color: "white",
                  paddingLeft: "50px",
                },
              }}
              placeholder="Search"
            />
          </Box>
          <Box>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <FaUser size="18px" color="white" />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem sx={{ gap: "20px", px: "20px" }}>
          <FaRegUser /> My Account
        </MenuItem>
        <Divider />
        <MenuItem sx={{ gap: "20px", px: "20px" }}>
          <MdLogout /> Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default Navbar
