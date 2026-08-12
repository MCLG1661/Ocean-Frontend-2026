import type { Route } from "./+types/home";
import { Personagens } from "../welcome/personagens";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ocean Frontend 2026" },
    {
      name: "description",
      content: "Projeto Frontend desenvolvido no Samsung Ocean 2026",
    },
  ];
}

export default function Home() {
  return <Personagens />;
}
