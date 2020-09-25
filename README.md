# LabePhotos_backend

Projeto de backend para uma aplicação de fotos Labook.

# Documentação da API

https://documenter.getpostman.com/view/11590027/TVK5cMLb

# Endpoints
- POST (/signup) -> Cadastrar Usuários
- POST (/signin) -> Login dos Usuários
- POST (/photo/create) -> usuário armazena uma imagem
- GET (/photo/:id) -> Usuário recebe os detalhes de uma imagem
- GET (/photo) -> Usuário recebe uma lista de imagens criadas por ele

# Tecnologias
- Typescript
- knex
- express
- uuid
- bcrypt
- jsonwebtoken
- jest
