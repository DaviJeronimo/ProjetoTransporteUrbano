import { useNavigate } from "react-router-dom";
import styles from "../styles/UsuarioForm.module.css";

export function UsuarioForm({ 
  nome, setNome, 
  email, setEmail, 
  senha, setSenha, 
  cargo, setCargo, 
  cadastrarUsuario 
}) {
  const navigate = useNavigate(); 

  return (
    <div className={styles.cardContainer}>
      <div className={styles.painelEsquerdo}>
        <h2 className={styles.tituloPainel}>Bem-vindo!</h2>
        <p className={styles.textoPainel}>
          Para se manter conectado ao RotaSmart, acesse sua conta.
        </p>
        
        
        <button 
          type="button"
          className={styles.btnIrLogin} 
          onClick={() => navigate("/login")}
        >
          ENTRAR
        </button>
      </div>

      <div className={styles.painelDireito}>
        <h2 className={styles.tituloForm}>Criar Conta</h2>

        <div className={styles.campo}>
          <input 
            className={styles.inputCampo}
            type="text" 
            placeholder="Nome" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
          />
        </div>

        <div className={styles.campo}>
          <input 
            className={styles.inputCampo}
            type="email" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div className={styles.campo}>
          <input 
            className={styles.inputCampo}
            type="password" 
            placeholder="Senha" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
          />
        </div>

        <div className={styles.campo}>
          <select 
            className={styles.selectCampo} 
            value={cargo} 
            onChange={(e) => setCargo(e.target.value)}
          >
            <option value="">Selecione o Cargo</option>
            <option value="administrador">Administrador</option>
            <option value="motorista">Motorista</option>
          </select>
        </div>

        <button type="button" className={styles.btnCadastrar} onClick={cadastrarUsuario}>
          CADASTRAR
        </button>
      </div>
    </div>
  );
}