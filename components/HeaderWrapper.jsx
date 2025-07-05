// This is a SERVER component
import { checkUser } from "@/lib/checkUser";
import Header from "./Header"; // <- Your existing Header component

export default async function HeaderWrapper() {
  await checkUser(); // ✅ This runs only on server
  return <Header />;
}
