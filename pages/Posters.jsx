import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";

const SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 30 * 6;

function isRecent(dateString) {
  if (!dateString) return false;
  const filmDate = new Date(dateString);
  if (Number.isNaN(filmDate.getTime())) return false;
  return Date.now() - filmDate.getTime() < SIX_MONTHS_MS;
}

export default function MediaCard(props) {
  const showNewBadge = isRecent(props.rawDate);

  return (
    <Card
      sx={{
        background: "#141414",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "scale(1.04)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
        },
      }}
    >
      <CardActionArea
        onClick={props.onClick}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "2 / 3",
            backgroundColor: "#0a0a0a",
          }}
        >
          <Image
            src={props.image}
            alt={props.title}
            layout="fill"
            objectFit="cover"
          />

          {showNewBadge && (
            <Box
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                background: "linear-gradient(135deg, #00aaff, #0066cc)",
                color: "white",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.5px",
                padding: "4px 8px",
                borderRadius: "4px",
                textTransform: "uppercase",
                boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
              }}
            >
              Yeni
            </Box>
          )}

          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "55%",
              background:
                "linear-gradient(180deg, rgba(20,20,20,0) 0%, rgba(20,20,20,0.85) 70%, rgba(20,20,20,1) 100%)",
              pointerEvents: "none",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              left: 12,
              right: 12,
              bottom: 10,
              color: "white",
            }}
          >
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: 700,
                lineHeight: 1.2,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textShadow: "0 1px 4px rgba(0,0,0,0.8)",
              }}
            >
              {props.title}
            </Typography>
            {props.date && (
              <Typography
                sx={{
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.75)",
                  mt: 0.3,
                }}
              >
                {props.date}
              </Typography>
            )}
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
