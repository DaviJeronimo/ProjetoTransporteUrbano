import styles from "../styles/VeiculoList.module.css";

export function VeiculoList({ veiculos, deletarVeiculo, eAdmin }) {
  return (
    <div className={styles.listContainer}>
      <div className={styles.cabecalho}>
        <h3 className={styles.titulo}>Veículos Registrados</h3>
        <span className={styles.badgeFiltro}>
          {eAdmin ? "Administrador" : "Motorista"}
        </span>
      </div>

      {veiculos.map((veiculo) => (
        <div key={veiculo?.id} className={styles.itemVeiculo}>
          <div className={styles.infoVeiculo}>
            <strong>{veiculo?.modelo} - {veiculo?.placa}</strong>
            <p>Linha: {veiculo?.linha} | Tipo: {veiculo?.tipo}</p>
            <p>Capacidade: {veiculo?.capacidade} passageiros | Status: {veiculo?.status}</p>
          </div>
          
          {eAdmin && (
            <button 
              className={styles.btnDeletar} 
              onClick={() => deletarVeiculo(veiculo?.id)}
            >
              Excluir
            </button>
          )}
        </div>
      ))}
    </div>
  );
}