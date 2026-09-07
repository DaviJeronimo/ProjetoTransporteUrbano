package school.sptech.rotasmart.model;

import java.util.UUID;
//adicionando comentário para corrigir commit errado
public class Veiculo {
    private UUID id;
        private String placa;
        private String modelo;
        private Integer capacidade;
        private String tipo;
        private String status;
        private String linha;

    public Veiculo() {
    }

    public Veiculo(UUID id, String placa, String modelo, Integer capacidade, String tipo, String status, String linha) {
        this.id = id;
        this.placa = placa;
        this.modelo = modelo;
        this.capacidade = capacidade;
        this.tipo = tipo;
        this.status = status;
        this.linha = linha;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getModelo() {
        return modelo;
    }

    public Integer getCapacidade() {
        return capacidade;
    }

    public String getTipo() {
        return tipo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLinha() {
        return linha;
    }
}
