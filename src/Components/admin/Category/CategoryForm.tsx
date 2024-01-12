import { useForm, Controller, SubmitHandler } from "react-hook-form";

import useAppDispatch from "../../../hooks/useAppDispatch";

import {
  Box,
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import SendIcon from "@mui/icons-material/Send";
import * as yup from "yup";

import { createCategory } from "../../../api/CategoryFetch";

interface IFormInput {
  name: string;
  image?: string;
}

const schema = yup.object({
  name: yup.string().required("Title is required"),
  image: yup.string(),
});

const CategoryForm = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      image: "",
    },
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const formattedData: any = {
      name: data.name,
      image: data.image,
    };
    dispatch(createCategory(formattedData));
    reset();
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
          Create Category
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
          <Grid item xs={12} md={6}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <InputLabel htmlFor="component-simple">Title</InputLabel>
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
                    {errors.name?.message}
                  </FormHelperText>
                </Box>
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <InputLabel htmlFor="component-simple">Image</InputLabel>
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
                    {errors.image?.message}
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
            Create
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default CategoryForm;
