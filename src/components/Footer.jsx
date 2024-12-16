import { Box, Typography } from "@mui/material"

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FDFBFD",
        textAlign: "center",
        padding: "20px 0",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} All rights reserved.
      </Typography>
    </Box>
  )
}

export default Footer
