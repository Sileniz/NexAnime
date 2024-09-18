import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/footer/footer";

export const metadata: Metadata = {
  title: "NexAnime",
  description: "Anime season guide",
  authors: [{"name": "Walisson (Sileniz)", "url": "github.com/sileniz"}],
  keywords: ["React", "NextJS", "AnimeGuide"],
  creator: "Walisson (Sileniz)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="pt-BR">
      <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
