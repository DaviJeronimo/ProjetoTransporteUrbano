import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardErro } from "../components/CardErro";
import styles from "../styles/UsuarioForm.module.css";
import pageStyles from "../styles/UsuariosPage.module.css";
import logo from "../assets/rotasmart-logo.png";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const navigate = useNavigate();

  function entrar() {
    setMensagemErro(""); 

    if (!email || !senha) {
      setMensagemErro("Preencha todos os campos!");
      return;
    }

    axios.post("http://localhost:8080/usuarios/login", { email, senha })
      .then((resposta) => {
        alert(`Bem-vindo, ${resposta.data.nome}!`);
        
        
        navigate("/veiculos", {
          state: {
            usuarioLogado: resposta.data
          }
        });
      })
      .catch((erro) => {
        if (erro.response && erro.response.data) {
          setMensagemErro(erro.response.data);
        } else {
          setMensagemErro("Erro ao conectar com o servidor.");
        }
      });
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
            type="button" 
            className={styles.btnIrLogin} 
            onClick={() => navigate("/cadastro")}
          >
            CADASTRAR
          </button>
        </div>

        <div className={styles.painelDireito}>
          <img src={logo} alt="RotaSmart Logo" className={styles.logoForm} />
          <h2 className={styles.tituloForm}>Entrar no RotaSmart</h2>

          <CardErro 
            mensagem={mensagemErro} 
            aoFechar={() => setMensagemErro("")} 
          />

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

          <button type="button" className={styles.btnCadastrar} onClick={entrar}>
            ENTRAR
          </button>
        </div>
      </div>
    </main>
  );
}