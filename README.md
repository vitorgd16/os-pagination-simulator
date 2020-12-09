# algoritmos-paginacao-so
Trabalho de modelos de páginação do S.O.

# Atenção desenvolvedor
Caso esteja trabalhando com diferentes localizações de root localmente ou utilizando programas como XAMPP, siga as seguintes instruções para que o projeto funcione adequadamente:
 1. Dentro de "application/config/" crie um arquivo de nome "constantsPath.php".  
 2. Adicione o código no arquivo descrito no seguinte passo (2.1.):  
   2.1. <?php defined("PATH") OR define("PATH", "/localizacao/root/projeto");  
   2.2. Substitua a string "/localizacao/root/projeto" pelo caminho do root até a pasta do projeto.  
   2.3. Exemplo teórico: Caso utilize o XAMPP, seus projetos são localizados dentro da pasta HTDOCS, portanto o HTDOCS é seu root, e a pasta do algoritmo é o caminho que deve colocar no arquivo.  
   2.4. Exemplo prático: "/algoritmos-paginacao-so"  
