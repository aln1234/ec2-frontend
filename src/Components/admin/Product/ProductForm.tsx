import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
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

import { ProductCreateType } from "../../../types/dashboard/Product";
import { createProduct } from "../../../api/productFetch";
import { toast } from "react-toastify";

interface IFormInput {
  name: string;
  price: string;
  description?: string | undefined;
  image?: string;
  stock?: number;
}

const schema = yup.object({
  name: yup.string().required("Title is required"),
  price: yup.string().required("Price is required"),
  description: yup.string(),
  image: yup.string(),
  stock: yup.number(),
});

const ProductForm = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      image: "",
      stock: 0,
    },
    resolver: yupResolver(schema),
  });

  const [categoryId, setCategoryId] = useState<string>();
  const [images, setImages] = useState([{ value: "" }]);
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categoryReducer);

  const handleCategory = (e: SelectChangeEvent) => {
    setCategoryId(e.target.value);
  };

  const handleChange = (e: { target: { value: any } }, index: number) => {
    const { value } = e.target;
    setImages((prevImages) =>
      prevImages.map((image, i) => (i === index ? { value } : image))
    );
  };
  const handleAdd = () => {
    if (images.length < 3) {
      setImages((prevImages) => [...prevImages, { value: "" }]);
    } else {
      toast("Cannot add more images");
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // Create an array of the input values
    const imageArray = images.map((image) => image.value);

    const formattedData: ProductCreateType = {
      name: data.name,
      price: Number(data.price),
      description: data.description,
      categoryId: categoryId as string,
      images: imageArray,
      stock: data.stock as number,
    };

    dispatch(createProduct(formattedData));
    reset();
    setImages([]);
    setCategoryId("");
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
          <Grid item xs={12} md={2}>
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
          {images.map((image, index) => (
            <Grid item xs={12} md={3.5} key={index}>
              <TextField
                label="Image"
                variant="outlined"
                value={image.value}
                onChange={(e) => handleChange(e, index)}
                fullWidth
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAdd}>
              Add more images
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl sx={{ minWidth: 300, marginTop: "1.5rem" }}>
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
            Create
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default ProductForm;
