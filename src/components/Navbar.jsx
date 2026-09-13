import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import WbAutoIcon from "@mui/icons-material/WbAuto";
import LanguageRadialMenu from "./LanguageRadialMenu";

const Navbar = ({language, setLanguage}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ bgcolor: "#031B29" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 1, ml: 3 }}
          >
            <WbAutoIcon sx={{ fontSize: "35px" }} />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", textAlign: "center" }}
          >
            Counter
          </Typography>

          <LanguageRadialMenu language={language} setLanguage={setLanguage}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
