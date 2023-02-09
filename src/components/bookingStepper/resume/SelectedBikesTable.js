
import { Grid, Stack, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { getBikes } from "@/src/store/selectors";
import Image from "next/image";
import { BIKE_RANGES_MAP, BIKE_TYPES_MAP } from "@/src/utils/appValues";



const SelectedBikesTable = () => {
  const selectedBikes = useSelector(getBikes);
  return (
    <Box spacing={1}>
      {selectedBikes.map((bike) => {
        const [image] = bike.images;
        return (
          <Grid
            key={bike._id}
            container
            spacing={1}
            mb={1}
          >
            <Grid
              item
              //sx={{ position: 'relative' }}
              xs={4}
            ><Box
              sx={{
                // width: '100%',
                height: '100%',
                position: 'relative'
              }}
            >
                <Image
                  //    width="100%"
                  //   height="100%"
                  //objectFit="contain"

                  fill
                  src={image}
                  alt="Imagen de producto"
                  style={{ backgroundColor: "#F1F1F1", objectFit: 'contain' }}
                />
              </Box>

            </Grid>
            <Grid
              item
              xs={8}
            >
              <Stack
                mr={4}
                sx={{ width: "100%" }}
              >
                <Typography
                  component="div"
                  variant="subtitle2"
                >
                  {bike.brand} {bike.model}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="div"
                >
                  Talla: {bike.size}
                </Typography>

                <Typography
                  //key={engType}
                  component="div"
                  color="text.secondary"
                  variant="body2"
                >
                  Tipo: {BIKE_TYPES_MAP[bike.type]}
                </Typography>
                <Typography
                  // key={engRange}
                  component="div"
                  variant="body2"
                  color="text.secondary"
                >
                  Gama: {BIKE_RANGES_MAP[bike.range]}
                </Typography>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="div"
                  >
                    Precio por día:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="div"
                  >
                    {bike.price}€
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
};

export default SelectedBikesTable;
