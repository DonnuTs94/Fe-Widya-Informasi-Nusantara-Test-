/* eslint-disable react/prop-types */
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material"
import axiosInstance from "../configs/api"
import Toast from "./Toast"
import { useState } from "react"

const DeleteConfirmationModal = ({ open, handleClose, product, refetch }) => {
  const [openToast, setOpenToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastStatus, setToastStatus] = useState("")

  const handleDelete = async () => {
    try {
      await axiosInstance.put(`/product/${product.id}/delete`)

      handleClose()
      await refetch()

      setToastMessage("Success update image product")
      setToastStatus("success")
      setOpenToast(true)
    } catch (err) {
      console.log(err)
    }
  }

  const handleCloseToast = (reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpenToast(false)
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogContent sx={{ my: "20px" }}>
          <Typography>Are you sure want delete this product?</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: "20px",
              gap: "10px",
            }}
          >
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{ color: "white", bgcolor: "red" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleDelete}
              sx={{ color: "white" }}
            >
              Submit
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Toast
        open={openToast}
        status={toastStatus}
        close={handleCloseToast}
        message={toastMessage}
      />
    </>
  )
}

export default DeleteConfirmationModal
