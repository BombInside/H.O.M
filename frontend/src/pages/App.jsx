import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

// 🔁 Компонент для переключения языка
function LangSwitch() {
  const { i18n } = useTranslation();
  return (
    <div style={{ marginLeft: "auto" }}>
      <Button color="inherit" onClick={() => i18n.changeLanguage("en")}>
        🇬🇧
      </Button>
      <Button color="inherit" onClick={() => i18n.changeLanguage("pl")}>
        🇵🇱
      </Button>
      <Button color="inherit" onClick={() => i18n.changeLanguage("ru")}>
        🇷🇺
      </Button>
    </div>
  );
}

// 🔧 Основной компонент приложения
export default function App() {
  const { t } = useTranslation();
  const [status, setStatus] = useState("loading");

  // ✅ Проверяем соединение с backend
  useEffect(() => {
    // Пробуем оба варианта — для Docker и локального запуска
    const urls = [
      "http://backend:8000/api/health", // внутри Docker
      "http://localhost:8000/api/health", // локально
    ];

    const checkApi = async () => {
      for (const url of urls) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            setStatus("ok");
            return;
          }
        } catch (e) {
          // просто переходим к следующему URL
        }
      }
      setStatus("error");
    };

    checkApi();
  }, []);

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#00274C" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            H.O.M — History Of Machines ⚙
          </Typography>
          <LangSwitch />
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 6, textAlign: "center" }}>
        <Card
          sx={{
            maxWidth: 600,
            mx: "auto",
            p: 3,
            borderRadius: "1rem",
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {t("Dashboard")}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 3 }}>
              {t("Welcome to H.O.M – Machine Maintenance System")}
            </Typography>

            {status === "loading" && <CircularProgress />}
            {status === "ok" && (
              <Typography color="green" variant="h6">
                🟢 Backend API Connected
              </Typography>
            )}
            {status === "error" && (
              <Typography color="red" variant="h6">
                🔴 Backend API Unavailable
              </Typography>
            )}

            <Button
              variant="contained"
              href="http://localhost:8000/api/docs"
              sx={{ mt: 3, bgcolor: "#007BFF" }}
            >
              {t("Open API Docs")}
            </Button>
          </CardContent>
        </Card>
      </Container>

      <Typography
        variant="body2"
        sx={{
          mt: 5,
          textAlign: "center",
          color: "#666",
        }}
      >
        Made with ❤️ by Valerii Semenov
      </Typography>
    </>
  );
}
