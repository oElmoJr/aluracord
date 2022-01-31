import { Button } from "@mui/material/";
import React from "react";
import { Box, Text, Image } from "@skynexui/components";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import { styled } from "@mui/material/styles";
import appConfig from "../../config.json";

const StickerButton = styled(Button)({
  backgroundColor: appConfig.theme.colors.neutrals[500],
  color: appConfig.theme.colors.neutrals[200],

  borderRadius: "50%",
  padding: "0 3px 0 0",
  minWidth: "46px",
  minHeight: "46px",
  maxWidth: "46px",
  maxHeight: "46px",
  fontSize: "20px",
  marginBottom: "8px",
  lineHeight: "0",

  "&:hover": {
    cursor: "pointer",
    backgroundColor: appConfig.theme.colors.neutrals[700],
  },
});

const CatStickerButton = styled(Button)({
  backgroundColor: appConfig.theme.colors.neutrals[500],
  color: appConfig.theme.colors.neutrals[200],

  borderRadius: "50%",
  padding: "0 0 0 0",
  minWidth: "35px",
  minHeight: "35px",
  maxWidth: "35px",
  maxHeight: "35px",
  fontSize: "20px",
  marginBottom: "8px",
  marginRight: "8px",
  lineHeight: "0",

  "&:hover": {
    cursor: "pointer",
    backgroundColor: appConfig.theme.colors.neutrals[700],
  },
});

const StyledImage = styled(Image)({
  backgroundColor: appConfig.theme.colors.neutrals[500],
  color: appConfig.theme.colors.neutrals[200],
  justifyContent: "center",
  alignItems: "center",
  lineHeight: "0",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  transition: "200ms",

  "&:hover": {
    borderRadius: "30%",
    cursor: "pointer",
    backgroundColor: appConfig.theme.colors.neutrals[700],
  },
});

export function ButtonSendSticker(props) {
  const [isOpen, setOpenState] = React.useState("");
  const [catSticke, setCatSticke] = React.useState("Alura");

  return (
    <Box
      styleSheet={{
        position: "relative",
      }}
    >
      <StickerButton onClick={() => setOpenState(!isOpen)}>
        <AutoAwesomeMotionIcon />
      </StickerButton>
      {isOpen && (
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "5px",
            position: "absolute",
            backgroundColor: appConfig.theme.colors.neutrals[800],
            width: {
              xs: "200px",
              sm: "290px",
            },
            height: "300px",
            left: "30px",
            bottom: "30px",
            padding: "16px",
            boxShadow:
              "rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px",
          }}
        >
          <Text
            styleSheet={{
              color: appConfig.theme.colors.neutrals["000"],
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Stickers
          </Text>
          <Box
            styleSheet={{
              display: "flex",
              overflowY: "scroll",
            }}
          >
            <Box
              styleSheet={{
                // backgroundColor: "red",
                paddingTop: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CatStickerButton
                onClick={() => {
                  setCatSticke("Alura");
                }}
              >
                <StyledImage src="https://media.glassdoor.com/sqll/2500530/alura-squarelogo-1602197362646.png" />
              </CatStickerButton>
              <CatStickerButton
                onClick={() => {
                  setCatSticke("Elmo");
                }}
              >
                <StyledImage src="https://media.discordapp.net/attachments/818979655046266882/935381706310053928/unnamed.jpg" />
              </CatStickerButton>
              <CatStickerButton
                onClick={() => {
                  setCatSticke("Kpop");
                }}
              >
                <StyledImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbKu1QobT0Z5h7UpupiOpnz1mNQdN__udpHw&usqp=CAU" />
              </CatStickerButton>
            </Box>
            <Box
              tag="ul"
              styleSheet={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                flex: 1,
                paddingTop: "5px",
                overflow: "scroll",
              }}
            >
              {catSticke === "Alura" &&
                appConfig.stickers.map((sticker) => (
                  <Text
                    onClick={() => {
                      console.log(
                        "[DENTRO DO COMPONENTE] Clicou no sticker:",
                        sticker
                      );
                      if (Boolean(props.onStickerClick)) {
                        props.onStickerClick(sticker);
                      }
                      setOpenState(false);
                    }}
                    tag="li"
                    key={sticker}
                    styleSheet={{
                      width: "50%",
                      borderRadius: "5px",
                      padding: "10px",
                      focus: {
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                      },
                      hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                      },
                    }}
                  >
                    <Image src={sticker} />
                  </Text>
                ))}
              {catSticke === "Elmo" &&
                appConfig.stickersElmo.map((sticker) => (
                  <Text
                    onClick={() => {
                      console.log(
                        "[DENTRO DO COMPONENTE] Clicou no sticker:",
                        sticker
                      );
                      if (Boolean(props.onStickerClick)) {
                        props.onStickerClick(sticker);
                      }
                      setOpenState(false);
                    }}
                    tag="li"
                    key={sticker}
                    styleSheet={{
                      width: "50%",
                      borderRadius: "5px",
                      padding: "10px",
                      focus: {
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                      },
                      hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                      },
                    }}
                  >
                    <Image src={sticker} />
                  </Text>
                ))}
              {catSticke === "Kpop" &&
                appConfig.stickersKpop.map((sticker) => (
                  <Text
                    onClick={() => {
                      console.log(
                        "[DENTRO DO COMPONENTE] Clicou no sticker:",
                        sticker
                      );
                      if (Boolean(props.onStickerClick)) {
                        props.onStickerClick(sticker);
                      }
                      setOpenState(false);
                    }}
                    tag="li"
                    key={sticker}
                    styleSheet={{
                      width: "50%",
                      borderRadius: "5px",
                      padding: "10px",
                      focus: {
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                      },
                      hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                      },
                    }}
                  >
                    <Image src={sticker} />
                  </Text>
                ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
