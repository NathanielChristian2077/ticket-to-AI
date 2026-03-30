import './index.css'
import MapGraph from './components/MapGraph'

export default function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h1>Projeto Ferrovias A*</h1>
        <p>Ferrovias e rotas entre capitais</p>

        <section className="panel">
          <h2>Algoritmo</h2>
          <select>
            <option>Malha Completa</option>
            <option>Kruskal</option>
            <option>AG</option>
          </select>
        </section>

        <section className="panel">
          <h2>Parâmetros</h2>

          <label>
            Origem
            <select>
              <option>São Paulo</option>
            </select>
          </label>

          <label>
            Destino
            <select>
              <option>Rio de Janeiro</option>
            </select>
          </label>

          <button>Run A*</button>
        </section>

        <section className="panel">
          <h2>Sumário</h2>
          <p>Distância Total: --</p>
          <p>Custo Total: --</p>
          <p>Transbordos: --</p>
        </section>
      </aside>

      <main className="main">
        <div className="map-area">
          <MapGraph />
        </div>

        <div className="details-panel">
          <h2>Detalhes</h2>
          <p>Amostragem de resultados detalhados</p>
        </div>
      </main>
    </div>
  )
}
