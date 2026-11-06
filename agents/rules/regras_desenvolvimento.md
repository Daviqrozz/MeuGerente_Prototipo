Regra de Fluxo de Trabalho — Testes, Versionamento e Explicações
Esta regra vale para todos os prompts deste projeto e complementa a regra regra_projeto_meu_gerente_food.md.

1. Testes
Não rodar testes unitários automaticamente a cada prompt ou a cada alteração.

Não executar npm test, vitest, jest ou comandos equivalentes por conta própria.

Só rodar testes quando eu pedir de forma explícita (ex: "rode os testes").

Pode criar ou atualizar arquivos de teste quando a tarefa pedir, mas sem executá-los.

Se achar que um teste seria útil para validar a mudança, apenas sugira o comando no final da resposta e aguarde minha decisão.

2. Versionamento (Git)
O versionamento é responsabilidade exclusiva minha.

Não criar commits, nem automáticos nem manuais.

Não executar git add, git commit, git push, git pull, git merge, git rebase, git stash, git reset, git checkout ou git branch.

Não criar, trocar ou apagar branches.

Não alterar .gitignore, histórico ou configuração do Git, a menos que eu peça.

Comandos de leitura como git status e git diff são permitidos, se ajudarem a explicar o que mudou.

3. O que fazer em cada prompt
Realizar apenas as alterações pedidas no prompt, sem expandir o escopo.

Não refatorar arquivos que não fazem parte da tarefa.

Não instalar dependências novas sem avisar antes e explicar o motivo.

Não apagar arquivos sem avisar antes.

4. Explicação obrigatória ao final
Ao terminar cada tarefa, sempre explicar de forma clara o que foi alterado, neste formato:

Arquivos criados

caminho do arquivo: o que ele faz.

Arquivos modificados

caminho do arquivo: o que mudou e por quê.

Arquivos removidos (se houver)

caminho do arquivo: motivo.

Dependências adicionadas (se houver)

nome do pacote: para que serve.

Resumo em linguagem simples

2 a 4 frases dizendo o que o projeto passou a fazer depois dessa mudança.

Pontos de atenção

Dúvidas, decisões que tomou, limitações ou algo que eu deva conferir antes de fazer o commit.

5. Quando houver dúvida
Se o pedido for ambíguo, perguntar antes de alterar.

Se a alteração puder quebrar algo existente, avisar antes de fazer.

Nunca assumir que posso desfazer: pedir confirmação em mudanças grandes ou destrutivas.