## 🚘 carrosWeb (Frontend - Angular)

Frontend desenvolvido em **Angular** para consumir a API [`carrosAPI`](https://github.com/andreflf/carrosAPI.git).  
A aplicação possui autenticação JWT, controle de permissões e CRUD completo para **Carros**, **Marcas** e **Acessórios**.

## 🧰 Tecnologias Utilizadas

- **Angular 17+**
- **TypeScript**
- **SCSS**
- **Bootstrap / MDBootstrap (modais e componentes visuais)**
- **HTTPClient para consumo da API REST**
- **Guards e Interceptors para autenticação JWT**

## 🔑 Funcionalidades

- **Login com JWT**
  - Acesso autenticado com token armazenado em `localStorage`
  - Usuários `ADMIN` e `USER` com permissões diferentes no template

- **CRUD completo:**
  - 🚗 **Carros**
  - 🏷️ **Marcas**
  - ⚙️ **Acessórios**

- **Controle de acesso no template**
  - O menu e botões se adaptam conforme o papel do usuário

- **Uso de Modais**
  - Inserção e edição de dados via modais do MDBootstrap


## 🧱 Estrutura do Projeto
```
src/
└── app/
│ ├── components/
│ │ ├── carros/
│ │ ├── marcas/
│ │ ├── acessorios/
│ │ └── layout/
│ ├── services/
│ ├── models/
│ ├── app.routes.ts
│ ├── auth/
│ │ ├── interceptors.ts
│ │ └── guards.ts
├── environments/
├── styles.scss
└── index.html
```

## 🚀 Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/andreflf/carrosWeb.git

Acesse a pasta:
cd carrosWeb

Instale as dependências:
npm install

Inicie o servidor de desenvolvimento:
ng serve

Acesse no navegador:
http://localhost:4200

⚙️ Integração com o Backend
O frontend consome os endpoints da carrosAPI via HttpClient.

Defina a URL base da API no arquivo:
src/environments/environment.ts

Exemplo:
```
export const environment = {
  production: false,
  SERVIDOR: 'http://ipPublicoOuLocalHost:8080'
};
```

🧠 Próximas Melhorias: 
 Tela de cadastro de usuário,
 Tela de login aprimorada (feedback de erro),
 Tema escuro (Dark Mode),
 Paginação e busca nas listas.

👨‍💻 Autor: André Fialho - Frontend Developer | Angular | TypeScript | Spring Integration 
🔗[LinkedIn - André Fialho](https://www.linkedin.com/in/andrefialho22/)
