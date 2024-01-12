import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useCallback, useState } from "react";
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
  TextField,
  Typography,
} from "@mui/material";
import useAppSelector from "../../../hooks/useAppSelector";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SendIcon from "@mui/icons-material/Send";
import useAppDispatch from "../../../hooks/useAppDispatch";

import { Product } from "../../../types/Product";
import { ProductUpdateType } from "../../../types/dashboard/Product";
import { updateProduct } from "../../../api/productFetch";

interface IFormInput {
  name?: string;
  price: number;
  description?: string | undefined;
  image1?: string;
  image2?: string;
  image3?: string;
  stock?: number;
}

const schema = yup.object({
  name: yup.string().required("Title is required"),
  price: yup.number().required("Price is required"),
  description: yup.string(),
  image1: yup.string(),
  image2: yup.string(),
  image3: yup.string(),
  stock: yup.number(),
});
type ProductType = {
  product: Product;
  close: () => void;
};
export default function ProductUpdateForm({ product, close }: ProductType) {
  const [categoryId, setCategoryId] = useState<string>(product.categoryId._id);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.credentialReducer.token);
  const { categories } = useAppSelector((state) => state.categoryReducer);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product?.name,
      price: product?.price,
      description: product?.description,
      image1: product.images[0],
      image2: product.images[1],
      image3: product.images[2],
      stock: product?.stock,
    },
    resolver: yupResolver(schema),
  });

  const handleCategory = useCallback((e: SelectChangeEvent) => {
    setCategoryId(e.target.value);
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const images: string[] = [];

    if (typeof data.image1 !== "undefined") {
      images.push(data.image1);
    }
    if (typeof data.image2 !== "undefined") {
      images.push(data.image2);
    }
    if (typeof data.image3 !== "undefined") {
      images.push(data.image3);
    }
    const formattedData: ProductUpdateType = {
      name: data.name,
      price: Number(data.price),
      description: data.description,
      categoryId: categoryId,
      images,
      stock: data.stock,
      _id: product._id,
      token: token?.accessToken as string,
    };

    dispatch(updateProduct(formattedData));

    close();
  };

  // const memoizedCategories = useMemo(() => categories, [categories]);

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
          Create Product
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
          <Grid item xs={12} md={4}>
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
          <Grid item xs={12} md={4}>
            <Controller
              name="price"
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
                    <InputLabel htmlFor="component-simple">Price</InputLabel>
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
                    {errors.price?.message}
                  </FormHelperText>
                </Box>
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller
              name="stock"
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
                    <InputLabel htmlFor="component-simple">Stock</InputLabel>
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
                    {errors.stock?.message}
                  </FormHelperText>
                </Box>
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Controller
              name="image1"
              control={control}
              render={({ field }) => (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box>
                    <InputLabel htmlFor="component-simple">Image 1</InputLabel>
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
                    {errors.image3?.message}
                  </FormHelperText>
                </Box>
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller
              name="image2"
              control={control}
              render={({ field }) => (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box>
                    <InputLabel htmlFor="component-simple">Image 2</InputLabel>
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
                    {errors.image3?.message}
                  </FormHelperText>
                </Box>
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Controller
              name="image3"
              control={control}
              render={({ field }) => (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box>
                    <InputLabel htmlFor="component-simple">Image 3</InputLabel>
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
                    {errors.image3?.message}
                  </FormHelperText>
                </Box>
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl sx={{ minWidth: 280, marginTop: "1.5rem" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={categoryId}
                label="rows"
                onChange={handleCategory}
              >
                {categories.map((category) => (
                  <MenuItem value={category._id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="description"
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
                    <InputLabel htmlFor="component-simple">
                      Description
                    </InputLabel>
                    <TextField
                      id="outlined-multiline-static"
                      multiline
                      rows={4}
                      defaultValue=""
                      {...field}
                      fullWidth
                    />
                  </Box>
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
