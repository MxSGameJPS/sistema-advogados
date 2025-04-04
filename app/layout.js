import "./globals.css";

export const metadata = {
  title: "MaisDireito Advogados",
  description:
    "Assessoria jurídica de excelência para empresas nacionais e internacionais",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
