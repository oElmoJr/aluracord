import appConfig from "../../config.json";
import { Box, Image } from "@skynexui/components";
import { useRouter } from "next/router";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

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

const BootstrapButton = styled(IconButton)({
  backgroundColor: appConfig.theme.colors.neutrals[500],
  color: appConfig.theme.colors.neutrals[200],

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  lineHeight: "0",
  fontSize: "30px",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  transition: "200ms",
  marginLeft: "12px",
  padding: "0",

  "&:hover": {
    borderRadius: "30%",
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

export default function ChatList(props) {
  const roteamento = useRouter();

  return (
    <Box
      styleSheet={{
        backgroundColor: appConfig.theme.colors.neutrals[600],
        borderRadius: "5px",
        padding: "0",
        marginRight: "10px",
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          margin: "16px 16px 16px 0",
        }}
      >
        {props.page === "chat" ? (
          <div
            style={{
              height: "50px",
              width: "4px",
              backgroundColor: "#fff",
              borderRadius: "0 50px 50px 0 ",
              padding: "0",
              margin: "0",
            }}
          ></div>
        ) : (
          <div
            style={{
              height: "50px",
              width: "4px",
              borderRadius: "0 50px 50px 0 ",
              padding: "0",
              margin: "0",
            }}
          ></div>
        )}

        <BootstrapTooltip title="Inicio" placement="right" arrow>
          <div>
            <BootstrapButton
              onClick={() => {
                roteamento.push(`/chat?username=${props.username}`);
              }}
            >
              <ChatBubbleIcon />
            </BootstrapButton>
          </div>
        </BootstrapTooltip>
      </Box>
      <Box
        styleSheet={{
          display: "flex",
          margin: "16px 16px 16px 0",
        }}
      >
        {props.page === "chat-tech" ? (
          <div
            style={{
              height: "50px",
              width: "4px",
              backgroundColor: "#fff",
              borderRadius: "0 50px 50px 0 ",
              padding: "0",
              margin: "0",
            }}
          ></div>
        ) : (
          <div
            style={{
              height: "50px",
              width: "4px",
              borderRadius: "0 50px 50px 0 ",
              padding: "0",
              margin: "0",
            }}
          ></div>
        )}
        <BootstrapTooltip title="Chat de Tecnologia" placement="right" arrow>
          <div>
            <BootstrapButton
              src=""
              onClick={() => {
                roteamento.push(`/chat-tech?username=${props.username}`);
              }}
            >
              <StyledImage
                style={{
                  width: "50px",
                  height: "50px",
                }}
                src="https://hlink.pt/wp-content/uploads/2021/05/SOFTWARE-MEDIDA.jpg"
                alt=""
              />
            </BootstrapButton>
          </div>
        </BootstrapTooltip>
      </Box>
    </Box>
  );
}
