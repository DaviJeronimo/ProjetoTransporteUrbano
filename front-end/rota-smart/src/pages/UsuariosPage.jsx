import axios from "axios";
import { useState } from "react";
import styles from "../styles/UsuariosPage.module.css";
import { UsuarioForm } from "../components/UsuarioForm";
import { UsuarioList } from "../components/UsuarioList";

export function UsuariosPage() {
    // Definido como null até a implementação da autenticação no login
    const [usuarioLogado, setUsuarioLogado] = useState(null); 

    const [usuarios, setUsuarios] = useState([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cargo, setCargo] = useState("");

    function buscarDados() {
        axios.get("http://localhost:8080/usuarios")
        .then(resposta => setUsuarios(resposta.data))
        .catch(error => console.log("Houve um erro na requisição:", error));
    }

    function cadastrarUsuario() {
        axios.post("http://localhost:8080/usuarios", { nome, email, senha, cargo })
        .then(() => {
            setNome(""); setEmail(""); setSenha(""); setCargo("");
            if (usuarioLogado?.cargo?.toLowerCase() === "administrador") {
                buscarDados();
            }
        })
        .catch(() => console.log("Erro na requisição"));
    }

    function atualizarUsuario(id) {
        axios.put(`http://localhost:8080/usuarios/${id}`, { nome, email, senha, cargo })
        .then(() => {
            setNome(""); setEmail(""); setSenha(""); setCargo("");
            buscarDados();
        })
        .catch(() => console.log("Erro na requisição"));
    }

    function deletarUsuario(id) {
        axios.delete(`http://localhost:8080/usuarios/${id}`)
        .then(() => buscarDados())
        .catch(() => console.log("Erro na requisição"));
    }

    function irParaLogin() {
        console.log("Redirecionando para tela de Login...");
    }

    const AdminLogado = usuarioLogado?.cargo?.toLowerCase() === "administrador";

    return (
        <main className={styles.pageContainer}>
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