import Head from "next/head";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

const BLOG_FEED = "https://atknkrblt.blogspot.com/feeds/posts/default";
const BLOG_HOME = "https://atknkrblt.blogspot.com/";
const POSTS_PER_PAGE = 12;

function getPostLink(entry) {
  const link = (entry.link || []).find((l) => l.rel === "alternate");
  return link?.href;
}

function getPostThumbnail(entry) {
  const html = entry.content?.$t || entry.summary?.$t || "";
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  const raw = match?.[1] || entry["media$thumbnail"]?.url;
  if (!raw) return null;
  return raw.replace(/\/s\d+(-c)?\//, "/s800/");
}

function getSnippet(entry, max = 140) {
  const html = entry.content?.$t || entry.summary?.$t || "";
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

function fetchBloggerFeedJsonp(startIndex, maxResults) {
  return new Promise((resolve, reject) => {
    const callbackName = `__blogger_cb_${Date.now()}_${Math.floor(
      Math.random() * 1e9
    )}`;
    const script = document.createElement("script");
    let settled = false;

    const cleanup = () => {
      settled = true;
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    };

    const timeoutId = setTimeout(() => {
      if (!settled) {
        cleanup();
        reject(new Error("Blogger feed isteği zaman aşımına uğradı"));
      }
    }, 15000);

    window[callbackName] = (data) => {
      clearTimeout(timeoutId);
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      clearTimeout(timeoutId);
      cleanup();
      reject(new Error("Blogger feed yüklenemedi"));
    };

    script.src =
      `${BLOG_FEED}?alt=json-in-script` +
      `&start-index=${startIndex}` +
      `&max-results=${maxResults}` +
      `&callback=${callbackName}`;

    document.head.appendChild(script);
  });
}

function PostCard({ entry, featured = false }) {
  const href = getPostLink(entry);
  const thumb = getPostThumbnail(entry);
  const title = entry.title?.$t || "Başlıksız";
  const date = entry.published?.$t
    ? new Date(entry.published.$t).toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const snippet = getSnippet(entry, featured ? 220 : 130);

  return (
    <Box
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.07)",
        textDecoration: "none",
        color: "inherit",
        overflow: "hidden",
        transition: "border-color 0.25s, box-shadow 0.25s",
        "&:hover": {
          borderColor: "rgba(255,255,255,0.22)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.55)",
          "& .blog-thumb": { transform: "scale(1.04)" },
        },
      }}
    >
      {/* Image */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
          paddingTop: featured ? { xs: "56.25%", md: "36%" } : "58%",
          bgcolor: "#1c1c1c",
        }}
      >
        {thumb ? (
          <Box
            component="img"
            src={thumb}
            alt={title}
            className="blog-thumb"
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease",
            }}
          />
        ) : (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "rgba(255,255,255,0.06)",
                fontSize: featured ? "4rem" : "2.5rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                userSelect: "none",
              }}
            >
              CINEK
            </Typography>
          </Box>
        )}
      </Box>

      {/* Text */}
      <Box
        sx={{
          p: { xs: 2.5, md: featured ? 3.5 : 2.5 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {date && (
          <Typography
            sx={{
              color: "rgba(255,255,255,0.32)",
              fontSize: "0.7rem",
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            {date}
          </Typography>
        )}
        <Typography
          sx={{
            color: "white",
            fontWeight: 600,
            lineHeight: 1.3,
            fontSize: featured ? { xs: "1.2rem", md: "1.55rem" } : "0.98rem",
            mb: 1.5,
          }}
        >
          {title}
        </Typography>
        {snippet && (
          <Typography
            sx={{
              color: "rgba(255,255,255,0.48)",
              fontSize: "0.85rem",
              lineHeight: 1.75,
              flex: 1,
            }}
          >
            {snippet}
          </Typography>
        )}
        <Typography
          sx={{
            mt: 2.5,
            color: "rgba(255,255,255,0.28)",
            fontSize: "0.72rem",
            letterSpacing: "0.07em",
            alignSelf: "flex-end",
          }}
        >
          Devamını oku →
        </Typography>
      </Box>
    </Box>
  );
}

export default function Blog() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const startIndex = (page - 1) * POSTS_PER_PAGE + 1;
        const data = await fetchBloggerFeedJsonp(startIndex, POSTS_PER_PAGE);
        if (cancelled) return;
        setPosts(data.feed?.entry || []);
        setTotal(
          parseInt(data.feed?.["openSearch$totalResults"]?.$t || "0", 10)
        );
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPosts();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return () => {
      cancelled = true;
    };
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  const [featured, ...rest] = posts;

  return (
    <div>
      <Head>
        <title>Blog - Cinek Film</title>
        <meta
          name="description"
          content="Cinek Film blog yazıları — atknkrblt.blogspot.com üzerinden."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" href="/Favicon.png" />
        <link rel="shortcut icon" type="image/png" href="/Favicon.png" />
      </Head>

      <Navbar />

      {/* Spacer: the .navbar class is position:absolute (globals.css), so it's out of
          document flow. This box gives it the physical space it visually occupies:
          top:30 + logo:120 + bootstrap-padding:16 + gap:16 = ~182px */}
      <Box sx={{ height: "185px" }} />

      <Container maxWidth="lg" sx={{ pt: 0, pb: 10 }}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          sx={{ mb: 1.5, flexWrap: "wrap", gap: 1 }}
        >
          <Typography
            variant="h3"
            sx={{ color: "white", fontWeight: 200, letterSpacing: "-0.01em" }}
          >
            Blog
          </Typography>
          <Typography
            component="a"
            href={BLOG_HOME}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "rgba(255,255,255,0.35)",
              textDecoration: "none",
              fontSize: "0.8rem",
              letterSpacing: "0.04em",
              pb: 0.5,
              "&:hover": { color: "rgba(255,255,255,0.8)" },
            }}
          >
            atknkrblt.blogspot.com ↗
          </Typography>
        </Stack>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mb: { xs: 3, md: 5 } }} />

        {loading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
          >
            <CircularProgress sx={{ color: "rgba(255,255,255,0.4)" }} />
          </Box>
        )}

        {error && !loading && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography color="error" sx={{ mb: 1 }}>
              Yazılar yüklenemedi: {error}
            </Typography>
            <Typography
              component="a"
              href={BLOG_HOME}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "#bbb" }}
            >
              Blog'a doğrudan git ↗
            </Typography>
          </Box>
        )}

        {!loading && !error && posts.length === 0 && (
          <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>
            Henüz yazı yok.
          </Typography>
        )}

        {!loading && !error && posts.length > 0 && (
          <>
            {/* Featured first post — full width on page 1 */}
            {page === 1 && featured && (
              <Box sx={{ mb: 2.5 }}>
                <PostCard entry={featured} featured />
              </Box>
            )}

            {/* Remaining posts grid */}
            <Grid container spacing={2}>
              {(page === 1 ? rest : posts).map((entry) => {
                const key =
                  entry.id?.$t || getPostLink(entry) || entry.title?.$t;
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={key}
                    sx={{ display: "flex" }}
                  >
                    <PostCard entry={entry} />
                  </Grid>
                );
              })}
            </Grid>

            {totalPages > 1 && (
              <Stack alignItems="center" sx={{ mt: 6 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                  size="large"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "rgba(255,255,255,0.6)",
                    },
                  }}
                />
              </Stack>
            )}
          </>
        )}
      </Container>

      <Footer />
    </div>
  );
}
