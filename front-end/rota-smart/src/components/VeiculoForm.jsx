import styles from "../styles/VeiculoForm.module.css";

export function VeiculoForm({ 
  modelo, setModelo, 
  placa, setPlaca, 
  capacidade, setCapacidade,
  tipo, setTipo,
  status, setStatus,
  linha, setLinha,
  cadastrarVeiculo 
}) {
  return (
    <div className={styles.formCard}>
      <h3 className={styles.titulo}>Cadastrar Veículo</h3>

      <div className={styles.campo}>
        <input 
          className={styles.inputCampo} 
          type="text"
          placeholder="Modelo (ex: Caio Apache VIP)" 
          value={modelo} 
          onChange={(e) => setModelo(e.target.value)} 
        />
      </div>

      <div className={styles.campo}>
        <input 
          className={styles.inputCampo} 
          type="text"
          placeholder="Placa" 
          value={placa} 
          onChange={(e) => setPlaca(e.target.value)} 
        />
      </div>

      <div className={styles.campo}>
        <input 
          className={styles.inputCampo} 
          type="number"
          placeholder="Capacidade (passageiros)" 
          value={capacidade} 
          onChange={(e) => setCapacidade(e.target.value)} 
        />
      </div>

      <div className={styles.campo}>
        <input 
          className={styles.inputCampo} 
          type="text"
          placeholder="Tipo (ex: Ônibus, Van, Micro-ônibus)" 
          value={tipo} 
          onChange={(e) => setTipo(e.target.value)} 
        />
      </div>

      <div className={styles.campo}>
        <select 
          className={styles.inputCampo} 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Selecione o Status</option>
          <option value="Ativo">Ativo</option>
          <option value="Manutenção">Manutenção</option>
          <option value="Inativo">Inativo</option>
        </select>
      </div>

      <div className={styles.campo}>
        <input 
          className={styles.inputCampo} 
          type="text"
          placeholder="Linha (ex: 8000-10 Lapa / Ramos)" 
          value={linha} 
          onChange={(e) => setLinha(e.target.value)} 
        />
      </div>

      <button className={styles.btnCadastrar} onClick={cadastrarVeiculo}>
        Cadastrar
      </button>
    </div>
  );
}