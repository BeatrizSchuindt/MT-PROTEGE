import React, { useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";
import Menu from "../components/menu-nav";

function Ajuda() {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const openModal1 = () => {
    setShowModal1(true);
  };

  const closeModal1 = () => {
    setShowModal1(false);
  };

  const openModal2 = () => {
    setShowModal2(true);
  };

  const closeModal2 = () => {
    setShowModal2(false);
  };

  const openModal3 = () => {
    setShowModal3(true);
  };

  const closeModal3 = () => {
    setShowModal3(false);
  };

  const openModal4 = () => {
    setShowModal4(true);
  };

  const closeModal4 = () => {
    setShowModal4(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/*MENU DE NAVEGAÇÃO */}
        <Menu />

        {/* CONTEÚDO DA PÁGINA */}
        <main className="col" style={{ height: "100vh", overflowY: "auto" }}>
          <h1
            style={{
              marginTop: "30px", // Espaço a partir do topo
              marginLeft: "30px", // Espaço a partir da esquerda
              marginBottom: "50px",
              fontSize: "320%",
            }}
          >
            AJUDA / SUPORTE DO SISTEMA
          </h1>
          <div style={{ height: "100%" }}>
            <Row className="align-items-center mb-5">
              <Col className="d-flex align-items-center justify-content-center">
                <div
                  className="question-box"
                  style={{
                    backgroundColor: "#FFEA7F",
                    width: "80%",
                    borderRadius: "15px",
                    padding: "15px",
                  }}
                >
                  <h3>PAINEL PRINCIPAL</h3>
                  <p>
                    Para analisar os dados do sistema de uma forma mais
                    intuitiva
                  </p>
                  <Button variant="primary" onClick={openModal1}>
                    Abrir Detalhes
                  </Button>
                </div>
              </Col>

              <Col className="d-flex align-items-center justify-content-center">
                <div
                  className="question-box"
                  style={{
                    backgroundColor: "#FFEA7F",
                    width: "80%",
                    borderRadius: "15px",
                    padding: "15px",
                  }}
                >
                  <h3>MENU DE NAVEGAÇÃO RÁPIDA</h3>
                  <p>
                    O menu que está no lado esquerdo da tela, orienta de forma
                    simples a navegação
                  </p>
                  <Button variant="primary" onClick={openModal2}>
                    Abrir Detalhes
                  </Button>
                </div>
              </Col>
            </Row>

            <Row className="align-items-center mb-5">
              <Col className="d-flex align-items-center justify-content-center">
                <div
                  className="question-box"
                  style={{
                    backgroundColor: "#FFEA7F",
                    width: "80%",
                    borderRadius: "15px",
                    padding: "15px",
                  }}
                >
                  <h3>TELA DE POLICIAIS CADASTRADOS</h3>
                  <p>
                    Analise, com filtros, os policiais cadastrados no sistema
                  </p>
                  <Button variant="primary" onClick={openModal3}>
                    Abrir Detalhes
                  </Button>
                </div>
              </Col>

              <Col className="d-flex align-items-center justify-content-center">
                <div
                  className="question-box"
                  style={{
                    backgroundColor: "#FFEA7F",
                    width: "80%",
                    borderRadius: "15px",
                    padding: "15px",
                  }}
                >
                  <h3>TELA DE OCORRÊNCIAS</h3>
                  <p>
                    Saiba agora como registrar, analisar, atualizar e excluir
                    ocorrências
                  </p>
                  <Button variant="primary" onClick={openModal4}>
                    Abrir Detalhes
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </main>

        <Modal show={showModal1} onHide={closeModal1}>
          <Modal.Header closeButton>
            <Modal.Title>PAINEL PRINCIPAL</Modal.Title>
          </Modal.Header>
          <Modal.Body><h2>Ajuda para o Painel Principal</h2>
            <p>O Painel Principal fornece uma visão geral das informações mais importantes do sistema. Aqui está um guia detalhado de suas funcionalidades:</p>

            <ol>
                <li><strong>Menu de Navegação</strong>: No lado esquerdo da tela, você encontrará um menu de navegação que permite acessar outras partes do sistema.</li>
                <li><strong>Título</strong>: No topo da tela, o título "PAINEL PRINCIPAL" é exibido.</li>
                <li><strong>Indicadores</strong>: Há três indicadores principais exibidos em cores diferentes:
                    <ul>
                        <li><span style={{color: 'red'}}>Policiais Cadastrados</span>: Mostra o número total de policiais cadastrados no sistema.</li>
                        <li><span style={{color: 'green'}}>Ocorrências Cadastradas</span>: Exibe o número total de ocorrências registradas.</li>
                        <li><span style={{color: '#FFD500'}}>Ocorrências Resolvidas</span>: Indica o número de ocorrências que foram resolvidas.</li>
                    </ul>
                </li>
                <li><strong>Gráficos</strong>: Abaixo dos indicadores, há dois gráficos que fornecem uma representação visual das estatísticas:
                    <ul>
                        <li><strong>Gráfico de Pizza</strong>: Provavelmente mostra a distribuição de algum tipo de dado (por exemplo, tipos de ocorrências).</li>
                        <li><strong>Gráfico de Colunas</strong>: Pode representar a quantidade de ocorrências ao longo do tempo ou outra métrica relevante.</li>
                    </ul>
                </li>
                <li><strong>Mensagens de Erro</strong>: Se houver algum problema ao carregar os dados, uma mensagem de erro será exibida no centro da tela.</li>
                <li><strong>Modal de Erro Interno</strong>: Se o servidor estiver indisponível, um modal será exibido informando sobre o erro. Este modal contém um ícone representando o erro, uma mensagem explicativa e um botão "Entendido" para fechar o modal.</li>
            </ol>

            <h3>Dicas e Recomendações:</h3>
            <ul>
                <li>Se você encontrar algum erro ou problema, aguarde um momento e tente novamente. Se o problema persistir, entre em contato com o suporte técnico.</li>
                <li>Utilize os gráficos para ter uma visão rápida e visual das estatísticas mais importantes.</li>
                <li>Os indicadores são atualizados em tempo real, garantindo que você sempre tenha as informações mais recentes.</li>
            </ul>

            <p>Espero que esta ajuda seja útil para você entender e navegar pelo Painel Principal! Se tiver mais perguntas, sinta-se à vontade para perguntar.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={closeModal1}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModal2} onHide={closeModal2}>
          <Modal.Header closeButton>
            <Modal.Title>FUNCIONALIDADES DO MENU DE NAVEGAÇÃO</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ fontWeight: "bold", marginBottom: "0" }}>
              PAINEL PRINCIPAL:
            </p>
            <p>
              Clique no primeiro item do menu de navegação, que geralmente é
              representado por um ícone ou texto como "Dashboard" ou "Painel".
              Esta seção é o coração do sistema, exibindo dados analíticos
              importantes, gráficos e informações essenciais para a tomada de
              decisões
            </p>
            <p style={{ fontWeight: "bold", marginBottom: "0" }}>POLICIAL:</p>
            <p>
              Para consultar informações sobre policiais cadastrados na
              plataforma, clique no segundo item do menu, que pode ser rotulado
              como "Policial" ou "Cadastro de Policiais". Aqui, você encontrará
              detalhes sobre os policiais e suas atribuições.
            </p>
            <p style={{ fontWeight: "bold", marginBottom: "0" }}>
              EDITAR PERFIL:
            </p>
            <p>
              Caso você seja um policial e deseje editar seu perfil ou desativar
              sua conta, basta clicar no terceiro item do menu, provavelmente
              indicado como "Editar Perfil" ou algo similar. Nesta seção, você
              poderá fazer ajustes em suas informações pessoais e de conta.
            </p>
            <p style={{ fontWeight: "bold", marginBottom: "0" }}>
              OCORRÊNCIAS:
            </p>
            <p>
              Para registrar, atualizar, consultar ou deletar ocorrências,
              navegue até o quarto item do menu, muitas vezes denominado
              "Ocorrências" ou "Registros de Ocorrências". Aqui, você terá
              acesso a todas as funcionalidades relacionadas a incidentes e
              eventos registrados no sistema.
            </p>
            <p style={{ fontWeight: "bold", marginBottom: "0" }}>AJUDA:</p>
            <p>
              Se precisar de orientações sobre as principais funcionalidades do
              sistema, vá até o quinto item do menu, que costuma ser
              identificado como "Ajuda" ou "Suporte". Aqui, você encontrará
              informações detalhadas e guias que explicam como usar o sistema de
              forma eficaz.
            </p>
            <p style={{ fontWeight: "bold", marginBottom: "0" }}>LOGOUT:</p>
            <p>
              Por fim, para sair do sistema de forma segura, localize o botão de
              logout. Isso normalmente está localizado na parte superior direita
              ou no final do menu. Clique nele para encerrar sua sessão e
              garantir a privacidade de sua conta.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={closeModal2}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModal3} onHide={closeModal3}>
          <Modal.Header closeButton>
            <Modal.Title>TELA DE POLICIAIS CADASTRADOS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5 style={{marginBottom: '15px'}}>Guia de Ajuda - Policiais Cadastrados</h5>
            <p style={{fontWeight: 'bold', marginBottom: '0'}}>1. Objetivo da Tela:</p>
            <p>A tela "Policiais Cadastrados" foi projetada para permitir que os usuários busquem e visualizem informações sobre os policiais que estão registrados na plataforma.</p>
            <p style={{fontWeight: 'bold', marginBottom: '0'}}>2. Como Usar:</p>
            <ol type="I">
              <li>Buscar Policiais:</li>
                  <ul>
                    <li>Matrícula: Insira o número de matrícula do policial. A matrícula deve ter exatamente 8 caracteres numéricos.</li>
                    <li>Nome Completo: Digite o nome completo ou parte do nome do policial que deseja buscar.</li>
                    <li>Jurisdição: Selecione a jurisdição do policial, que pode ser "Civil" ou "Militar".</li>
                    <li>Cargo/Graduação: Insira o cargo ou a graduação do policial. Use apenas letras e espaços.</li>
                    <li>Unidade Policial: Digite o nome da unidade policial à qual o policial pertence.</li>
                  </ul>
                <p style={{marginBottom:'0'}}>Após preencher os campos desejados, clique no botão "BUSCAR" para obter os resultados.</p>
                <p>Se desejar limpar os campos de busca, clique no botão "LIMPAR FILTRO".</p>
              <li>Visualizar Resultados:</li>
                <ul>
                  <li>Os policiais encontrados serão exibidos em uma tabela abaixo do formulário de busca.</li>
                  <li>A tabela mostrará as seguintes informações: Matrícula, Nome, Cargo, Jurisdição e Unidade Policial.</li>
                  <li>Se nenhum policial for encontrado com os critérios de busca fornecidos, uma mensagem "NENHUM POLICIAL ENCONTRADO" será exibida.</li>
                </ul>
            </ol>
            <p style={{fontWeight: 'bold', marginBottom: '0'}}>3. Erros e Soluções:</p>
            <p>Se ocorrer um erro interno, uma mensagem será exibida no centro da tela. Além disso, um modal com a mensagem "ERRO INTERNO!" pode aparecer, indicando que o servidor está indisponível. Nesse caso, clique no botão "Entendido" para fechar o modal e aguarde alguns momentos antes de tentar novamente.</p>
            <p style={{fontWeight: 'bold', marginBottom: '0'}}>4. Dicas:</p>
            <ul>
              <li style={{marginBottom: '10px'}}>Certifique-se de inserir as informações corretamente nos campos de busca para obter resultados precisos.</li>
              <li>Se você não tiver certeza sobre algumas informações, pode deixar alguns campos em branco para obter uma busca mais ampla.</li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={closeModal3}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModal4} onHide={closeModal4}>
          <Modal.Header closeButton>
            <Modal.Title>TELA DE OCORRÊNCIA</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <h4>Ajuda para a tela de CRUD de Ocorrências</h4>
            <p>Esta tela é responsável por gerenciar ocorrências. Aqui está um guia passo a passo de suas funcionalidades:</p>

            <ol>
                <li><strong>Menu de Navegação</strong>: No lado esquerdo da tela, há um menu de navegação que permite ao usuário acessar outras partes do sistema.</li>
                <li><strong>Título</strong>: No topo da tela, o título "OCORRÊNCIAS" é exibido.</li>
                <li><strong>Botão Registrar Nova Ocorrência</strong>: Este botão redireciona o usuário para uma tela onde ele pode registrar uma nova ocorrência.</li>
                <li><strong>Filtro de Ocorrências</strong>: Abaixo do título, há uma seção onde o usuário pode filtrar ocorrências por diferentes critérios:
                    <ul>
                        <li>ID da ocorrência</li>
                        <li>Número de matrícula do policial</li>
                        <li>Status da ocorrência</li>
                        <li>Tipo de ocorrência</li>
                        <li>Data da ocorrência</li>
                    </ul>
                    Após preencher os campos desejados, o usuário pode clicar no botão "BUSCAR" para filtrar as ocorrências ou no botão "LIMPAR FILTRO" para limpar os campos de filtro.
                </li>
                <li><strong>Tabela de Ocorrências</strong>: Abaixo do filtro, há uma tabela que lista todas as ocorrências. Para cada ocorrência, o usuário pode:
                    <ul>
                        <li>Ver detalhes clicando no botão "CLIQUE".</li>
                        <li>Editar a ocorrência clicando no ícone de edição.</li>
                        <li>Deletar a ocorrência clicando no ícone de lixeira.</li>
                    </ul>
                </li>
                <li><strong>Modal de Detalhes</strong>: Ao clicar no botão "CLIQUE" em uma ocorrência, um modal é exibido mostrando todos os detalhes dessa ocorrência.</li>
                <li><strong>Modal de Deletar</strong>: Ao clicar no ícone de lixeira de uma ocorrência, um modal de confirmação é exibido. O usuário pode confirmar ou cancelar a exclusão da ocorrência.</li>
                <li><strong>Toasts</strong>: São mensagens que aparecem para informar o usuário sobre ações realizadas, como atualizar ou deletar uma ocorrência com sucesso.</li>
                <li><strong>Modal de Erro Interno</strong>: Se houver algum erro interno (por exemplo, o servidor cair), um modal com uma mensagem de erro será exibido.</li>
            </ol>

            <h3>Dicas e Recomendações:</h3>
            <ul>
                <li>Sempre confirme antes de deletar uma ocorrência, pois essa ação é irreversível.</li>
                <li>Use o filtro para encontrar ocorrências mais rapidamente.</li>
                <li>Se você encontrar algum erro ou problema, aguarde um momento e tente novamente. Se o problema persistir, entre em contato com o suporte técnico.</li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={closeModal4}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Ajuda;
