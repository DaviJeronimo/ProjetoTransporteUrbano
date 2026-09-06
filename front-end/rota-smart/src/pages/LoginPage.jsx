import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/UsuarioForm.module.css";
import pageStyles from "../styles/UsuariosPage.module.css";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  function efetuarLogin(e) {
    e.preventDefault();
    if (email && senha) {
      // Simula a validação e navega para a gestão de veículos
      navigate("/veiculos");
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  }

  return (
    <main className={pageStyles.pageContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.painelEsquerdo}>
          <h2 className={styles.tituloPainel}>Novo por aqui?</h2>
          <p className={styles.textoPainel}>
            Crie sua conta para começar a gerenciar sua frota no RotaSmart.
          </p>
          <button 
            className={styles.btnIrLogin} 
            onClick={() => navigate("/cadastro")}
          >
            CADASTRAR
          </button>
        </div>

        <div className={styles.painelDireito}>
          <h2 className={styles.tituloForm}>Entrar no RotaSmart</h2>

          <form onSubmit={efetuarLogin}>
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

            <button type="submit" className={styles.btnCadastrar}>
              ENTRAR
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}