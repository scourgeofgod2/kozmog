import { redirect } from "next/navigation";

// /yonetim → rapor stüdyosu
export default function Yonetim() {
  redirect("/yonetim/rapor");
}
