import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import { useState } from "react";
import { useRouter } from "next/router";

import appConfig from "../config.json";

import Head from "next/head";

function IndexPage() {
  return (
    <Head>
      <title>AluraCord</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
}

//Title component
function Titulo(props) {
  //   console.log(props);
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals["000"]};
          font-size: 24px;
          font-weight: 600px;
        }
      `}</style>
    </>
  );
}

//react component
// function HomePage() {
//   // JSX
//   return (
//     <div>
//       <GlobalStyle />
//       <Titulo  tag="h1">Boas vindas de volta!</Titulo >
//       <h2>Discord - Alura Matrix</h2>
//     </div>
//   );
// }
// export default HomePage;

export default function PaginaInicial() {
  // const username = "oelmojr";
  const [username, setUsername] = useState("");
  const [followers, setollowers] = useState();
  const [following, setFollowing] = useState();
  const roteamento = useRouter();

  {
    username.length > 2
      ? fetch(`https://api.github.com/users/${username}`)
          .then((response) => response.json())
          .then((data) => {
            setFollowing(data.following);
            setollowers(data.followers);
          })
      : "";
  }

  return (
    <>
      <IndexPage />
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary["000"],
          backgroundImage: "url(https://i.imgur.com/T3bfXOV.gif)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (e) {
              e.preventDefault();
              roteamento.push("/chat");
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={function (e) {
                setUsername(e.target.value);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["500"],
                mainColor: appConfig.theme.colors.primary["500"],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[700],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          {username.length > 2 ? (
            <Box
              styleSheet={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "200px",
                padding: "16px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: "1px solid",
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: "10px",
                flex: 1,
                minHeight: "240px",
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: "50%",
                  marginBottom: "16px",
                }}
                src={
                  username.length > 2
                    ? `https://github.com/${username}.png`
                    : ""
                }
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: "3px 10px",
                  borderRadius: "1000px",
                  marginBottom: "10px",
                }}
              >
                {username}
              </Text>

              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: "3px 10px",
                  borderRadius: "1000px",
                  marginBottom: "2px",
                }}
              >
                {username.length > 2 ? `Following ${following}` : ""}
              </Text>
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: "3px 10px",
                  borderRadius: "1000px",
                }}
              >
                {username.length > 2 ? `Followers ${followers}` : ""}
              </Text>
            </Box>
          ) : (
            ""
          )}

          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
