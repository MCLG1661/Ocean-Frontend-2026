import { useEffect, useState } from "react";
import type { Route } from "./+types/home";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
};

type ApiResponse = {
  results: Character[];
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rick and Morty Explorer | Samsung Ocean" },
    {
      name: "description",
      content:
        "Aplicação React para explorar personagens de Rick and Morty, evoluída a partir do projeto desenvolvido no Samsung Ocean.",
    },
  ];
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCharacters() {
      try {
        setLoading(true);

        const response = await fetch(
          "https://rickandmortyapi.com/api/character"
        );

        if (!response.ok) {
          throw new Error("Não foi possível carregar os personagens.");
        }

        const data: ApiResponse = await response.json();
        setCharacters(data.results);
      } catch {
        setError("Não foi possível carregar os personagens.");
      } finally {
        setLoading(false);
      }
    }

    loadCharacters();
  }, []);

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="explorer">
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">SAMSUNG OCEAN • PORTFOLIO EDITION</span>

          <h1>
            Rick and Morty
            <strong> Explorer</strong>
          </h1>

          <p>
            Explore personagens do universo de Rick and Morty em uma
            experiência construída com React, TypeScript e integração com API.
          </p>

          <div className="tech-stack">
            <span>React</span>
            <span>TypeScript</span>
            <span>REST API</span>
            <span>React Router</span>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="section-header">
          <div>
            <span className="section-label">CHARACTER DATABASE</span>
            <h2>Explore o multiverso</h2>
          </div>

          <div className="search-box">
            <input
              type="search"
              placeholder="Buscar personagem..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Buscar personagem"
            />
          </div>
        </div>

        {loading && <p className="message">Carregando personagens...</p>}

        {error && <p className="message error">{error}</p>}

        {!loading && !error && (
          <>
            <p className="results">
              {filteredCharacters.length} personagens encontrados
            </p>

            <div className="character-grid">
              {filteredCharacters.map((character) => (
                <article className="character-card" key={character.id}>
                  <div className="image-container">
                    <img
                      src={character.image}
                      alt={character.name}
                      loading="lazy"
                    />

                    <span
                      className={`status status-${character.status.toLowerCase()}`}
                    >
                      {character.status}
                    </span>
                  </div>

                  <div className="card-content">
                    <span className="character-id">
                      CHARACTER #{String(character.id).padStart(3, "0")}
                    </span>

                    <h3>{character.name}</h3>

                    <div className="character-info">
                      <p>
                        <span>Espécie</span>
                        {character.species}
                      </p>

                      <p>
                        <span>Gênero</span>
                        {character.gender}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredCharacters.length === 0 && (
              <p className="message">
                Nenhum personagem encontrado para "{search}".
              </p>
            )}
          </>
        )}
      </section>

      <footer>
        <p>
          Projeto iniciado na formação Frontend Web com ReactJS do Samsung
          Ocean e evoluído como projeto de portfólio.
        </p>
      </footer>
    </main>
  );
}
