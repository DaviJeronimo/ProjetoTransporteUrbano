import styles from "../styles/UsuarioList.module.css";

export function UsuarioList({ usuarios = [], deletarUsuario }) {
  return (
    <div className={styles.listContainer}>
      <h3 className={styles.subtitulo}>Usuários Cadastrados (Visão do Administrador)</h3>
      
      <div className={styles.listaUsuarios}>
        {usuarios.length === 0 ? (
          <p className={styles.mensagemVazia}>Nenhum usuário cadastrado.</p>
        ) : (
          usuarios.map((usuario) => (
            <div key={usuario?.id} className={styles.itemUsuario}>
              <div className={styles.infoUsuario}>
                <strong>{usuario?.nome}</strong> — <span className={styles.emailText}>{usuario?.email}</span>
                <span className={usuario?.cargo?.toLowerCase() === "administrador" ? styles.badgeAdmin : styles.badgeMotorista}>
                  {usuario?.cargo}
                </span>
              </div>
              
              <div className={styles.acoesItem}>
                
                {deletarUsuario && (
                  <button className={styles.btnDeletar} onClick={() => deletarUsuario(usuario?.id)}>
                    Deletar
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}