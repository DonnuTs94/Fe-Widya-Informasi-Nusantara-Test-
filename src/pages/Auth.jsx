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
import { useNavigate } from "react-router-dom"

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

  const navigate = useNavigate()

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
      navigate("/admin")
    } catch (err) {
      setToastMessage("Login failed. Please try again.")
      setToastStatus("error")
      setOpenToast(true)

      if (err.response.data.status === 401) {
        setToastMessage("Invalid email or password")
        setToastStatus("error")
        setOpenToast(true)
      }
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
          bgcolor: "#EEECEE",
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
            bgcolor: "#FDFBFD",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ position: "relative", top: "15%" }}>
            <Box
              sx={{
                textAlign: "center",
                color: "black",
                fontSize: "30px",
                mb: "-5px",
              }}
            >
              <IoEnterOutline />
            </Box>

            <Typography
              sx={{
                color: "black",
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
              top: "20%",
              gap: "30px",
              position: "relative",
              alignItems: "center",
            }}
          >
            {variant === "login" && (
              <>
                <TextField
                  label="Email"
                  style={{ color: "black" }}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    width: "50%",
                  }}
                />
                <TextField
                  label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    width: "50%",
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  sx={{ height: "40px", width: "50%" }}
                  onKeyPress={(e) => e.key === "Enter"}
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
                    label="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      width: "auto",
                    }}
                  />
                  <TextField
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      width: "auto",
                    }}
                  />
                  <TextField
                    label="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      width: "auto",
                    }}
                  />
                  <TextField
                    label="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                    }}
                  />
                </Box>
                <FormControl sx={{ width: "53%" }}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    label="Gender"
                    onChange={(e) => setGender(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      width: "auto",
                    }}
                  >
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  onClick={handleRegister}
                  sx={{ height: "50px", width: "53%" }}
                  onKeyPress={(e) => e.key === "Enter"}
                >
                  Sign Up
                </Button>
              </>
            )}

            <Typography>
              {variant === "login"
                ? "Don't have an account?"
                : "Already have an account?"}

              <Link
                sx={{ ml: "8px", cursor: "pointer" }}
                onClick={toggleVariant}
              >
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
