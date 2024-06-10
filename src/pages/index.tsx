import { Inter } from "next/font/google";
import Paymenyt from "../components/Payments";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between md:p-12 ${inter.className}`}
    >
      <Paymenyt />
    </main>
  );
}
