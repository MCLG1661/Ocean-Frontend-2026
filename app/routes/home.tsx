import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

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
  return <Welcome />;
}
