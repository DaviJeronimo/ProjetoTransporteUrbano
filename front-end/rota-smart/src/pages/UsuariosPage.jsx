import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "../styles/UsuariosPage.module.css";
import { UsuarioForm } from "../components/UsuarioForm";
import { CardErro } from "../components/CardErro";

export function UsuariosPage() {
    const navigate = useNavigate(); 

    const [usuarioLogado, setUsuarioLogado] = useState(null); 

    const [usuarios, setUsuarios] = useState([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cargo, setCargo] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");

    function buscarDados() {
        axios.get("http://localhost:8080/usuarios")
        .then(resposta => setUsuarios(resposta.data))
        .catch(error => console.log("Houve um erro na requisição:", error));
    }

    function irParaLogin() {
        navigate("/login");
    }

    function cadastrarUsuario() {
        setMensagemErro("");

        axios.post("http://localhost:8080/usuarios", { nome, email, senha, cargo })
        .then(() => {
            setNome(""); setEmail(""); setSenha(""); setCargo("");
            
            
            if (usuarioLogado?.cargo?.toLowerCase() === "administrador") {
                buscarDados();
            } else {
                irParaLogin(); 
            }
        })
        .catch((erro) => {
            if (erro.response && erro.response.data) {
                setMensagemErro(erro.response.data);
            } else {
                setMensagemErro("Erro ao cadastrar usuário.");
            }
        });
    }



    function deletarUsuario(id) {
        axios.delete(`http://localhost:8080/usuarios/${id}`)
        .then(() => buscarDados())
        .catch(() => console.log("Erro na requisição"));
    }

    const AdminLogado = usuarioLogado?.cargo?.toLowerCase() === "administrador";

    return (
        <main className={styles.pageContainer}>
            <CardErro 
                mensagem={mensagemErro} 
                aoFechar={() => setMensagemErro("")} 
            />

            <UsuarioForm 
                nome={nome} setNome={setNome}
                email={email} setEmail={setEmail}
                senha={senha} setSenha={setSenha}
                cargo={cargo} setCargo={setCargo}
                cadastrarUsuario={cadastrarUsuario}
                onNavigateLogin={irParaLogin}
            />
            
            {AdminLogado && (
                <div className={styles.secaoLista}>
                    <UsuarioList 
                        usuarios={usuarios}
                        atualizarUsuario={atualizarUsuario}
                        deletarUsuario={deletarUsuario}
                    />
                </div>
            )}
        </main>
    );
}