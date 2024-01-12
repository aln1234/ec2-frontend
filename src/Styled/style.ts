import { styled } from "@mui/material/styles";

export const HeroDiv = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  backgroundColor: "rgba(9, 132, 227,0.4)",
  backgroundPosition: "right",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",

  "&:hover": {},
  marginBottom: "2rem",
  marginRight: theme.spacing(2),
  [theme.breakpoints.up("xs")]: {
    width: "100%",
    backgroundPosition: "left",
  },
  height: "80vh",
  [theme.breakpoints.up("md")]: {
    width: "100%",
  },
}));

export const HeroText = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    maxWidth: "100%",
    marginLeft: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "50%",
    marginLeft: "9rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
}));

export const SingleProduct = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    width: "20rem",
    height: "45vh",
    marginTop: "2rem",
  },

  [theme.breakpoints.up("md")]: {
    width: "24rem",
    height: "40vh",
    marginTop: "2rem",
  },
}));

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
