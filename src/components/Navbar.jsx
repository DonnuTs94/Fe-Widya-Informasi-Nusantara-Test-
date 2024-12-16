import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { FaRegUser, FaUser } from "react-icons/fa"
import { MdLogout } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import UserDetailModal from "./UserDetailModal"

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openProfileModal, setOpenProfileModal] = useState(false)

  const navigate = useNavigate()

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    navigate("/auth")
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#FDFBFD",
          height: "7vh",
          px: "30px",
          width: "97.8%",
        }}
      >
        <Box sx={{ cursor: "pointer", color: "black" }}>
          <Typography>Dashboard</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <Box>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <FaUser size="18px" color="black" />
            </IconButton>
          </Box>
        </Box>
        <UserDetailModal
          open={openProfileModal}
          handleClose={() => setOpenProfileModal(false)}
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem
          onClick={() => setOpenProfileModal(true)}
          sx={{ gap: "20px", px: "20px" }}
        >
          <FaRegUser /> My Account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ gap: "20px", px: "20px" }}>
          <MdLogout /> Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default Navbar
