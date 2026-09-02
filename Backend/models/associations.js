import Usuario from "./Usuario.js";
import Lote from "./Lote.js";
import Racao from "./Racao.js";
import Mortalidade from "./Mortalidade.js";
import Categoria from "./Categoria.js";
import Avaliacao from "./Avaliacao.js";
import Pesagem from "./Pesagem.js";
import Vacina from "./Vacina.js";
import MatrizVacina from "./MatrizVacina.js";
import Matrizes from "./Matrizes.js";
import Galpao from "./Galpao.js";
import Entrada from "./Entrada.js";

// Usuário → Lotes
Usuario.hasMany(Lote, {
    foreignKey: "user_id"
});

Lote.belongsTo(Usuario, {
    foreignKey: "user_id"
});

// Lote → Ração

Lote.hasMany(Racao, {
    foreignKey: "lote_id"
});

Racao.belongsTo(Lote, {
    foreignKey: "lote_id"
});

// Lote → Mortalidade
Lote.hasMany(Mortalidade, {
    foreignKey: "lote_id"
});

Mortalidade.belongsTo(Lote, {
    foreignKey: "lote_id"
});

// Lote → Galpão
Galpao.hasMany(Lote, {
    foreignKey: "galpao_id",
});

Lote.belongsTo(Galpao, {
    foreignKey: "galpao_id",
});

// Categoria → Avaliações
Categoria.hasMany(Avaliacao, {
    foreignKey: "categoria_id"
});

Avaliacao.belongsTo(Categoria, {
    foreignKey: "categoria_id"
});

// Lote → Avaliações
Lote.hasMany(Avaliacao, {
    foreignKey: "lote_id"
});

Avaliacao.belongsTo(Lote, {
    foreignKey: "lote_id"
});

// Lote → Pesagens
Lote.hasMany(Pesagem, {
    foreignKey: "lote_id"
});

Pesagem.belongsTo(Lote, {
    foreignKey: "lote_id"
});

// Lote → Vacinas
Lote.hasMany(Vacina, {
    foreignKey: "lote_id"
});

Vacina.belongsTo(Lote, {
    foreignKey: "lote_id"
});

// Matriz/Vacina → MAtrizVacina
MatrizVacina.belongsTo(Matrizes, {
    foreignKey: 'matriz_id'
});

MatrizVacina.belongsTo(Vacina, {
    foreignKey: 'vacina_id'
});
Matrizes.hasMany(MatrizVacina, {
    foreignKey: "matriz_id"
});
Vacina.hasMany(MatrizVacina, {
    foreignKey: "vacina_id"
});

// Entrada → Lote
Lote.hasOne(Entrada, {
    foreignKey: "lote_id"
});

Entrada.belongsTo(Lote, {
    foreignKey: "lote_id"
});