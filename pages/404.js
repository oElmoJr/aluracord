import { Box, Button, Image, Text } from "@skynexui/components";
import { useRouter } from "next/router";

import appConfig from "../config.json";

export default function Custom404() {
  const roteamento = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          backgroundColor: "black",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          styleSheet={{
            height: "60%",
          }}
          src="https://media.discordapp.net/attachments/818979655046266882/936003619684249640/ezgif.com-gif-maker.gif"
        ></Image>
        <Text
          variant="heading2"
          styleSheet={{
            color: "#fff",
            marginBottom: "10px",
          }}
        >
          PAGE NOT FOUND
        </Text>

        <Button
          type="submit"
          label="Back to home page"
          onClick={function (e) {
            e.preventDefault;
            roteamento.push("/");
          }}
          styleSheet={{
            marginBottom: "100px",
          }}
          buttonColors={{
            contrastColor: appConfig.theme.colors.neutrals["500"],
            mainColor: appConfig.theme.colors.primary["500"],
            mainColorLight: appConfig.theme.colors.primary[400],
            mainColorStrong: appConfig.theme.colors.primary[600],
          }}
        />
      </Box>
    </>
  );
}
