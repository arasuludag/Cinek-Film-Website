import React from "react";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Box from "@mui/material/Box";

export default function MediaCard(props) {
  return (
    <Card 
      sx={{ 
        background: "black", 
        height: "400px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}
    >
      <Box sx={{ 
        flex: "1 0 auto", 
        position: "relative",
        maxHeight: "320px",
        overflow: "hidden"
      }}>
        <Image
          src={props.image}
          alt={props.title}
          width={270}
          height={320}
          objectFit="contain"
          style={{ 
            width: "100%", 
            height: "100%",
            objectFit: "contain"
          }}
        />
      </Box>

      <Box 
        sx={{ 
          p: 2,
          flex: "0 0 auto",
          height: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <Link href={props.href} target="_blank" underline="none" color="white">
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: "1.1rem",
              fontWeight: "bold",
              lineHeight: 1.2,
              mb: 0,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "1.5rem",
            }}
          >
            {props.title}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "0.9rem",
              fontWeight: "normal",
              lineHeight: 1.2
            }}
          >
            {props.date}
          </Typography>
        </Link>
      </Box>
    </Card>
  );
}
