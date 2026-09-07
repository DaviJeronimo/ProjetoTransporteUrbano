import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VeiculoForm } from "../components/VeiculoForm";
import { VeiculoList } from "../components/VeiculoList";
import styles from "../styles/UsuariosPage.module.css";

export function VeiculosPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const usuarioLogado = location.state?.usuarioLogado;
  const [veiculos, setVeiculos] = useState([]);

  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [tipo, setTipo] = useState("");
  const [statusVeiculo, setStatusVeiculo] = useState("DISPONIVEL");
  const [linha, setLinha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  const eAdmin = usuarioLogado?.cargo?.toLowerCase() === "administrador";

  function buscarVeiculos() {
    if (!usuarioLogado) return;

    const url = eAdmin 
      ? "http://localhost:8080/veiculos"
      : `http://localhost:8080/veiculos?usuarioId=${usuarioLogado?.id}`;

    axios.get(url)
      .then((resposta) => setVeiculos(resposta.data))
      .catch(() => setMensagemErro("Erro ao buscar a lista de veículos."));
  }

  useEffect(() => {
    buscarVeiculos();
  }, [usuarioLogado]);

  if (!usuarioLogado) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "#ffffff" }}>
        <h2>Sessão expirada ou acesso não autorizado!</h2>
        <p>Faça login novamente para acessar esta tela.</p>
        <button onClick={() => navigate("/login")}>Ir para o Login</button>
      </div>
    );
  }

  function cadastrarVeiculo() {
    setMensagemErro("");

    
    if ( !modelo.trim() || !placa.trim() || !capacidade || !tipo.trim() || !linha.trim() ||!statusVeiculo) {
      setMensagemErro("Por favor, preencha todos os campos do formulário.");
      return;
    }

    if (Number(capacidade) <= 0) {
      setMensagemErro("A capacidade deve ser maior que zero.");
      return;
    }

    axios.post("http://localhost:8080/veiculos", {
      modelo: modelo.trim(),
      placa: placa.trim(),
      capacidade: Number(capacidade),
      tipo: tipo.trim(),
      status: statusVeiculo,
      linha: linha.trim()
    })
    .then(() => {
      setModelo("");
      setPlaca("");
      setCapacidade("");
      setTipo("");
      setStatusVeiculo("DISPONIVEL");
      setLinha("");
      buscarVeiculos();
    })
    .catch((erro) => {
      setMensagemErro(erro.response?.data || "Erro ao cadastrar veículo.");
    });
  }

  function deletarVeiculo(id) {
    axios.delete(`http://localhost:8080/veiculos/${id}`)
      .then(() => buscarVeiculos())
      .catch((erro) => console.log("Erro ao deletar veículo:", erro));
  }

  return (
    <main className={styles.pageContainer}>
      {eAdmin && (
        <VeiculoForm 
          modelo={modelo} setModelo={setModelo}
          placa={placa} setPlaca={setPlaca}
          capacidade={capacidade} setCapacidade={setCapacidade}
          tipo={tipo} setTipo={setTipo}
          status={statusVeiculo} setStatus={setStatusVeiculo}
          linha={linha} setLinha={setLinha}
          cadastrarVeiculo={cadastrarVeiculo}
          mensagemErro={mensagemErro}
          setMensagemErro={setMensagemErro}
        />
      )}

      <VeiculoList 
        veiculos={veiculos} 
        deletarVeiculo={deletarVeiculo} 
        eAdmin={eAdmin} 
      />
    </main>
  );
}