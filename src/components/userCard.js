import { Avatar, Typography, Box, Link } from "@mui/material";
import { useEffect, useState } from "react";
import appConfig from "../../config.json";

export default function UserCard({ user }) {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    if (!user) return;
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${encodeURIComponent(user)}`, { signal: controller.signal })
      .then(response => response.ok ? response.json() : null)
      .then(data => { if (data) setUserInfo(data); })
      .catch(() => {});
    return () => controller.abort();
  }, [user]);

  return (
    <Box
      m={0}
      sx={{
        backgroundColor: appConfig.theme.colors.neutrals[800],
      }}
    >
      {/* {console.log(userInfo)} */}
      <Link target={"_blank"} rel="noopener noreferrer" href={userInfo.html_url || (user ? `https://github.com/${encodeURIComponent(user)}` : undefined)}>
        <Box
          marginBottom={2}
          sx={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            src={userInfo.avatar_url}
            sx={{
              height: "60px",
              width: "60px",
              marginRight: "15px",
              marginBottom: "10px",
              bgcolor: appConfig.theme.colors.neutrals[800],
            }}
            aria-label="recipe"
          />

          <Box>
            <Typography
              sx={{
                fontWeight: "bold",
              }}
              variant="body1"
              color={appConfig.theme.colors.neutrals["000"]}
            >
              {userInfo.name || user || "Visitante"}
            </Typography>
            <Typography
              variant="body2"
              color={appConfig.theme.colors.neutrals["000"]}
            >
              @{userInfo.login || user || "visitante"}
            </Typography>
          </Box>
        </Box>
      </Link>
      <Typography
        sx={{
          fontSize: "14px",
        }}
        variant="body2"
        color={appConfig.theme.colors.neutrals["000"]}
        gutterBottom
      >
        {userInfo.bio}
      </Typography>
      <Box
        marginTop={2}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body2"
          color={appConfig.theme.colors.neutrals["000"]}
          gutterBottom
        >
          Followers: {userInfo.followers}
        </Typography>
        <Typography
          marginLeft={2}
          variant="body2"
          color={appConfig.theme.colors.neutrals["000"]}
          gutterBottom
        >
          Following: {userInfo.following}
        </Typography>
      </Box>
    </Box>
  );
}
