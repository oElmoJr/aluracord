import appConfig from "../config.json";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, TextField, Button, Image } from "@skynexui/components";
import { createClient } from "@supabase/supabase-js";
import MessageList from "../src/components/MessageList";
import Header from "../src/components/Header";
import { ButtonSendSticker } from "../src/components/ButtonSendSticker";
import ChatList from "../src/components/ChatList";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyMDA4NiwiZXhwIjoxOTU4ODk2MDg2fQ.x0pSGNwztZfGYczeC8TPY28sS-22Ic2iDq0JrBRzeUM";
const SUPABASE_URL = "https://hscoxurwegqobpmmzzjj.supabase.co";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabase
    .from("mensagenstech")
    .on("INSERT", (respostaLive) => {
      adicionaMensagem(respostaLive.new);
    })
    .subscribe();
}

function IndexPage() {
  return (
    <Head>
      <title>AluraCord | Chat</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
}

export default function ChatAnime() {
  const roteamento = useRouter();
  const [mensagem, setMensagens] = useState("");
  const [pending, setPending] = useState(true);
  const [listaDeMensagem, setListaDeMensagem] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      supabase
        .from("mensagenstech")
        .select("*")
        .order("id", { ascending: false })
        .then(({ data }) => {
          setListaDeMensagem(data);
          setPending(false);
        });
    }, 200);
    escutaMensagensEmTempoReal((novaMensagem) => {
      setListaDeMensagem((valorAtualDaLista) => {
        return [novaMensagem, ...valorAtualDaLista];
      });
    });
  }, []);

  const page = "Chat-Anime";
  const name = roteamento.query.username;

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      de: name,
      texto: novaMensagem,
      color: "#FFAFF0",
    };

    supabase
      .from("mensagenstech")
      .insert([mensagem])
      .then(({ data }) => {
        console.log(data);
      });
    setMensagens("");
  }
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
                // height: "80%",
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
                handleDelete={(id) => {
                  setListaDeMensagem(
                    listaDeMensagem.filter((e) => {
                      return e.id != id;
                    })
                  );
                }}
              />
              <Box
                as="form"
                styleSheet={{
                  display: "flex",
                }}
              >
                <ButtonSendSticker
                  onStickerClick={(sticker) => {
                    console.log("salva");
                    handleNovaMensagem(`:sticker: ${sticker} `);
                  }}
                />
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
                    // height: "100%",
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
                  onClick={(e) => {
                    if (mensagem.length > 0) {
                      e.preventDefault();
                      handleNovaMensagem(mensagem);
                    }
                  }}
                  iconName="paperPlane"
                  label="Send"
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
