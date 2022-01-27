import Head from "next/head";
import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import { useState } from "react";

import appConfig from "../config.json";

function IndexPage() {
  return (
    <Head>
      <title>AluraCord | Chat</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
}

export default function ChatPage() {
  // Sua lógica vai aqui
  const [mensagem, setMensagens] = useState("");
  const [listaDeMensagem, setListaDeMensagem] = useState([]);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      id: listaDeMensagem.length,
      de: "oelmojr",
      texto: novaMensagem,
      cor: "gold",
    };

    setListaDeMensagem([mensagem, ...listaDeMensagem]);
    mensagem;
    setMensagens("");
  }

  // ./Sua lógica vai aqui
  return (
    <>
      <IndexPage />
      <Box
        styleSheet={{
          display: "flex",
          width: "90vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary["000"],
          backgroundImage: `url(https://i.imgur.com/T3bfXOV.gif)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          color: appConfig.theme.colors.neutrals["000"],
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            borderRadius: "5px",
            backgroundColor: appConfig.theme.colors.neutrals[700],
            height: "100%",
            maxWidth: "95%",
            maxHeight: "95vh",
            padding: "32px",
          }}
        >
          <Header />
          <Box
            styleSheet={{
              position: "relative",
              display: "flex",
              flex: 1,
              height: "80%",
              backgroundColor: appConfig.theme.colors.neutrals[600],
              flexDirection: "column",
              borderRadius: "5px",
              padding: "16px",
            }}
          >
            {/* {listaDeMensagem.map((mensagemAtual) => {
              return (
                <li key={mensagemAtual.id}>
                  {mensagemAtual.de}: {mensagemAtual.texto}
                </li>
              );
            })} */}
            <MessageList mensagens={listaDeMensagem} />
            <Box
              as="form"
              styleSheet={{
                display: "flex",
              }}
            >
              <TextField
                value={mensagem}
                onChange={(e) => {
                  setMensagens(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (
                    (mensagem.length > 0) &
                    (e.key === "Enter") &
                    (e.shiftKey === false)
                  ) {
                    // console.log(e);
                    e.preventDefault();
                    handleNovaMensagem(mensagem);
                  } else if ((e.key === "Enter") & (e.shiftKey === false)) {
                    e.preventDefault();
                  } else if (e.shiftKey === true) {
                  }
                }}
                placeholder="Insira sua mensagem aqui..."
                type="textarea"
                styleSheet={{
                  border: "0",
                  width: "100%",
                  height: "100%",
                  resize: "none",
                  borderRadius: "5px",
                  padding: "6px 8px",
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                  marginRight: "12px",
                  color: appConfig.theme.colors.neutrals[200],
                }}
              />
              <Button
                onClick={(e) => {
                  if (mensagem.length > 0) {
                    e.preventDefault();
                    handleNovaMensagem(mensagem);
                  }
                }}
                iconName="paperPlane"
                label="Send"
                styleSheet={{
                  border: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "45px",
                  width: "100px",
                  backgroundColor: appConfig.theme.colors.primary[500],
                  color: appConfig.theme.colors.neutrals[500],
                  marginBottom: "5px",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

function Header() {
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
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        display: "flex",
        overflow: "scroll",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
        // width: "100vh",
      }}
    >
      {props.mensagens.map((mensagem) => {
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
                src={`https://github.com/oelmojr.png`}
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
                      color: `${mensagem.cor}`,
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
                    {new Date().toLocaleDateString()}
                  </Text>
                </Box>
                <Text
                  styleSheet={{
                    width: "100%",
                    wordBreak: "break-all",
                  }}
                  tag="p"
                >
                  {mensagem.texto}
                </Text>
              </Box>
            </Box>
            <Box>
              <Button
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
      })}
    </Box>
  );
}
