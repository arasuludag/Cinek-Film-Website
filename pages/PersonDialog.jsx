import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function normalize(text) {
  if (!text) return "";
  return text.replace(/<br\s*\/?\s*>/gi, "\n");
}

export default function PersonDialog({ name, text, image, job }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        onClick={() => setOpen(true)}
        sx={{
          color: "rgba(255,255,255,0.65)",
          borderColor: "rgba(255,255,255,0.2)",
          borderRadius: 0,
          letterSpacing: "0.12em",
          fontSize: "0.7rem",
          px: 2.5,
          py: 0.75,
          "&:hover": {
            borderColor: "rgba(255,255,255,0.8)",
            color: "white",
            backgroundColor: "rgba(255,255,255,0.05)",
          },
        }}
      >
        Biyografi
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#0d0d0d",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 1,
            boxShadow: "0 24px 80px rgba(0,0,0,0.85)",
          },
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "rgba(255,255,255,0.4)",
            "&:hover": { color: "white", backgroundColor: "rgba(255,255,255,0.08)" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <DialogContent sx={{ pt: 4, pb: 4, px: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, mb: 3 }}>
            {image && (
              <Avatar
                src={image}
                alt={name}
                sx={{
                  width: 80,
                  height: 80,
                  border: "1px solid rgba(255,255,255,0.15)",
                  flexShrink: 0,
                }}
              />
            )}
            <Box>
              <Typography
                variant="h5"
                sx={{ color: "white", fontWeight: 600, lineHeight: 1.2, mb: 0.5 }}
              >
                {name}
              </Typography>
              {job && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontSize: "0.68rem",
                  }}
                >
                  {job}
                </Typography>
              )}
            </Box>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 3 }} />

          <Typography
            component="div"
            sx={{
              whiteSpace: "pre-wrap",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.85,
              fontSize: "0.92rem",
            }}
          >
            {normalize(text)}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
