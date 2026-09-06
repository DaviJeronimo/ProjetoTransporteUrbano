package school.sptech.rotasmart.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.sptech.rotasmart.dao.VeiculoDao;
import school.sptech.rotasmart.model.Veiculo;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/veiculos")
@CrossOrigin(origins = "http://localhost:5173")


public class VeiculoController {
    private final VeiculoDao veiculoDao;

    public VeiculoController(VeiculoDao veiculoDao) {
        this.veiculoDao = veiculoDao;
    }

    @PostMapping
    public ResponseEntity<Veiculo> criar(@RequestBody Veiculo novoVeiculo) {
        if (!validarPlaca(novoVeiculo.getPlaca())) {

            return ResponseEntity.status(400).build();

        }

        if (novoVeiculo.getCapacidade() == null || novoVeiculo.getCapacidade() <= 0) {

            return ResponseEntity.status(400).build();
        }

        novoVeiculo.setId(UUID.randomUUID());
        novoVeiculo.setPlaca(novoVeiculo.getPlaca().toUpperCase());
        veiculoDao.salvar(novoVeiculo);
        return ResponseEntity.status(201).body(novoVeiculo);
    }

    @GetMapping
    public ResponseEntity<List<Veiculo>> listar(){
        List<Veiculo> veiculos = veiculoDao.listar();

        if (veiculos.isEmpty()){
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(200).body(veiculos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Veiculo> buscarPorID( @PathVariable UUID id){
        Veiculo veiculo = veiculoDao.buscarPorId(id);

        if (veiculo == null){
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.status(200).body(veiculo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Veiculo> atualizar(@PathVariable UUID id, @RequestBody Veiculo veiculoAtualizado){

        if (veiculoAtualizado.getCapacidade() != null && !validarPlaca(veiculoAtualizado.getPlaca())){
            return ResponseEntity.status(400).build();
        }

        if (veiculoAtualizado.getCapacidade() != null && veiculoAtualizado.getCapacidade() <= 0){
            return ResponseEntity.status(400).build();
        }

        if (veiculoAtualizado.getPlaca() != null){
            veiculoAtualizado.setPlaca(veiculoAtualizado.getPlaca().toUpperCase());
        }

        int linhasAfetadas = veiculoDao.atualizar(id, veiculoAtualizado);

        if (linhasAfetadas > 0) {
            veiculoAtualizado.setId(id);
            return ResponseEntity.status(200).body(veiculoAtualizado);
        }
        return ResponseEntity.status(404).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id){
        int linhasAfetadas = veiculoDao.deletar(id);
        if (linhasAfetadas > 0){
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(404).build();
    }

    private boolean validarPlaca (String placa){
        if (placa == null){
            return false;
        }
        String placaComparacao = placa.trim();

        // 1. Valida tamanho (7 ou 8 caracteres)
        if (placaComparacao.length() < 7 || placaComparacao
                .length() > 8) {
            return false;
        }

        if (placaComparacao.equals(placaComparacao.toLowerCase())) {
            return false;
        }

        return true;
    }
}
