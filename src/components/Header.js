import { Button } from "@mui/material";
import { Box, Text } from "@skynexui/components";
import appConfig from "../../config.json";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)(({ theme }) => ({
  color: appConfig.theme.colors.neutrals[300],
  backgroundColor: appConfig.theme.colors.neutrals[700],
  "&:hover": {
    backgroundColor: appConfig.theme.colors.neutrals[500],
  },
}));

export default function Header(props) {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">{props.page}</Text>
        <ColorButton
          sx={{
            color: appConfig.theme.colors.neutrals[300],
            hover: {
              backgroundColor: appConfig.theme.colors.neutrals[100],
            },
          }}
          variant="text"
          href="/"
        >
          Logout
        </ColorButton>
      </Box>
    </>
  );
}
