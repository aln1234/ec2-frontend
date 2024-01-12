import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
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
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";

import { userLogin, userProfile } from "../api/userLogin";

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email is not correct")
      .required("Email is required"),
    password: yup.string().required("No password provided."),
  })
  .required();

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const token = useAppSelector((state) => state.credentialReducer.token);
  const dispatch = useAppDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(userLogin(data));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (token?.accessToken) {
      dispatch(userProfile(token?.accessToken));
      navigate("/");
    }
  }, [dispatch, navigate, token?.accessToken]);

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
          name="email"
          control={control}
          render={({ field }) => (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  id="standard-start-adornment"
                  {...field}
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

        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
