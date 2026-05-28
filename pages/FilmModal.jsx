import React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { getImageUrl } from "../lib/sanity";

function getEmbedUrl(rawUrl) {
  if (!rawUrl) return null;
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = url.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host.endsWith("youtube.com")) {
      if (url.pathname === "/watch") {
        const id = url.searchParams.get("v");
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
      const shortsMatch = url.pathname.match(/^\/shorts\/([^/]+)/);
      if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
      const embedMatch = url.pathname.match(/^\/embed\/([^/]+)/);
      if (embedMatch) return `https://www.youtube.com/embed/${embedMatch[1]}`;
    }
    if (host === "vimeo.com") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

export default function FilmModal({ film, open, onClose }) {
  const embedUrl = film ? getEmbedUrl(film.href) : null;
  const posterUrl = film ? getImageUrl(film.poster) : "";
  const dateLabel = film?.date
    ? new Date(film.date).toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
      })
    : "";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: "#141414",
          color: "white",
          borderRadius: "10px",
          overflow: "hidden",
          backgroundImage: "none",
        },
      }}
      BackdropProps={{
        sx: { backgroundColor: "rgba(0,0,0,0.85)" },
      }}
    >
      {!film ? null : (
        <Box>
          <Box sx={{ position: "relative", width: "100%", background: "#000" }}>
            {embedUrl ? (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "56.25%",
                }}
              >
                <Box
                  component="iframe"
                  src={embedUrl}
                  title={film.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  sx={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "56.25%",
                  backgroundImage: `url(${posterUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(2px) brightness(0.5)",
                }}
              />
            )}

            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "40%",
                background:
                  "linear-gradient(180deg, rgba(20,20,20,0) 0%, #141414 100%)",
                pointerEvents: "none",
              }}
            />

            <IconButton
              onClick={onClose}
              aria-label="Kapat"
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "white",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.85)" },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ p: { xs: 2.5, md: 4 } }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                lineHeight: 1.1,
                mb: 1,
                fontSize: { xs: "1.6rem", md: "2.2rem" },
              }}
            >
              {film.title}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 1,
                mb: 2,
              }}
            >
              {dateLabel && (
                <Typography
                  sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem" }}
                >
                  {dateLabel}
                </Typography>
              )}
              {film.categories?.map((c) => (
                <Chip
                  key={c._id}
                  label={c.name}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "white",
                    borderRadius: "4px",
                    height: 24,
                  }}
                />
              ))}
            </Box>

            {film.description && (
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                  mb: 3,
                }}
              >
                {film.description}
              </Typography>
            )}

            {film.href && !embedUrl && (
              <Button
                href={film.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                endIcon={<OpenInNewIcon />}
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.85)" },
                }}
              >
                İzle
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Dialog>
  );
}
