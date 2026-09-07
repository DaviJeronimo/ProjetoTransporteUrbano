import styles from "../styles/UsuarioForm.module.css";

export function CardErro({ mensagem, aoFechar }) {
  if (!mensagem){
     return null;
  }

  return (
    <div className={styles.cardErro}>
      <span>{mensagem}</span>
      <button  className={styles.btnFechar} onClick={aoFechar}>
        X
      </button>
    </div>
  );
}