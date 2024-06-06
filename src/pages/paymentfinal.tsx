import { Inter } from "next/font/google";
import PaymentFinal from "../components/PaymentFinal";

const inter = Inter({ subsets: ["latin"] });

export default function PaymentFinals() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-12 ${inter.className}`}
    >
      <PaymentFinal />
    </main>
  );
}
