# jogo_de_xadrez

Passo a passo da criação do jogo de xadrez

1-Estruturar as pastas mais ou menos como imagino que vou precisar ✔️

2-Inicializar o projeto -> "npm init/ npm init -y"                 ✔️

3-Instalar o TS -> npm install typescript --save-dev               ✔️

4-Iniciar o projeto com TS -> npx tsc --init                       ✔️

5-Configurar o tsconfig.json                                       ✔️

6-Iniciar o Html                                                   ✔️

7-Inicir o CSS                                                     ✔️

8-Regras do Jogo                                                   ✔️

9-Adicionar uma primeira peça pra ver como tudo ta rodando         ✔️

10-Adicionar as outras peças além dos peões (torre, bispo, etc)

11-Implementar movimentação das peças

12-Validar regras de movimento (ex: bispo só anda na diagonal)

13-Alternar entre turnos (branco vs preto)

14-Armazenar o estado do jogo (pra resetar ou salvar)

15-Estilizar o tabuleiro (CSS bonito, responsivo etc.)

.

.

.

Projeto Finalizado                                                 ⏳


//////////////////////////////////////////////////////////////////////////// 


Estruturacao das pastas do jogo de xadrez

jogo_de_xadrez

public (# Arquivos visíveis diretamente pelo navegador) /  index.html ( # Página principal)               
src (# Código-fonte) / styles (# Estilos) / style.css               
                     / models (# Regras e lógica de peças) / Board.ts (# Representação do tabuleiro)
                                                             Piece.ts (# Classe base para peças)
                                                             Pawn.ts (# Peões)
                                                             Rook.ts (# Torres)
                                                             Knight.ts (# Cavalos)
                                                             Bishop.ts (# Bispos)
                                                             Queen.ts (# Rainha)
                                                             King.ts (# Rei)
                     / utils (# Funções auxiliares) / helpers.ts
                     / main.ts (# Arquivo principal que inicializa o jogo)  
                     

dist (# Arquivos compilados de JS)                      

tsconfig.json              # Configuração do TypeScript - Criado no passo 4
package.json               # Dependências e scripts - Criado no passo 2
README.md                  # Sobre o projeto


Regras do jogo de xadrez

Project -> [text](Documents/Xadrez_lei_da_FIDE.pdf)
Site -> https://www.cbx.org.br/files/downloads/Xadrez_lei_da_FIDE.pdf

