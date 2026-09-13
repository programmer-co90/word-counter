import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

const LanguageRadialMenu = ({ setLanguage }) => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };
  const handleItemClick = (lang) => {
    setLanguage(lang);
    setOpen(false);
  };
  const items = ["en", "ar"];
  const radius = 90;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        ml: 2,
      }}
    >
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        sx={{
          mr: 2,
          backgroundColor: "#031B29",
          color: "white",
        }}
        onClick={toggleMenu}
      >
        <LanguageIcon sx={{ fontSize: "40px" }} />
      </IconButton>

      {items.map((item, index) => {
        const angle =
          (200 + (index * 75) / (items.length - 1)) * (Math.PI / 175); //half circle (180 to 270)
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <IconButton
            Key={item}
            onClick={() => handleItemClick(item)}
            sx={{
              position: "absolute",
              bottom: open ? `calc(30% + ${y}px)` : "50%",
              left: open ? `calc(50% + ${x}px)` : "50%",
              width: "40px",
              height: "40px",
              backgroundColor: "#053042",
              color: "white",
              fontSize: "22px",
              fontWeight: "bold",
              border: "1.5px solid white",
              transform: open
                ? "translate(-50%, -50%) scale(1)"
                : "translate(-50%, -50%) scale(0.5)",
              opacity: open ? 1 : 0,
              transition: "all 0.4s ease",
              transitionDelay: open ? `${index * 0.1}s` : "0s",
              "&:hove": { backgroundColor: "#075161" },
              zIndex: 5,
            }}
          >
            {item}
          </IconButton>
        );
      })}
    </Box>
  );
};

export default LanguageRadialMenu;
