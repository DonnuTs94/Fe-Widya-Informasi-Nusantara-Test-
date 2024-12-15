/* eslint-disable react/prop-types */
import { Alert, Snackbar } from "@mui/material"

const Toast = ({ open, status, message, close }) => {
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={close}
      >
        <Alert variant="filled" severity={status}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Toast
