import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import SendIcon from "@mui/icons-material/Send";
import * as yup from "yup";
import useAppDispatch from "../hooks/useAppDispatch";

import { UpdateUserType, UserType } from "../types/AuthType";
import { userUpdateProfile } from "../api/userLogin";
import { useState } from "react";
import useAppSelector from "../hooks/useAppSelector";

interface IFormInput {
  firstName?: string;
  lastName?: string;
  phoneNumber?: number;
  role: string;
  avatar?: string;
}

const schema = yup
  .object({
    firstName: yup.string(),
    lastName: yup.string(),
    phoneNumber: yup.number(),
    role: yup.string().required("Role is required"),
    avatar: yup.string(),
  })
  .required();

type UserPropsType = {
  user: UserType;
};

const UserUpdateForm = ({ user }: UserPropsType) => {
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      phoneNumber: user?.phoneNumber,
      role: user.role,
      avatar: user?.avatar,
    },
    resolver: yupResolver(schema),
  });
  const [role, setRole] = useState<string>(user.role);
  const token = useAppSelector((state) => state.credentialReducer.token);
  const dispatch = useAppDispatch();

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (token) {
      const formattedData: UpdateUserType = {
        _id: user?._id,
        firstName: data?.firstName,
        lastName: data?.lastName,
        phoneNumber: data?.phoneNumber,
        role: role,
        avatar: data?.avatar,
        token: token.accessToken,
      };
      dispatch(userUpdateProfile(formattedData));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          gap: "1rem",
          marginTop: "0rem",

          width: "100%",
        }}
      >
        <Typography variant="h5" align="center" sx={{ paddingBottom: "2rem" }}>
          Update User
        </Typography>
        <Grid
          container
          spacing={4}
          sx={{
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "flex-start",
          }}
        >
          <Grid item xs={12} md={3}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <InputLabel htmlFor="component-simple">
                      First Name
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      variant="outlined"
                      {...field}
                    />
                  </Box>
                  <FormHelperText
                    id="component-error-text"
                    sx={{ color: "red" }}
                  >
                    {errors.firstName?.message}
                  </FormHelperText>
                </Box>
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <InputLabel htmlFor="component-simple">
                      Last Name
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      variant="outlined"
                      {...field}
                    />
                  </Box>
                  <FormHelperText
                    id="component-error-text"
                    sx={{ color: "red" }}
                  >
                    {errors.lastName?.message}
                  </FormHelperText>
                </Box>
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <InputLabel htmlFor="component-simple">
                      Phone Number
                    </InputLabel>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      {...field}
                      fullWidth
                    />
                  </Box>
                  <FormHelperText
                    id="component-error-text"
                    sx={{ color: "red" }}
                  >
                    {errors.phoneNumber?.message}
                  </FormHelperText>
                </Box>
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                        paddingTop: "1.5rem",
                      }}
                    >
                      {/* <FormControl sx={{ marginBottom: "2rem", width: 150 }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Role
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={role}
                          label="rows"
                          onChange={handleRoleChange}
                        >
                          <MenuItem value={"ADMIN"}>Admin</MenuItem>
                          <MenuItem value={"USER"}>User</MenuItem>
                        </Select>
                      </FormControl> */}
                    </Box>
                  </Box>
                </Box>
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box>
                    <InputLabel htmlFor="component-simple">Avatar</InputLabel>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      {...field}
                      fullWidth
                    />
                  </Box>
                  <FormHelperText
                    id="component-error-text"
                    sx={{ color: "red" }}
                  >
                    {errors.avatar?.message}
                  </FormHelperText>
                </Box>
              )}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Update
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default UserUpdateForm;
