/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material"
import axiosInstance from "../configs/api"
import { useEffect, useState } from "react"
import { MdOutlineEmail } from "react-icons/md"
import { TbGenderFemale, TbGenderMale } from "react-icons/tb"
import { IoMdClose } from "react-icons/io"

const UserDetailModal = ({ open, handleClose }) => {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [gender, setGender] = useState("")

  const getUserDetail = async () => {
    try {
      const response = await axiosInstance.get("user/profile")
      setEmail(response.data.data.email)
      setFirstName(response.data.data.firstName)
      setLastName(response.data.data.lastName)
      setGender(response.data.data.gender)
    } catch (err) {
      console.log(err)
    }
  }

  const renderGenderIcon = () => {
    if (gender === "Male") return <TbGenderMale />
    if (gender === "Female") return <TbGenderFemale />
    return null
  }

  useEffect(() => {
    getUserDetail()
  }, [])

  return (
    <>
      <Dialog open={open} handleClose={handleClose} fullWidth="lg">
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "24px" }}>
          User Details
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <IoMdClose />
          </IconButton>
        </DialogTitle>

        <Divider />
        <DialogContent
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <MdOutlineEmail /> {email}
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {renderGenderIcon()} {gender}{" "}
          </Typography>
          <Typography sx={{ fontSize: "18px" }}>
            First Name: {firstName}
          </Typography>
          <Typography sx={{ fontSize: "18px" }}>
            Last Name: {lastName}{" "}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UserDetailModal
