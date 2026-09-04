package school.sptech.rotasmart.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import school.sptech.rotasmart.model.Veiculo;

import java.util.List;
import java.util.UUID;

@Repository
public class VeiculoDao {
    private final JdbcTemplate jdbcTemplate;

    public VeiculoDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Veiculo> rowMapper = (resultSet, rowNum) -> new Veiculo(
            UUID.fromString((resultSet.getString("id"))),
            resultSet.getString("placa"),
            resultSet.getString("modelo"),
            resultSet.getInt("capacidade"),
            resultSet.getString("tipo"),
            resultSet.getString("status"),
            resultSet.getString("linha")
    );

    public void salvar(Veiculo veiculo) {

        String sql = "INSERT INTO veiculo (id, placa, modelo, capacidade, tipo, status, linha) VALUES (?, ?, ?, ?, ?, ?)";

        jdbcTemplate.update(
                sql,
                veiculo.getId().toString(),
                veiculo.getPlaca(),
                veiculo.getModelo(),
                veiculo.getCapacidade(),
                veiculo.getTipo(),
                veiculo.getStatus(),
                veiculo.getLinha()
        );
    }

    public List<Veiculo> listar() {

        String sql = "SELECT * FROM veiculo";

        return jdbcTemplate.query(sql, rowMapper);
    }

    public Veiculo buscarPorId(UUID id){
        String sql = "SELECT * FROM veiculo WHERE id = ?";
        List<Veiculo> resultadoBusca = jdbcTemplate.query(sql, rowMapper, id.toString());

        if (resultadoBusca.isEmpty()){
            return null;
        }

        return resultadoBusca.getFirst();
    }

    public int atualizar(UUID id, Veiculo veiculo) {
        String sql = "UPDATE veiculo SET placa = ?, modelo = ?, capacidade = ?, tipo = ?, " +
                "status = ?, linha = ? WHERE ID = ?";
        return jdbcTemplate.update(sql, veiculo.getPlaca(),
                veiculo.getModelo(), veiculo.getCapacidade(), veiculo.getTipo(),
                veiculo.getStatus(), veiculo.getLinha(), id.toString());
    }

    public int deletar(UUID id) {

        String sql = "DELETE FROM veiculo WHERE id = ?";

        return jdbcTemplate.update(sql, id.toString());
    }
}
