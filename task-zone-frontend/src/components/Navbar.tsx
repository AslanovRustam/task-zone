import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import { selectIsAuthenticated } from "../store/selectors";
import { PATH } from "../constants";

export default function Navbar() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const items = Object.entries(PATH).filter(([key]) => {
    if (key === "TASKS" && !isAuthenticated) return false;
    return true;
  });

  return (
    <Box sx={{ width: "100%", maxWidth: 1280 }}>
      <nav>
        <List disablePadding>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            {items.map(([key, value]) => (
              <ListItem
                key={key}
                disablePadding
                sx={{
                  width: "auto",
                  borderRadius: 1,
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#383837",
                    color: "#fff",
                  },
                }}
              >
                <NavLink
                  to={value}
                  style={{ padding: "4px 6px", color: "inherit" }}
                >
                  <ListItemText
                    primary={key}
                    sx={{
                      borderRadius: 1,
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "#383837",
                        color: "#fff",
                      },
                    }}
                  />
                </NavLink>
              </ListItem>
            ))}
          </Stack>
        </List>
      </nav>
      <Divider sx={{ mb: 2, mt: 2 }} />
    </Box>
  );
}
