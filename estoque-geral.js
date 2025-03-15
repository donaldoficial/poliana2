// estoque-geral.js

// Inicializa o estoque geral no localStorage, se não existir
if (!localStorage.getItem('estoqueGeral')) {
    localStorage.setItem('estoqueGeral', JSON.stringify({
        empresas: [],
        produtos: [],
        movimentacoes: [], // Inclui entradas, saídas e devoluções
        enderecos: [] // Armazena as vagas de endereçamento
    }));
}

// Função para obter o estoque geral
function getEstoqueGeral() {
    return JSON.parse(localStorage.getItem('estoqueGeral'));
}

// Função para salvar o estoque geral
function salvarEstoqueGeral(estoque) {
    localStorage.setItem('estoqueGeral', JSON.stringify(estoque));
}

// Funções para gerenciar empresas
function adicionarEmpresa(cnpj, nome, codigo) {
    const estoque = getEstoqueGeral();
    const empresaExistente = estoque.empresas.find(e => e.codigo === codigo);
    if (empresaExistente) {
        throw new Error('Empresa já cadastrada!');
    }
    estoque.empresas.push({ cnpj, nome, codigo });
    salvarEstoqueGeral(estoque);
}

function listarEmpresas() {
    return getEstoqueGeral().empresas;
}

// Funções para gerenciar produtos
function adicionarProduto(nome, tipo, empresaCodigo, endereco, quantidade, fabricacao, validade) {
    const estoque = getEstoqueGeral();
    estoque.produtos.push({
        nome,
        tipo,
        empresaCodigo,
        endereco,
        quantidade,
        fabricacao,
        validade
    });
    salvarEstoqueGeral(estoque);
}

function listarProdutos() {
    return getEstoqueGeral().produtos;
}

function atualizarProduto(nome, novosDados) {
    const estoque = getEstoqueGeral();
    const produtoIndex = estoque.produtos.findIndex(p => p.nome === nome);
    if (produtoIndex === -1) {
        throw new Error('Produto não encontrado!');
    }
    estoque.produtos[produtoIndex] = { ...estoque.produtos[produtoIndex], ...novosDados };
    salvarEstoqueGeral(estoque);
}

function removerProduto(nome) {
    const estoque = getEstoqueGeral();
    estoque.produtos = estoque.produtos.filter(p => p.nome !== nome);
    salvarEstoqueGeral(estoque);
}

// Funções para gerenciar movimentações (entradas, saídas, devoluções)
function adicionarMovimentacao(tipo, numeroNota, empresaCodigo, produtoNome, quantidade, motivo = null) {
    const estoque = getEstoqueGeral();
    estoque.movimentacoes.push({
        tipo,
        numeroNota,
        empresaCodigo,
        produto: produtoNome,
        quantidade,
        motivo,
        data: new Date().toLocaleString('pt-BR')
    });
    salvarEstoqueGeral(estoque);
}

function listarMovimentacoes() {
    return getEstoqueGeral().movimentacoes;
}

// Funções para gerenciar endereços (vagas)
function adicionarEndereco(vaga, status = 'disponivel') {
    const estoque = getEstoqueGeral();
    estoque.enderecos.push({ vaga, status });
    salvarEstoqueGeral(estoque);
}

function listarEnderecos() {
    return getEstoqueGeral().enderecos;
}

function atualizarEndereco(vaga, novosDados) {
    const estoque = getEstoqueGeral();
    const enderecoIndex = estoque.enderecos.findIndex(e => e.vaga === vaga);
    if (enderecoIndex === -1) {
        throw new Error('Endereço não encontrado!');
    }
    estoque.enderecos[enderecoIndex] = { ...estoque.enderecos[enderecoIndex], ...novosDados };
    salvarEstoqueGeral(estoque);
}

// Exportando as funções para uso em outros arquivos
export {
    getEstoqueGeral,
    adicionarEmpresa,
    listarEmpresas,
    adicionarProduto,
    listarProdutos,
    atualizarProduto,
    removerProduto,
    adicionarMovimentacao,
    listarMovimentacoes,
    adicionarEndereco,
    listarEnderecos,
    atualizarEndereco
};