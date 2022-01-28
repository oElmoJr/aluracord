import { Box, Text, Image } from "@skynexui/components";
import appConfig from "../../config.json";

export default function Loadingmensage() {
  return (
    <>
      <Text
        key={"zfdbaervvrvvsdvsfvdsfbsfgterdgvstrgasetbstgbs"}
        tag="li"
        styleSheet={{
          display: "flex",
          justifyContent: "space-between",

          borderRadius: "5px",
          padding: "6px",
          marginBottom: "12px",
          hover: {
            backgroundColor: appConfig.theme.colors.neutrals[700],
          },
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "8px",
          }}
        >
          <Image
            className="imgLoader"
            styleSheet={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "inline-block",
              marginRight: "8px",
              animation: "is-rotating 1s infinite",
            }}
            src={`https://media.discordapp.net/attachments/818979655046266882/935381706310053928/unnamed.jpg`}
          />
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              styleSheet={{
                marginRight: "10px",
                marginBottom: "5px",
              }}
            >
              <Text
                tag="strong"
                styleSheet={{
                  fontWeight: "bold",
                  color: `#9883E5`,
                }}
              >
                elmo
              </Text>
            </Box>
            <Text
              styleSheet={{
                width: "100%",
                wordBreak: "break-all",
                whiteSpace: "pre-line",
              }}
              tag="p"
            >
              Tá carregando, espera aí.
            </Text>
          </Box>
        </Box>
        <Box></Box>
      </Text>
    </>
  );
}
