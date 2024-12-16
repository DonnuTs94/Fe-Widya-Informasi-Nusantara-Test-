/* eslint-disable react/prop-types */
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material"
import axiosInstance from "../configs/api"

const DeleteConfirmationModal = ({ open, handleClose, product, refetch }) => {
  const handleDelete = async () => {
    try {
      const response = await axiosInstance.put(`/product/${product.id}/delete`)

      handleClose()
      await refetch()

      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  return (
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
            variant="contained"
            onClick={handleDelete}
            sx={{ color: "white", bgcolor: "green" }}
          >
            Submit
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{ color: "white", bgcolor: "red" }}
          >
            Cancel
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteConfirmationModal
