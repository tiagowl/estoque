# Critérios de Aceitação - Sistema de Controle de Estoque

## Definição de Pronto (Definition of Done)

Uma user story é considerada "Pronta" quando:
- ✅ Código desenvolvido e revisado
- ✅ Testes unitários e de integração passando
- ✅ Interface responsiva (mobile e desktop)
- ✅ Validações de formulário implementadas
- ✅ Mensagens de erro claras e úteis
- ✅ Documentação técnica atualizada
- ✅ Aprovado pelo Product Owner

---

## EPIC 1: Autenticação e Landing Page

### US-001: Landing Page de Marketing

**Cenários de Sucesso:**
- [ ] Página inicial carrega em menos de 3 segundos
- [ ] Exibe seção hero com valor proposição claro
- [ ] Mostra benefícios principais do produto (3-5 itens)
- [ ] Inclui call-to-action para cadastro/login visível
- [ ] Design responsivo funciona em mobile e desktop
- [ ] Links de navegação funcionam corretamente

**Casos Extremos:**
- [ ] Página carrega mesmo com conexão lenta
- [ ] Imagens têm fallback caso não carreguem
- [ ] Texto é legível em diferentes tamanhos de tela

**Validações:**
- [ ] SEO básico implementado (meta tags)
- [ ] Acessibilidade: contraste de cores adequado
- [ ] Performance: Lighthouse score > 80

---

### US-002: Cadastro de Usuário

**Cenários de Sucesso:**
- [ ] Usuário preenche formulário com email, senha e confirmação de senha
- [ ] Sistema valida email único no banco de dados
- [ ] Senha tem mínimo de 8 caracteres
- [ ] Confirmação de senha deve ser igual à senha
- [ ] Após cadastro bem-sucedido, usuário é redirecionado para login
- [ ] Mensagem de sucesso é exibida

**Casos Extremos:**
- [ ] Email já cadastrado: exibe mensagem "Email já está em uso"
- [ ] Senha muito curta: exibe erro antes de submeter
- [ ] Senhas não coincidem: exibe erro em tempo real
- [ ] Campos obrigatórios vazios: botão desabilitado ou erro exibido
- [ ] Email inválido: validação de formato antes de submeter

**Validações:**
- [ ] Email deve ter formato válido (regex)
- [ ] Senha deve ter pelo menos 8 caracteres
- [ ] Todos os campos obrigatórios devem ser preenchidos
- [ ] Dados são salvos corretamente no banco de dados
- [ ] Senha é criptografada antes de salvar

---

### US-003: Login no Sistema

**Cenários de Sucesso:**
- [ ] Usuário insere email e senha corretos
- [ ] Sistema autentica e cria sessão
- [ ] Usuário é redirecionado para dashboard do sistema
- [ ] Token de autenticação é armazenado de forma segura

**Casos Extremos:**
- [ ] Email não cadastrado: exibe "Email ou senha incorretos"
- [ ] Senha incorreta: exibe "Email ou senha incorretos" (não revela qual está errado)
- [ ] Campos vazios: botão desabilitado ou erro exibido
- [ ] Sessão expira após período de inatividade
- [ ] Múltiplas tentativas falhas: implementar rate limiting

**Validações:**
- [ ] Autenticação JWT ou similar implementada
- [ ] Sessão persiste entre reloads da página
- [ ] Logout remove sessão corretamente
- [ ] Rotas protegidas redirecionam para login se não autenticado

---

## EPIC 2: Gestão de Produtos

### US-004: Cadastrar Produto

**Cenários de Sucesso:**
- [ ] Usuário acessa formulário de cadastro via drawer
- [ ] Preenche nome, preço de custo e preço de venda
- [ ] Sistema valida que preço de venda >= preço de custo
- [ ] Produto é salvo no banco de dados
- [ ] Drawer fecha e lista é atualizada automaticamente
- [ ] Mensagem de sucesso é exibida

**Casos Extremos:**
- [ ] Nome vazio: exibe erro "Nome é obrigatório"
- [ ] Preço de custo negativo: exibe erro "Preço deve ser positivo"
- [ ] Preço de venda menor que custo: exibe aviso (permitir com confirmação)
- [ ] Valores decimais: aceita até 2 casas decimais
- [ ] Nome muito longo: limita a 100 caracteres

**Validações:**
- [ ] Nome: obrigatório, mínimo 3 caracteres, máximo 100
- [ ] Preço de custo: obrigatório, numérico, >= 0
- [ ] Preço de venda: obrigatório, numérico, >= 0
- [ ] Dados são persistidos corretamente no banco
- [ ] Usuário logado é associado ao produto

---

### US-005: Listar Produtos

**Cenários de Sucesso:**
- [ ] Lista exibe todos os produtos do usuário logado
- [ ] Tabela mostra: nome, preço de custo, preço de venda, estoque atual
- [ ] Componente Data Table do shadcn/ui é utilizado
- [ ] Lista carrega em menos de 2 segundos
- [ ] Ordenação por colunas funciona

**Casos Extremos:**
- [ ] Nenhum produto cadastrado: exibe mensagem "Nenhum produto cadastrado"
- [ ] Muitos produtos (100+): paginação funciona corretamente
- [ ] Erro ao carregar: exibe mensagem de erro amigável
- [ ] Produtos de outros usuários não aparecem

**Validações:**
- [ ] Apenas produtos do usuário logado são exibidos
- [ ] Dados são formatados corretamente (moeda, números)
- [ ] Performance: carrega até 1000 produtos sem travamento

---

### US-006: Editar Produto

**Cenários de Sucesso:**
- [ ] Usuário clica em "Editar" na linha do produto
- [ ] Drawer abre à direita com formulário preenchido
- [ ] Usuário altera campos desejados
- [ ] Ao salvar, produto é atualizado no banco
- [ ] Lista é atualizada com novos dados
- [ ] Drawer fecha automaticamente

**Casos Extremos:**
- [ ] Tentativa de editar produto de outro usuário: erro 403
- [ ] Validações iguais ao cadastro devem ser aplicadas
- [ ] Cancelar edição: drawer fecha sem salvar
- [ ] Produto deletado durante edição: exibe erro apropriado

**Validações:**
- [ ] Mesmas validações do cadastro
- [ ] Timestamp de atualização é registrado
- [ ] Histórico de alterações pode ser rastreado (opcional)

---

### US-007: Excluir Produto

**Cenários de Sucesso:**
- [ ] Usuário clica em "Excluir" na linha do produto
- [ ] Modal de confirmação é exibido
- [ ] Ao confirmar, produto é removido do banco
- [ ] Lista é atualizada automaticamente
- [ ] Mensagem de sucesso é exibida

**Casos Extremos:**
- [ ] Produto com movimentações: perguntar se deseja manter histórico
- [ ] Produto em venda pendente: bloquear exclusão ou avisar
- [ ] Cancelar exclusão: modal fecha sem excluir
- [ ] Erro na exclusão: exibe mensagem de erro

**Validações:**
- [ ] Apenas produtos do usuário podem ser excluídos
- [ ] Confirmação obrigatória antes de excluir
- [ ] Soft delete ou hard delete (definir estratégia)

---

### US-008: Filtrar Produtos

**Cenários de Sucesso:**
- [ ] Usuário aplica filtro por nome
- [ ] Lista é atualizada mostrando apenas produtos que correspondem
- [ ] Filtros podem ser combinados (nome + faixa de preço)
- [ ] Limpar filtros restaura lista completa

**Casos Extremos:**
- [ ] Filtro sem resultados: exibe "Nenhum produto encontrado"
- [ ] Filtro com caracteres especiais: trata corretamente
- [ ] Múltiplos filtros: combinação funciona corretamente
- [ ] Mobile: drawer de filtros funciona corretamente

**Validações:**
- [ ] Filtros são aplicados no backend (performance)
- [ ] Filtros persistem durante navegação (opcional)
- [ ] Filtros são resetados ao sair da página

---

## EPIC 3: Movimentação de Estoque

### US-009: Registrar Entrada de Estoque

**Cenários de Sucesso:**
- [ ] Usuário seleciona produto da lista
- [ ] Abre formulário de entrada com campos: quantidade, observação (opcional)
- [ ] Ao salvar, estoque do produto é incrementado
- [ ] Movimentação é registrada no histórico
- [ ] Notificações de estoque baixo são verificadas

**Casos Extremos:**
- [ ] Quantidade zero ou negativa: exibe erro
- [ ] Quantidade muito alta: permitir com confirmação
- [ ] Produto não encontrado: exibe erro
- [ ] Observação muito longa: limita a 500 caracteres

**Validações:**
- [ ] Quantidade: obrigatória, numérica, > 0
- [ ] Produto deve existir e pertencer ao usuário
- [ ] Estoque é atualizado atomicamente (transação)
- [ ] Histórico é registrado com timestamp correto

---

### US-010: Registrar Saída de Estoque

**Cenários de Sucesso:**
- [ ] Usuário seleciona produto da lista
- [ ] Abre formulário de saída com campos: quantidade, observação (opcional)
- [ ] Ao salvar, estoque do produto é decrementado
- [ ] Movimentação é registrada no histórico
- [ ] Sistema valida que estoque não fica negativo

**Casos Extremos:**
- [ ] Quantidade maior que estoque disponível: exibe erro "Estoque insuficiente"
- [ ] Estoque ficaria negativo: bloquear operação
- [ ] Quantidade zero ou negativa: exibe erro
- [ ] Produto sem estoque: exibe aviso antes de permitir

**Validações:**
- [ ] Quantidade: obrigatória, numérica, > 0, <= estoque atual
- [ ] Estoque não pode ficar negativo
- [ ] Operação é atômica (transação)
- [ ] Histórico registra tipo "Saída" corretamente

---

### US-011: Visualizar Histórico de Movimentações

**Cenários de Sucesso:**
- [ ] Lista exibe todas as movimentações em ordem cronológica (mais recente primeiro)
- [ ] Cada linha mostra: data, produto, tipo (Entrada/Saída), quantidade, observação
- [ ] Filtros por produto e tipo funcionam
- [ ] Paginação funciona para grandes volumes

**Casos Extremos:**
- [ ] Nenhuma movimentação: exibe "Nenhuma movimentação registrada"
- [ ] Muitas movimentações: paginação ou scroll infinito funciona
- [ ] Produto deletado: exibe "Produto removido" no histórico
- [ ] Data muito antiga: formatação correta

**Validações:**
- [ ] Apenas movimentações do usuário logado
- [ ] Dados são ordenados corretamente
- [ ] Performance: carrega até 10.000 registros com paginação

---

## EPIC 4: Notificações de Estoque

### US-012: Definir Estoque Mínimo

**Cenários de Sucesso:**
- [ ] Usuário edita produto e define campo "Estoque Mínimo"
- [ ] Valor é salvo no banco de dados
- [ ] Campo aceita apenas números inteiros >= 0
- [ ] Valor é exibido na listagem de produtos

**Casos Extremos:**
- [ ] Valor negativo: exibe erro
- [ ] Valor decimal: arredonda ou exige inteiro
- [ ] Valor muito alto: permitir (pode ser intencional)
- [ ] Campo vazio: considera como 0 (sem notificação)

**Validações:**
- [ ] Estoque mínimo: numérico, inteiro, >= 0
- [ ] Valor é persistido corretamente
- [ ] Atualização não afeta estoque atual

---

### US-013: Receber Notificação de Estoque Baixo

**Cenários de Sucesso:**
- [ ] Quando estoque atual <= estoque mínimo, notificação é gerada
- [ ] Notificação aparece no dashboard
- [ ] Lista de produtos em estoque baixo é atualizada
- [ ] Notificação persiste até estoque ser reposto acima do mínimo

**Casos Extremos:**
- [ ] Estoque mínimo não definido: não gera notificação
- [ ] Múltiplos produtos em estoque baixo: todas são exibidas
- [ ] Estoque reposto: notificação desaparece automaticamente
- [ ] Produto sem estoque: aparece em lista separada

**Validações:**
- [ ] Notificação é gerada em tempo real após movimentação
- [ ] Não gera notificações duplicadas
- [ ] Performance: verificação não impacta outras operações

---

## EPIC 5: Dashboard

### US-014: Visualizar Total de Produtos

**Cenários de Sucesso:**
- [ ] Card exibe número total de produtos cadastrados
- [ ] Número é atualizado em tempo real
- [ ] Card usa componente do shadcn/ui
- [ ] Design é responsivo

**Casos Extremos:**
- [ ] Zero produtos: exibe "0"
- [ ] Muitos produtos (1000+): número é formatado corretamente
- [ ] Erro ao carregar: exibe "-" ou spinner

**Validações:**
- [ ] Contagem é precisa
- [ ] Atualiza após cadastro/exclusão
- [ ] Performance: carrega rapidamente

---

### US-015: Visualizar Produtos em Estoque Baixo

**Cenários de Sucesso:**
- [ ] Card exibe quantidade de produtos com estoque <= estoque mínimo
- [ ] Número é atualizado automaticamente
- [ ] Clicar no card leva para lista filtrada

**Casos Extremos:**
- [ ] Nenhum produto em estoque baixo: exibe "0"
- [ ] Todos os produtos em estoque baixo: número correto
- [ ] Produtos sem estoque mínimo definido: não contam

**Validações:**
- [ ] Contagem considera apenas produtos com estoque mínimo definido
- [ ] Atualiza em tempo real após movimentações

---

### US-016: Visualizar Produtos Sem Estoque

**Cenários de Sucesso:**
- [ ] Card exibe quantidade de produtos com estoque = 0
- [ ] Número é atualizado automaticamente
- [ ] Clicar no card leva para lista filtrada

**Casos Extremos:**
- [ ] Nenhum produto sem estoque: exibe "0"
- [ ] Todos os produtos sem estoque: número correto
- [ ] Produtos nunca tiveram estoque: contam na lista

**Validações:**
- [ ] Contagem é precisa (estoque = 0)
- [ ] Atualiza em tempo real

---

## EPIC 6: Gestão de Vendas

### US-017: Registrar Venda

**Cenários de Sucesso:**
- [ ] Usuário acessa tela de vendas
- [ ] Seleciona produtos e quantidades
- [ ] Sistema calcula total automaticamente
- [ ] Ao finalizar, venda é registrada
- [ ] Estoque de cada produto é atualizado automaticamente
- [ ] Histórico de movimentações registra as saídas

**Casos Extremos:**
- [ ] Produto sem estoque suficiente: exibe erro antes de finalizar
- [ ] Múltiplos produtos: todos são processados corretamente
- [ ] Quantidade zero: produto é removido da venda
- [ ] Cancelar venda: nenhuma alteração é feita

**Validações:**
- [ ] Pelo menos um produto deve ser adicionado
- [ ] Quantidades devem ser > 0
- [ ] Estoque suficiente para todos os produtos
- [ ] Transação é atômica (tudo ou nada)
- [ ] Total é calculado corretamente

---

### US-018: Atualização Automática de Estoque na Venda

**Cenários de Sucesso:**
- [ ] Ao finalizar venda, estoque é decrementado automaticamente
- [ ] Cada produto vendido tem seu estoque atualizado
- [ ] Movimentações de saída são criadas automaticamente
- [ ] Notificações de estoque baixo são verificadas

**Casos Extremos:**
- [ ] Erro ao atualizar um produto: venda inteira é revertida
- [ ] Estoque fica negativo: operação é bloqueada
- [ ] Produto deletado durante venda: exibe erro

**Validações:**
- [ ] Todas as atualizações são atômicas
- [ ] Histórico é registrado corretamente
- [ ] Rollback funciona em caso de erro

---

## EPIC 7: Gestão de Fornecedores

### US-019: Cadastrar Fornecedor

**Cenários de Sucesso:**
- [ ] Usuário preenche nome, telefone e seleciona produtos fornecidos
- [ ] Sistema valida telefone (formato básico)
- [ ] Fornecedor é salvo no banco
- [ ] Relação com produtos é estabelecida

**Casos Extremos:**
- [ ] Nome vazio: exibe erro
- [ ] Telefone inválido: exibe erro ou formata automaticamente
- [ ] Nenhum produto selecionado: permite (fornecedor genérico)
- [ ] Produto já associado a outro fornecedor: permite múltiplos fornecedores

**Validações:**
- [ ] Nome: obrigatório, mínimo 3 caracteres
- [ ] Telefone: formato válido (aceitar vários formatos)
- [ ] Produtos: lista de IDs válidos

---

### US-020: Listar Fornecedores

**Cenários de Sucesso:**
- [ ] Lista exibe todos os fornecedores do usuário
- [ ] Mostra nome, telefone e quantidade de produtos fornecidos
- [ ] Ordenação e filtros funcionam

**Casos Extremos:**
- [ ] Nenhum fornecedor: exibe mensagem apropriada
- [ ] Muitos fornecedores: paginação funciona

**Validações:**
- [ ] Apenas fornecedores do usuário logado
- [ ] Dados são formatados corretamente

---

### US-021: Editar Fornecedor

**Cenários de Sucesso:**
- [ ] Usuário edita informações do fornecedor
- [ ] Pode adicionar/remover produtos fornecidos
- [ ] Alterações são salvas corretamente

**Casos Extremos:**
- [ ] Validações iguais ao cadastro
- [ ] Produtos removidos: relação é atualizada

**Validações:**
- [ ] Mesmas validações do cadastro
- [ ] Relações com produtos são atualizadas

---

### US-022: Excluir Fornecedor

**Cenários de Sucesso:**
- [ ] Usuário confirma exclusão
- [ ] Fornecedor é removido
- [ ] Relações com produtos são mantidas (opcional) ou removidas

**Casos Extremos:**
- [ ] Fornecedor com produtos associados: perguntar ação
- [ ] Cancelar: nenhuma alteração

**Validações:**
- [ ] Confirmação obrigatória
- [ ] Estratégia de relacionamentos definida

---

## EPIC 8: Exportação de Dados

### US-023: Exportar Produtos para CSV/Excel

**Cenários de Sucesso:**
- [ ] Usuário clica em "Exportar Produtos"
- [ ] Arquivo CSV/Excel é gerado com todos os produtos
- [ ] Arquivo contém: nome, preço de custo, preço de venda, estoque atual, estoque mínimo
- [ ] Arquivo é baixado automaticamente
- [ ] Formato é compatível com Excel/LibreOffice

**Casos Extremos:**
- [ ] Nenhum produto: arquivo vazio ou mensagem
- [ ] Muitos produtos (1000+): arquivo é gerado corretamente
- [ ] Caracteres especiais: encoding UTF-8 preservado
- [ ] Erro na geração: exibe mensagem de erro

**Validações:**
- [ ] Arquivo é válido e pode ser aberto
- [ ] Todos os dados são exportados corretamente
- [ ] Performance: gera em menos de 10 segundos para 1000 produtos

---

### US-024: Exportar Movimentações para CSV/Excel

**Cenários de Sucesso:**
- [ ] Usuário clica em "Exportar Movimentações"
- [ ] Arquivo CSV/Excel é gerado com histórico
- [ ] Arquivo contém: data, produto, tipo, quantidade, observação
- [ ] Filtros aplicados são respeitados na exportação
- [ ] Arquivo é baixado automaticamente

**Casos Extremos:**
- [ ] Nenhuma movimentação: arquivo vazio ou mensagem
- [ ] Muitas movimentações: arquivo é gerado corretamente
- [ ] Filtros aplicados: apenas dados filtrados são exportados
- [ ] Datas: formato correto no arquivo

**Validações:**
- [ ] Arquivo é válido
- [ ] Dados correspondem ao filtro aplicado
- [ ] Performance: gera em tempo razoável

---

## EPIC 9: Interface e Experiência do Usuário

### US-025: Layout Responsivo Mobile

**Cenários de Sucesso:**
- [ ] Todas as telas funcionam corretamente em mobile (< 768px)
- [ ] Menu sidebar se transforma em drawer no mobile
- [ ] Formulários são legíveis e usáveis
- [ ] Botões têm tamanho adequado para toque
- [ ] Texto é legível sem zoom

**Casos Extremos:**
- [ ] Telas muito pequenas (320px): layout não quebra
- [ ] Orientação landscape: layout se adapta
- [ ] Tabelas grandes: scroll horizontal ou cards

**Validações:**
- [ ] Testado em dispositivos reais ou emuladores
- [ ] Touch targets >= 44x44px
- [ ] Performance adequada em mobile

---

### US-026: Paginação na Listagem (Desktop)

**Cenários de Sucesso:**
- [ ] Lista exibe 10-20 itens por página
- [ ] Controles de paginação funcionam (anterior, próximo, página específica)
- [ ] Número total de páginas é exibido
- [ ] Página atual é destacada

**Casos Extremos:**
- [ ] Menos itens que página: não mostra paginação
- [ ] Muitas páginas: mostra elipse ou scroll
- [ ] Mudança de filtros: volta para página 1

**Validações:**
- [ ] Performance: carrega página rapidamente
- [ ] Estado da paginação persiste durante navegação (opcional)

---

### US-027: Rolagem Infinita (Mobile)

**Cenários de Sucesso:**
- [ ] Ao rolar até o final, mais itens são carregados automaticamente
- [ ] Indicador de carregamento é exibido
- [ ] Não há duplicação de itens
- [ ] Performance é mantida mesmo com muitos itens carregados

**Casos Extremos:**
- [ ] Poucos itens: não ativa scroll infinito
- [ ] Erro ao carregar: exibe mensagem e permite retry
- [ ] Conexão lenta: loading state é claro

**Validações:**
- [ ] Performance: scroll suave
- [ ] Memória: não acumula muitos itens no DOM

---

### US-028: Filtros com Drawer (Mobile)

**Cenários de Sucesso:**
- [ ] Botão de filtros aparece acima da listagem no mobile
- [ ] Ao clicar, drawer abre com opções de filtro
- [ ] Filtros podem ser aplicados e limpos
- [ ] Drawer fecha ao aplicar filtros
- [ ] Lista é atualizada com filtros aplicados

**Casos Extremos:**
- [ ] Drawer não fecha: botão de fechar funciona
- [ ] Filtros complexos: todos funcionam no drawer
- [ ] Cancelar: drawer fecha sem aplicar

**Validações:**
- [ ] Drawer é acessível (teclado, screen reader)
- [ ] Filtros funcionam igual ao desktop

---

## Checklist Geral de Qualidade

### Funcionalidade
- [ ] Todas as validações implementadas
- [ ] Mensagens de erro claras e úteis
- [ ] Feedback visual para ações do usuário
- [ ] Estados de loading apropriados

### Performance
- [ ] Carregamento inicial < 3 segundos
- [ ] Operações CRUD < 1 segundo
- [ ] Listagens paginadas carregam rapidamente
- [ ] Sem memory leaks

### Segurança
- [ ] Autenticação obrigatória para rotas protegidas
- [ ] Validação de dados no backend
- [ ] Proteção contra SQL injection
- [ ] Senhas criptografadas

### Acessibilidade
- [ ] Contraste de cores adequado
- [ ] Navegação por teclado
- [ ] Screen reader friendly
- [ ] Labels adequados em formulários

### Responsividade
- [ ] Funciona em mobile (320px+)
- [ ] Funciona em tablet (768px+)
- [ ] Funciona em desktop (1024px+)
- [ ] Touch targets adequados


