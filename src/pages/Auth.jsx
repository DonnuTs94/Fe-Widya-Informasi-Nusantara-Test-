/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { useCallback, useState } from "react"
import { IoEnterOutline } from "react-icons/io5"
import axiosInstance from "../configs/api"
import Toast from "../components/Toast"

const Auth = () => {
  const [variant, setVariant] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [gender, setGender] = useState("")
  const [openToast, setOpenToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastStatus, setToastStatus] = useState("")

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    )
  })

  const handleRegister = async () => {
    try {
      await axiosInstance.post("/user/register", {
        email,
        password,
        firstName,
        lastName,
        gender,
      })

      setToastMessage("Registration successful!")
      setToastStatus("success")
      setOpenToast(true)
      setVariant("login")
    } catch (err) {
      setToastMessage("Registration failed. Please try again.")
      setToastStatus("error")
      setOpenToast(true)

      console.log(err)
    }
  }

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      })

      localStorage.setItem("auth_token", response.data.token)

      setToastMessage("Login successful!")
      setToastStatus("success")
      setOpenToast(true)
    } catch (err) {
      setToastMessage("Login failed. Please try again.")
      setToastStatus("error")
      setOpenToast(true)

      console.log(err)
    }
  }

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpenToast(false)
  }

  return (
    <>
      <Box
        sx={{
          width: screen,
          height: "100vh",
          bgcolor: "#25293c",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "relative",
            top: "15%",
            left: "25%",
            width: "50vw",
            height: "70vh",
            bgcolor: "#2F3349",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ position: "relative", top: "5%" }}>
            <Box
              sx={{
                textAlign: "center",
                color: "white",
                fontSize: "30px",
                mb: "-5px",
              }}
            >
              <IoEnterOutline />
            </Box>

            <Typography
              sx={{
                color: "white",
                textAlign: "center",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              Welcome!
            </Typography>
            <Typography
              sx={{
                color: "gray",
                textAlign: "center",
                fontSize: "18px",
              }}
            >
              {variant === "login"
                ? "Sign in to your account"
                : "Register your account"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mx: "8%",
              top: "10%",
              gap: "30px",
              position: "relative",
              alignItems: "center",
            }}
          >
            {variant === "login" && (
              <>
                <TextField
                  label="Email"
                  style={{ color: "white" }}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    width: "50%",
                  }}
                />
                <TextField
                  label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    width: "50%",
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  sx={{ height: "40px", width: "50%" }}
                >
                  Login
                </Button>
              </>
            )}
            {variant === "register" && (
              <>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "15px",
                  }}
                >
                  <TextField
                    label="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      width: "auto",
                    }}
                  />
                  <TextField
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      width: "auto",
                    }}
                  />
                  <TextField
                    label="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      width: "auto",
                    }}
                  />
                  <TextField
                    label="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    }}
                  />
                  <FormControl>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      label="Gender"
                      onChange={(e) => setGender(e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "white",
                        },
                        width: "auto",
                      }}
                    >
                      <MenuItem value="MALE">Male</MenuItem>
                      <MenuItem value="FEMALE">Female</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Button
                  variant="contained"
                  onClick={handleRegister}
                  sx={{ height: "40px", width: "58%" }}
                >
                  Sign Up
                </Button>
              </>
            )}

            <Typography>
              {variant === "login"
                ? "Don't have an account?"
                : "Already have an account?"}

              <Link sx={{ ml: "8px" }} onClick={toggleVariant}>
                {variant === "login" ? "Sign Up" : "Sign In"}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Toast
        open={openToast}
        status={toastStatus}
        close={handleClose}
        message={toastMessage}
      />
    </>
  )
}

export default Auth
