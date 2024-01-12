import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import useAppSelector from "../../../hooks/useAppSelector";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SendIcon from "@mui/icons-material/Send";
import useAppDispatch from "../../../hooks/useAppDispatch";

import { Category } from "../../../types/Categories";
import { CategoryUpdate } from "../../../types/dashboard/Category";
import { updateCategory } from "../../../api/CategoryFetch";

interface IFormInput {
  name?: string;
  image?: string;
}

const schema = yup.object({
  name: yup.string().required("Title is required"),
  image: yup.string(),
});
type CategoryType = {
  category: Category;
  close: () => void;
};
export default function CategoryUpdateForm({ category, close }: CategoryType) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.credentialReducer.token);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: category?.name,
      image: category?.image,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const formattedData: CategoryUpdate = {
      _id: category._id,
      name: data.name,
      image: data.image,
      token: token?.accessToken,
    };
    dispatch(updateCategory(formattedData));

    close();
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
          Update Category
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
            Update
          </Button>
        </Box>
      </Box>
    </form>
  );
}
