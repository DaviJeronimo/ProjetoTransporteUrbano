package school.sptech.rotasmart.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import school.sptech.rotasmart.model.Usuario;


import java.util.List;
import java.util.UUID;

@Repository
public class UsuarioDao {

    private final JdbcTemplate template;

    public UsuarioDao(JdbcTemplate template) {
        this.template = template;
    }

    private final RowMapper<Usuario> rowMapper = (resultSet, rowNum) -> new Usuario(
            UUID.fromString((resultSet.getString("id"))),
            resultSet.getString("nome"),
            resultSet.getString("email"),
            resultSet.getString("senha"),
            resultSet.getString("cargo")
    );

    public void salvar(Usuario usuario) {

        String sql = "INSERT INTO usuario (id, nome, email, senha, cargo) VALUES (?, ?, ?, ?, ?)";

        template.update(sql, usuario.getId(), usuario.getNome(), usuario.getEmail(),
                usuario.getSenha(), usuario.getCargo());
    }

    public Usuario autenticar(String email, String senha) {
        String sql = "SELECT * FROM usuario WHERE email = ? AND senha = ?";
        List<Usuario> resultado = template.query(sql, rowMapper, email, senha);

        if (resultado.isEmpty()) {
            return null;
        }
        return resultado.getFirst();
    }

    public List<Usuario> listar() {
        String sql = "SELECT * FROM usuario";
        return template.query(sql, rowMapper);
    }

    public Usuario buscarPorId(UUID id) {

        String sql = "SELECT * FROM usuario WHERE id = ?";
        List<Usuario> resultadoBusca = template.query(sql, rowMapper, id.toString());

        if (resultadoBusca.isEmpty()) {
            return null;
        }
        return resultadoBusca.getFirst();
    }

    public int atualizar(UUID id, Usuario usuario) {
        String sql = "UPDATE usuario SET nome = ?, email = ?, senha = ?, cargo = ? WHERE id = ?";

        return template.update(sql, usuario.getNome(), usuario.getEmail(),
                usuario.getSenha(), usuario.getCargo(), id.toString());
    }

    public int deletar(UUID id){
        String sql = "DELETE FROM usuario WHERE id = ?";

        return template.update(sql, id.toString());
    }
}
