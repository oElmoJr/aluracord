import appConfig from "../../config.json";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { Box, TextField, Button, Text } from "@skynexui/components";
import useChat from "../hooks/useChat";
import MessageList from "./MessageList";
import Header from "./Header";
import { ButtonSendSticker } from "./ButtonSendSticker";
import ChatList from "./ChatList";

function IndexPage({ title }) {
  return (
    <Head>
      <title>AluraCord | {title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
}

export default function ChatRoom({ sala, page, title }) {
  const roteamento = useRouter();
  const [mensagem, setMensagens] = useState("");
  const name = typeof roteamento.query.username === "string" ? roteamento.query.username : "";
  const { messages: listaDeMensagem, pending, sending, error, send, hide } = useChat(sala, name);

  async function handleNovaMensagem(novaMensagem) {
    if (await send(novaMensagem)) setMensagens("");
  }

  return (
    <>
      <IndexPage title={title} />
      <Box
        styleSheet={{
          display: "flex",
          width: "100%",
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
            height: "100vh",
            maxWidth: "1100px",
            maxHeight: "95vh",
            padding: "32px",
          }}
        >
          <Header page={page} />
          <Box
            styleSheet={{
              display: "flex",
              overflowY: "scroll",
              flex: 1,
            }}
          >
            <ChatList username={name} page={page} />
            <Box
              styleSheet={{
                position: "relative",
                display: "flex",
                flex: 1,
                backgroundColor: appConfig.theme.colors.neutrals[600],
                flexDirection: "column",
                borderRadius: "5px",
                padding: "16px",
              }}
            >
              <MessageList
                handlePending={pending}
                mensagens={listaDeMensagem}
                userInfo={name}
                handleDelete={hide}
              />
              {error && <Text tag="p" role="alert" styleSheet={{ color: "#ffb4b4", marginBottom: "12px" }}>{error}</Text>}
              <Box
                as="form"
                onSubmit={(e) => { e.preventDefault(); if (mensagem.trim()) handleNovaMensagem(mensagem); }}
                styleSheet={{
                  display: "flex",
                }}
              >
                <ButtonSendSticker
                  onStickerClick={(sticker) => {
                    handleNovaMensagem(`:sticker: ${sticker} `);
                  }}
                />
                <TextField
                  value={mensagem}
                  onChange={(e) => {
                    setMensagens(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (mensagem.trim()) handleNovaMensagem(mensagem);
                    }
                  }}
                  maxLength={4000}
                  aria-label="Mensagem"
                  placeholder="Insira sua mensagem aqui..."
                  type="textarea"
                  styleSheet={{
                    border: "0",
                    width: "100%",
                    minHeight: "46px",
                    maxHeight: "50px",
                    resize: "none",
                    borderRadius: "5px",
                    padding: "6px 8px",
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                    marginRight: "12px",
                    marginLeft: "12px",
                    color: appConfig.theme.colors.neutrals[200],
                  }}
                />
                <Button
                  type="submit"
                  disabled={sending || !mensagem.trim() || !name}
                  iconName="paperPlane"
                  label={sending ? "Enviando…" : "Enviar"}
                  styleSheet={{
                    minHeight: "46px",
                    maxHeight: "50px",
                    border: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "45px",
                    width: "100px",
                    backgroundColor: appConfig.theme.colors.primary[500],
                    color: appConfig.theme.colors.neutrals[500],
                    marginBottom: "8px",
                  }}
                  buttonColors={{
                    contrastColor: appConfig.theme.colors.neutrals["500"],
                    mainColor: appConfig.theme.colors.primary["500"],
                    mainColorLight: appConfig.theme.colors.primary[400],
                    mainColorStrong: appConfig.theme.colors.primary[700],
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
