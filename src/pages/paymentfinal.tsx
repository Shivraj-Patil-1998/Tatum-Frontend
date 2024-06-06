import { Inter } from "next/font/google";
import PaymenytFinal from "../components/PaymentFinal";

const inter = Inter({ subsets: ["latin"] });

export default function PaymenyFinals() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-12 ${inter.className}`}
    >
      <PaymenytFinal />
    </main>
  );
}

