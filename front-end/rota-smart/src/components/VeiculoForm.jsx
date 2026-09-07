import { CardErro } from "../components/CardErro";
import styles from "../styles/VeiculoForm.module.css";
import logo from "../assets/rotasmart-logo.png";

export function VeiculoForm({ 
  modelo, setModelo, 
  placa, setPlaca, 
  capacidade, setCapacidade, 
  tipo, setTipo, 
  status, setStatus, 
  linha, setLinha, 
  cadastrarVeiculo,
  mensagemErro,
  setMensagemErro
}) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.bannerEsquerdo}>
        <h2 className={styles.tituloBanner}>RotaSmart</h2>
        <p className={styles.subtituloBanner}>
          Cadastre novos veículos para manter o controle da frota e das rotas atualizado.
        </p>
      </div>

      
      <div className={styles.secaoFormulario}>
        <img src={logo} alt="RotaSmart Logo" className={styles.logoForm} />
        <h3 className={styles.tituloForm}>Cadastrar Veículo</h3>

        
        <CardErro 
          mensagem={mensagemErro} 
          aoFechar={() => setMensagemErro("")} 
        />

        <form 
          className={styles.formulario}
          noValidate
          onSubmit={(e) => { e.preventDefault(); cadastrarVeiculo(); }}
        >
          <input 
            className={styles.inputVeiculo}
            value={modelo} 
            onChange={(e) => setModelo(e.target.value)} 
            placeholder="Modelo" 
          />
          <input 
            className={styles.inputVeiculo}
            value={placa} 
            onChange={(e) => setPlaca(e.target.value)} 
            placeholder="Placa (ex: ABC-1D23)" 
          />
          <input 
            className={styles.inputVeiculo}
            type="number" 
            value={capacidade} 
            onChange={(e) => setCapacidade(e.target.value)} 
            placeholder="Capacidade" 
          />
          <input 
            className={styles.inputVeiculo}
            value={tipo} 
            onChange={(e) => setTipo(e.target.value)} 
            placeholder="Tipo (ex: Ônibus, Van, Micro-ônibus)" 
          />
          <input 
            className={styles.inputVeiculo}
            value={linha} 
            onChange={(e) => setLinha(e.target.value)} 
            placeholder="Linha" 
          />
          <select 
            className={styles.inputVeiculo}
            value={status || "DISPONIVEL"} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="DISPONIVEL">Disponível</option>
            <option value="EM_ROTA">Em Rota</option>
            <option value="EM_MANUTENCAO">Em Manutenção</option>
          </select>

          <button className={styles.btnCadastrar} type="submit">
            CADASTRAR
          </button>
        </form>
      </div>
    </div>
  );
}