"use client";

import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { useState } from "react";
import {
  IoCartOutline,
  IoRemove,
  IoAdd,
  IoTrashOutline,
  IoLockClosedOutline,
} from "react-icons/io5";

const initialCart = [
  {
    id: 1,
    company: "Win",
    label: "Poltrona Bella",
    description:
      "Uma poltrona super confortável de veluno, e com pelúvia italiana, costurado a mão.",
    image: "/images/poltrona.png",
    price: 105,
    quantity: 1,
  },
  {
    id: 2,
    company: "Win",
    label: "Poltrona Bella",
    description:
      "Uma poltrona super confortável de veluno, e com pelúvia italiana, costurado a mão.",
    image: "/images/poltrona.png",
    price: 100,
    quantity: 1,
  },
];

export default function Home() {
  const [cart, setCart] = useState(initialCart);

  const theme = useTheme();

  const total = cart.reduce(
    (acc, item) => acc + (Number(item.price * item.quantity) ?? 0),
    0
  );

  const handleChangeQuantity = (id: number, quantity: number) => {
    const data = cart.map((item) =>
      item.id == id ? { ...item, quantity } : item
    );
    setCart(data);
  };

  const handlePayment = async () => {
    const response = await axios.post<PreferenceResponse>("/api/mercado_pago");

    window.location.href = response.data.init_point || "";
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <Container sx={{ py: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "0.875rem" }}>
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            href="/material-ui/getting-started/installation/"
          >
            Carrinho
          </Link>
        </Breadcrumbs>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center", my: 2 }}>
          <IoCartOutline size={"1.5rem"} />
          <Typography variant="h5" component="h1" fontWeight="bold">
            Meu Carrinho
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={8.5}
            sx={{ gap: 1, display: "flex", flexDirection: "column" }}
          >
            {cart.map((item, index) => (
              <Grid
                container
                key={index}
                sx={(theme) => ({
                  minHeight: 100,
                  borderRadius: 1,
                  p: 2,
                  display: "flex",
                  border: `1px solid ${theme.palette.grey[400]}`,
                  justifyContent: "space-between",
                  alignItems: "center",
                })}
              >
                <Grid
                  item
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    width: "60%",
                  }}
                  xs={8.5}
                >
                  <Box
                    sx={(theme) => ({
                      height: `calc(100px - ${theme.spacing(2)})`,
                      width: `calc(100px - ${theme.spacing(2)})`,
                      bgcolor: theme.palette.grey[200],
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "60px",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      borderRadius: 1,
                      transition: "300ms",

                      "&:hover": {
                        backgroundSize: "65px",
                      },
                    })}
                  ></Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h5">{item.label}</Typography>
                    <Typography variant="body2">{item.description}</Typography>
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={3.5}
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "flex-end",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <div></div>
                  <Typography
                    fontWeight="bold"
                    variant="body1"
                    textAlign={"right"}
                    sx={{ justifySelf: "center" }}
                  >
                    R$ {item.price}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "end",
                    }}
                  >
                    <Box sx={{ alignSelf: "center" }}>
                      <IconButton>
                        <IoTrashOutline
                          color={theme.palette.grey[600]}
                          fontSize={"0.8rem"}
                        />
                      </IconButton>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          item.quantity &&
                            handleChangeQuantity(item.id, item.quantity - 1);
                        }}
                      >
                        <IoRemove />
                      </IconButton>
                      <Box>{item.quantity}</Box>
                      <IconButton
                        onClick={() => {
                          handleChangeQuantity(item.id, item.quantity + 1);
                        }}
                      >
                        <IoAdd />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12} md={3.5}>
            <Box
              sx={(theme) => ({
                minHeight: 100,
                borderRadius: 1,
                p: 2,
                border: `1px solid ${theme.palette.grey[400]}`,
              })}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Pagamento
              </Typography>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography color="gray">Sub-total</Typography>
                <Typography>R$ {total}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography color="gray">Total</Typography>
                <Typography variant="h6">R$ {total}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  startIcon={<IoLockClosedOutline size={"0.8rem"} />}
                  disabled={!total}
                  onClick={handlePayment}
                >
                  Pagar
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
