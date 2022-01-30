import appConfig from "../../config.json";
import { Box, Button, Image } from "@skynexui/components";
import { useRouter } from "next/router";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.arrow}`]: {
    color: appConfig.theme.colors.neutrals[800],
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: appConfig.theme.colors.neutrals[800],
    color: appConfig.theme.colors.neutrals[200],
    fontSize: "15px",
  },
});

export default function ChatList(props) {
  const roteamento = useRouter();

  return (
    <Box
      styleSheet={{
        backgroundColor: appConfig.theme.colors.neutrals[600],
        borderRadius: "5px",
        padding: "16px",
        marginRight: "10px",
      }}
    >
      <BootstrapTooltip title="Inicio" placement="right" arrow>
        <div>
          <Button
            onClick={() => {
              roteamento.push(`/chat?username=${props.username}`);
            }}
            styleSheet={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              lineHeight: "0",
              fontSize: "30px",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              transition: "200ms",
              marginBottom: "10px",
              hover: {
                borderRadius: "30%",
                cursor: "pointer",
              },
            }}
            iconName="Comment"
            buttonColors={{
              contrastColor: appConfig.theme.colors.neutrals["000"],
              mainColor: appConfig.theme.colors.neutrals["500"],
              mainColorLight: appConfig.theme.colors.neutrals[400],
              mainColorStrong: appConfig.theme.colors.neutrals[700],
            }}
          />
        </div>
      </BootstrapTooltip>
      <BootstrapTooltip title="Chat de Tecnologia" placement="right" arrow>
        <div>
          <Image
            src="https://hlink.pt/wp-content/uploads/2021/05/SOFTWARE-MEDIDA.jpg"
            onClick={() => {
              roteamento.push(`/chat-tech?username=${props.username}`);
            }}
            styleSheet={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              transition: "200ms",
              hover: {
                borderRadius: "30%",
                cursor: "pointer",
              },
            }}
          />
        </div>
      </BootstrapTooltip>
    </Box>
  );
}
