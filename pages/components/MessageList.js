import { Box, Text, Image, Button } from "@skynexui/components";
import appConfig from "../../config.json";
import Loadingmensage from "./loadingMensage";

export default function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        display: "flex",
        overflowY: "scroll",

        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.handlePending ? (
        <Loadingmensage />
      ) : (
        props.mensagens.map((mensagem) => {
          const date = mensagem.created_at;
          var dataNformatada = new Date(date);
          let dataFormatada =
            dataNformatada.getDate() +
            "/" +
            (dataNformatada.getMonth() + 1) +
            "/" +
            dataNformatada.getFullYear();

          return (
            <Text
              key={mensagem.id}
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
                  styleSheet={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "8px",
                  }}
                  src={`https://github.com/${mensagem.de}.png`}
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
                        color: `${mensagem.color}`,
                      }}
                    >
                      {mensagem.de}
                    </Text>
                    <Text
                      styleSheet={{
                        fontSize: "10px",
                        marginLeft: "8px",
                        color: appConfig.theme.colors.neutrals[300],
                      }}
                      tag="span"
                    >
                      {dataFormatada}
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
                    {mensagem.texto}
                  </Text>
                </Box>
              </Box>
              <Box>
                <Button
                  onClick={() => {
                    props.handleDelete(mensagem.id);
                  }}
                  label="X"
                  variant="tertiary"
                  // iconName="trashAlt"
                  size="sm"
                  styleSheet={{
                    height: "20px",
                    width: "20px",
                    padding: "0",
                  }}
                  buttonColors={{
                    contrastColor: "#FFFFFF",
                    mainColor: appConfig.theme.colors.neutrals[400],
                    mainColorLight: appConfig.theme.colors.neutrals[500],
                    mainColorStrong: appConfig.theme.colors.neutrals[100],
                  }}
                />
              </Box>
            </Text>
          );
        })
      )}
    </Box>
  );
}
