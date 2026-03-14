# GAMEHUb
AMEHUB AI ULTIMATE é uma plataforma desktop gamer premium, desenhada para organizar, enriquecer e operar bibliotecas de jogos com experiência visual de console e inteligência local.

## Status atual

Este repositório iniciou pela **Etapa 1**: definição arquitetural monumental, divisão completa de subsistemas e organização de pastas para crescimento sustentável.

Consulte a documentação principal em:

- [`docs/arquitetura.md`](docs/arquitetura.md)

## Princípios do produto

- Domínio 100% em português do Brasil.
- Arquitetura modular por camadas e subsistemas especializados.
- Escalabilidade local com foco em performance, cache e observabilidade.
- Interface premium inspirada em hubs de console.
- Preparação para evolução contínua (plugins, novos importadores, novos provedores, novas experiências visuais).

## Estrutura de alto nível

O projeto está organizado em áreas independentes para reduzir acoplamento e facilitar evolução:

- `nucleo/`: bootstrap, estado global, eventos, tarefas e serviços transversais.
- `dados/`: persistência SQLite, migrações, entidades e repositórios.
- `dominio/`: entidades de negócio e contratos centrais.
- `ia/`: organização inteligente local com regras, confiança e explicabilidade.
- `importadores/`: conectores para launchers, pastas, executáveis e ROMs.
- `provedores/`: coleta e consolidação de metadados e artes.
- `cache/`: cache de imagens, metadados e consultas.
- `servicos/`: regras de aplicação e orquestração de casos de uso.
- `interface/`: aplicação CustomTkinter e componentes premium.
- `observabilidade/`: logs, métricas, rastreamento e diagnósticos.
- `seguranca/`: validação de caminhos, sanitização e políticas de execução.
- `plugins/`: infraestrutura para extensão futura.

## Próximas etapas

As próximas entregas seguem o plano de 10 etapas, iniciando por bootstrap técnico, depois persistência, núcleo operacional, IA local, interface premium e suíte de testes/documentação final.
