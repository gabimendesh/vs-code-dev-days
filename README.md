# Integre MCP com GitHub Copilot  
   
_Aprenda como fornecer ao GitHub Copilot mais ferramentas para expandir as capacidades do seu fluxo de trabalho de desenvolvimento. Tudo isso em menos de uma hora!_  
   
## Bem-vindo  
   
- **Para quem é**: Desenvolvedores que desejam aprimorar seus fluxos de trabalho assistidos por IA, usuários do GitHub Copilot e entusiastas de IA.  
- **O que você aprenderá**: Vamos apresentar os conceitos básicos do MCP, a configuração de um servidor GitHub MCP e a integração com o Modo Agente do Copilot.  
- **O que você irá construir**: Um fluxo de trabalho de desenvolvimento misto que utiliza o GitHub Copilot para gerenciar issues ao mesmo tempo em que atualiza o site de atividades extracurriculares da Escola Mergington High.  
- **Pré-requisitos**: Exercício [Começando com o Copilot](https://github.com/skills/getting-started-with-github-copilot)  
- **Duração**: Este exercício leva menos de uma hora para ser concluído.  
   
Neste exercício, você irá:  
   
1. Integrar um servidor GitHub MCP com o GitHub Copilot.  
2. Delegar ao Copilot a tarefa de pesquisar projetos similares e abrir issues.  
3. Pedir ao Copilot que encontre uma issue importante e a implemente da ideia até o pull request.  
4. Adicionar comentários a uma issue recentemente fechada.  

## Sobre o Projeto

Este exercício utiliza uma aplicação de exemplo: **Mergington High School Activities API** - uma API simples construída com FastAPI que permite aos estudantes visualizar e se inscrever em atividades extracurriculares.

### Características da Aplicação

- Visualizar todas as atividades extracurriculares disponíveis
- Realizar inscrições nas atividades
- API RESTful com documentação automática

### Estrutura da API

| Método | Endpoint                                                          | Descrição                                                         |
| ------ | ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| GET    | `/activities`                                                     | Obter todas as atividades com detalhes e contagem de participantes |
| POST   | `/activities/{activity_name}/signup?email=student@mergington.edu` | Inscrever-se em uma atividade                                      |

### Modelo de Dados

A aplicação usa um modelo de dados simples com identificadores significativos:

1. **Atividades** - Usa o nome da atividade como identificador:
   - Descrição
   - Cronograma
   - Número máximo de participantes permitidos
   - Lista de e-mails dos estudantes inscritos

2. **Estudantes** - Usa e-mail como identificador:
   - Nome
   - Nível de série

Todos os dados são armazenados em memória, o que significa que os dados serão redefinidos quando o servidor for reiniciado.

### Como começar este exercício  
   
> [!IMPORTANTE]  
> Este exercício pressupõe conhecimento básico sobre o [GitHub Copilot](https://github.com/features/copilot). Se você não estiver familiarizado, recomendamos o exercício [Começando com o Copilot](https://github.com/skills/getting-started-with-github-copilot).  
   
Basta copiar o exercício para sua conta, então dê cerca de **20 segundos** para o seu Octocat favorito (Mona) preparar a primeira lição, depois **atualize a página**.  
   
[![](https://img.shields.io/badge/Copy%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/new?template_owner=skills&template_name=integrate-mcp-with-copilot&owner=%40me&name=skills-integrate-mcp-with-copilot&description=Exercise:+Integrate+Model+Context+Protocol+with+GitHub+Copilot&visibility=public)
   
<details>  
<summary>Está com dificuldades? 🤷</summary><br/>  
   
Ao copiar o exercício, recomendamos as seguintes configurações:  
   
- Para o proprietário, escolha sua conta pessoal ou uma organização para hospedar o repositório.  
   
- Recomendamos criar um repositório público, já que repositórios privados usarão minutos de Actions.  
   
Se o exercício não ficar pronto em 20 segundos, por favor verifique a aba [Actions](../../actions).  
   
- Verifique se algum job está em execução. Às vezes, apenas demora um pouco mais.  
   
- Se a página mostrar um job com falha, por favor, abra uma issue. Legal, você encontrou um bug! 🐛  
   
</details>  
   
## Materiais das Atividades do VS Code Dev Days 2025

| #  | Topic                                              | Duration      | Description                                                                 | Resources                |
|----|----------------------------------------------------|--------------|-----------------------------------------------------------------------------|--------------------------|
| 01 | Técnicas Essenciais para uso do GitHub Copilot no VS Code | 30–45 minutes| Comece a utilizar o GitHub Copilot no VS Code.                                | [**Slides**](/slides/VSCode_GitHubCopilot-pt-BR.pdf)            |
| 02 | Community Session                                 | 30–45 minutes| Entendendo o que é MCP! | [**Slides**](/slides/MCP.pdf)  |
| 03 | Workshop                                          | 60 minutes   | Desenvolva habilidades com VS Code e GitHub Copilot.                        | [**Instruções**](/workshop/) |
| 04 | Introdução Workshop                               | -            | Material introdutório para o workshop.                                       | [**Video**](https://drive.google.com/file/d/1rTHwFEj56cijtwgyg5P3lF-hJi_eIv0L/view?usp=sharing) |

### Para seguir aprendendo

|              Laboratório              |                       Tópicos ensinados                     |                     Objetivo de Aprendizagem                |
| :------------------------------------: | :---------------------------------------------------------: | ----------------------------------------------------------- |
| [Hands-on com o GitHub Copilot: Criando Planos de Estudo com IA utilizando Modelos do GitHub](https://github.com/microsoft/lab-study-app/tree/main/tutorial/translations/pt-br) | Use o GitHub Copilot e o GitHub Models para gerar planos de estudo personalizados em uma aplicação web baseada em Flask. | Crie e personalize uma ferramenta de planejamento de estudos com IA usando o GitHub Copilot e o GitHub Models. Configure uma aplicação Flask, desenvolva prompts eficazes para criar trilhas de aprendizado personalizadas e incorpore testes de acessibilidade utilizando modos de chat personalizados. |
| [Awesome GitHub Copilot](https://github.com/github/awesome-copilot) | Coleção de recursos, ferramentas, extensões e exemplos para maximizar o uso do GitHub Copilot. | Explore uma ampla variedade de recursos comunitários, incluindo guias, ferramentas, extensões e casos de uso avançados para GitHub Copilot em diferentes linguagens e cenários de desenvolvimento. |

---  
   
&copy; 2025 GitHub &bull; [Código de Conduta](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [Licença MIT](https://gh.io/mit)