import { Avatar, Typography, Box, Link } from "@mui/material";
import { useState } from "react";
import appConfig from "../../config.json";

export default function UserCard({ user }) {
  const [userInfo, setUserInfo] = useState([]);

  fetch(`https://api.github.com/users/${user}`)
    .then((response) => response.json())
    .then((data) => {
      setUserInfo(data);
    });

  return (
    <Box
      m={0}
      sx={{
        backgroundColor: appConfig.theme.colors.neutrals[800],
      }}
    >
      {/* {console.log(userInfo)} */}
      <Link target={"_blank"} href={userInfo.html_url}>
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
              {userInfo.name}
            </Typography>
            <Typography
              variant="body2"
              color={appConfig.theme.colors.neutrals["000"]}
            >
              @{userInfo.login}
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
