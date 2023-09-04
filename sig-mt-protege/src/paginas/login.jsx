import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../imagens/logo-definitiva-mt-protege.png';
import ImgPoliciaEsquerda from '../imagens/policia-esquerda.jpg';
import ImgPoliciaDireita from '../imagens/policia-direita.jpg';
import './styles.css';

/*
const Login = () => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    // Aqui você pode adicionar a lógica de autenticação
    // Por exemplo, enviar as credenciais para um servidor e verificar se são válidas
    // Por enquanto, apenas exibiremos as credenciais no console
    console.log(`Matrícula: ${matricula}, Senha: ${senha}`);
  };

  no botão onClick={handleLogin}
*/

function Login() {
  return (
    <div style={{ height: '100vh', backgroundColor: '#00296B', overflow: 'hidden' }}>
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-md-3 d-none d-md-block p-0">
            <img
              src={ImgPoliciaEsquerda}
              alt="Descrição da imagem à esquerda"
              className="w-100 h-100 img-fluid"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="col-12 col-md-6 p-0 d-flex flex-column align-items-center justify-content-start">
            {/* Logo com altura e largura ajustadas */}
            <img
              src={Logo}
              alt="Logo"
              className="w-50 mt-4" // Largura de 50% e espaço superior de 1rem (4 unidades padrão)
            />

            {/* Frase de boas-vindas responsiva */}
            <p className="text-white text-center mt-3" style={{ fontSize: '20px', width: '80%' }}>
              Seja bem-vindo ao sistema de gestão de ocorrências criminais do Estado de Mato Grosso!
            </p>

            {/* Quadrado branco para o menu de login abaixo da logo e da frase */}
            <div className="login-box p-3 mt-3 bg-white d-flex flex-column justify-content-center" style={{ width: '60%', height: '45%' }}> {/* Adicionamos a classe bg-white para o fundo branco */}
              <h2 className="text-center">Login</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="matricula" className="form-label">Matrícula</label>
                  <input type="text" className="form-control" id="matricula" placeholder="Digite sua matrícula" />
                </div>
                <div className="mb-3">
                  <label htmlFor="senha" className="form-label">Senha</label>
                  <input type="password" className="form-control" id="senha" placeholder="Digite sua senha" />
                </div>
                <div className="d-flex justify-content-center"> 
                  <button type="submit" className="btn btn-primary" style={{backgroundColor: '#19A800'}}>ENTRAR</button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-3 d-none d-md-block p-0">
            <img
              src={ImgPoliciaDireita}
              alt="Descrição da imagem à direita"
              className="w-100 h-100 img-fluid"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
