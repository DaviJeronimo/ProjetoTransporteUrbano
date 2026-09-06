import axios from "axios";
import { useState, useEffect } from "react";
import styles from "../styles/UsuariosPage.module.css";
import { VeiculoForm } from "../components/VeiculoForm";
import { VeiculoList } from "../components/VeiculoList";

export function VeiculosPage() {
  
  const [usuarioLogado] = useState({ id: 1, cargo: "administrador" });

  const [veiculos, setVeiculos] = useState([]);
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState("");
  const [linha, setLinha] = useState("");

  const eAdmin = usuarioLogado?.cargo?.toLowerCase() === "administrador";

  function buscarVeiculos() {
    const url = eAdmin 
      ? "http://localhost:8080/veiculos"
      : `http://localhost:8080/veiculos?usuarioId=${usuarioLogado?.id}`;

    axios.get(url)
      .then((resposta) => setVeiculos(resposta.data))
      .catch((erro) => console.log("Erro ao buscar veículos:", erro));
  }

  useEffect(() => {
    buscarVeiculos();
  }, []);

  function cadastrarVeiculo() {
    axios.post("http://localhost:8080/veiculos", {
      modelo,
      placa,
      capacidade: Number(capacidade),
      tipo,
      status,
      linha
    })
    .then(() => {
      setModelo("");
      setPlaca("");
      setCapacidade("");
      setTipo("");
      setStatus("");
      setLinha("");
      buscarVeiculos();
    })
    .catch((erro) => console.log("Erro ao cadastrar veículo:", erro));
  }

  function deletarVeiculo(id) {
    axios.delete(`http://localhost:8080/veiculos/${id}`)
      .then(() => buscarVeiculos())
      .catch((erro) => console.log("Erro ao deletar veículo:", erro));
  }

  return (
    <main className={styles.pageContainer}>
      <VeiculoForm 
        modelo={modelo} setModelo={setModelo}
        placa={placa} setPlaca={setPlaca}
        capacidade={capacidade} setCapacidade={setCapacidade}
        tipo={tipo} setTipo={setTipo}
        status={status} setStatus={setStatus}
        linha={linha} setLinha={setLinha}
        cadastrarVeiculo={cadastrarVeiculo}
      />

      <VeiculoList 
        veiculos={veiculos} 
        deletarVeiculo={deletarVeiculo} 
        eAdmin={eAdmin} 
      />
    </main>
  );
}