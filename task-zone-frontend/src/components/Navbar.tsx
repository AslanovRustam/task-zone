import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { PATH } from "../constants";

export default function Navbar() {
  const items = Object.entries(PATH);

  return (
    <Box sx={{ width: "100%", maxWidth: 1280 }}>
      <nav>
        <List disablePadding>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            {items.map(([key, value]) => (
              <ListItem key={key} disablePadding sx={{ width: "auto" }}>
                <ListItemButton
                  component="a"
                  href={value}
                  sx={{
                    borderRadius: 1,
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "#000000",
                      color: "#fff",
                    },
                  }}
                >
                  <ListItemText primary={key} />
                </ListItemButton>
              </ListItem>
            ))}
          </Stack>
        </List>
      </nav>
      <Divider sx={{ mb: 2 }} />
    </Box>
  );
}
