import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { yupResolver } from "@hookform/resolvers/yup";
import SendIcon from "@mui/icons-material/Send";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import useAppDispatch from "../hooks/useAppDispatch";

import { registerUser } from "../api/userRegister";
import { RegisterDataType } from "../types/AuthType";

interface IFormInput {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  avatar?: string;
}

const schema = yup
  .object({
    firstName: yup.string().required("first Name is required"),
    lastName: yup.string().required("first Name is required"),
    email: yup
      .string()
      .email("Email is not correct")
      .required("Email is required"),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match"),
    avatar: yup.string(),
    phoneNumber: yup.string(),
  })
  .required();

const RegisterForm = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: "",
    },
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const formattedData: any = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: Number(data.phoneNumber),
      password: data.password,
      avatar: data.avatar,
    };
    dispatch(registerUser(formattedData));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  id="standard-basic"
                  placeholder="First Name"
                  variant="standard"
                  {...field}
                  sx={{ m: 1, width: "25ch" }}
                />
              </Box>
              <FormHelperText id="component-error-text" sx={{ color: "red" }}>
                {errors.firstName?.message}
              </FormHelperText>
            </Box>
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  id="standard-basic"
                  placeholder="Last Name"
                  variant="standard"
                  {...field}
                  sx={{ m: 1, width: "25ch" }}
                />
              </Box>
              <FormHelperText id="component-error-text" sx={{ color: "red" }}>
                {errors.lastName?.message}
              </FormHelperText>
            </Box>
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  id="standard-basic"
                  placeholder="Phone Number"
                  variant="standard"
                  {...field}
                  sx={{ m: 1, width: "25ch" }}
                  type="number"
                />
              </Box>
              <FormHelperText id="component-error-text" sx={{ color: "red" }}>
                {errors.lastName?.message}
              </FormHelperText>
            </Box>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  id="standard-start-adornment"
                  {...field}
                  placeholder="Email Address"
                  sx={{ m: 1, width: "25ch" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
              </Box>
              <FormHelperText id="component-error-text" sx={{ color: "red" }}>
                {errors.email?.message}
              </FormHelperText>
            </Box>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                {...field}
                placeholder="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id="component-error-text" sx={{ color: "red" }}>
                {errors.password?.message}
              </FormHelperText>
            </Box>
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Input
                type={showPassword ? "text" : "password"}
                {...field}
                placeholder="Confirm password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id="component-error-text" sx={{ color: "red" }}>
                {errors.confirmPassword?.message}
              </FormHelperText>
            </Box>
          )}
        />
        <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  id="standard-basic"
                  placeholder="Avatar Link"
                  variant="standard"
                  {...field}
                  sx={{ m: 1, width: "25ch" }}
                />
              </Box>
              <FormHelperText id="component-error-text" sx={{ color: "red" }}>
                {errors.avatar?.message}
              </FormHelperText>
            </Box>
          )}
        />

        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
