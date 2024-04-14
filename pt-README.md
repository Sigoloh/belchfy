# Belchfy [en](https://github.com/Sigoloh/belchfy/blob/main/README.md)
## Porque o YouTube perdeu o controle sobre seus anúncios

# Início Rápido
Como este projeto está em um estágio muito (MUITO) inicial, optei por não fornecer uma imagem já compilada. Para ver o Belchfy com seus próprios olhos, construa a imagem Docker e altere o arquivo `compose.yml` conforme necessário para fazê-lo funcionar para você.

# Visão Geral
Belchfy é uma camada fina em torno do [Pytube](https://pytube.io/) atuando como um cliente para consumir streams de áudio do YouTube sem os anúncios irritantes. Ele apresenta isso em uma interface onde você pode criar filas e ouvir playlists do YouTube sem ter que assistir a anúncios de 20 segundos para consumir músicas de 2 minutos.

# Como funciona?
A API `pydub` [API](./belchfy-py) recebe solicitações da API principal e coleta dados de stream das páginas do YouTube. A API principal então armazena seu conteúdo no SQLite para armazenar informações que não são voláteis, como ID da playlist, ID do vídeo, nome do vídeo e muito mais. Além disso, como as URLs de stream do YouTube têm uma validade de cerca de 5 horas, a API faz o melhor para evitar que a API `pydub` busque um stream toda vez.

# O que quero adicionar ao Belchfy?
### Bem, eu tenho um sonho
Quero fazer o Belchfy ser o mais parecido possível com o YouTube Music. Aqui está o meu roadmap para alcançar isso:
- [ ] Rotinas para atualizar URLs de stream toda vez que a cacheada expirar
- [ ] Algoritmo de recomendação usando web scraping para que o YouTube não possa cancelar minhas chaves de API
- [ ] Uma interface melhor
- [ ] Uma maneira de obter o feed do YouTube do usuário e apresentá-lo na interface sem muita latência

Provavelmente, se eu tiver energia para fazer este projeto acontecer, mais ideias surgirão para tornar o Belchfy uma ferramenta agradável para aqueles que não podem (ou simplesmente não querem) pagar pelo YouTube Music Premium.

# Ajuda desejada!
Sou um desenvolvedor de software júnior e, como você verá se ler o código, minhas habilidades em front-end são muito limitadas. Portanto, se você tiver tempo e vontade de construir isso comigo, sinta-se à vontade para entrar em contato comigo pelo meu e-mail - augustoasigolo@gmail.com - ou contribuir fazendo um fork e mesclando aqui no GitHub.

# Sobre a licença
Direitos autorais (C) 2024 - Augusto Sigolo

Este programa é software livre: você pode redistribuí-lo e/ou modificá-lo sob os termos da Licença Pública Geral GNU, conforme publicado pela Free Software Foundation, tanto a versão 3 da Licença quanto (à sua escolha) qualquer versão posterior.

Este programa é distribuído na esperança de que seja útil, mas SEM QUALQUER GARANTIA; sem mesmo a garantia implícita de COMERCIABILIDADE ou ADEQUAÇÃO A UMA FINALIDADE ESPECÍFICA. Veja a Licença Pública Geral GNU para mais detalhes.

Você deveria ter recebido uma cópia da Licença Pública Geral GNU junto com este programa. Se não recebeu, veja <https://www.gnu.org/licenses/>.

Se você quiser entrar em contato comigo, use o meu e-mail fornecido acima ou qualquer outro meio que encontrar!
