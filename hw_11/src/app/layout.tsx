import { CssBaseline } from "@mui/material";
import Providers from "./providers";
import Navbar from "@/layouts/Navbar";

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CssBaseline/>
        <Providers>
          <Navbar />
          {children}
          {modal}
        </Providers>
      </body>
    </html>
  );
}
