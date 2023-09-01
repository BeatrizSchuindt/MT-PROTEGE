import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Link} from 'react-router-dom';

function Login() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div>
            <div className="card-header">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="Matrícula" className="form-label">Matrícula</label>
                  <input type="Matrícula" className="form-control" id="Matrícula" placeholder='Insira o número da sua matrícula'/>
                </div>
                <div className="mb-3">
                  <label htmlFor="senha" className="form-label">Senha</label>
                  <input type="senha" className="form-control" id="senha" placeholder='Insira sua senha'/>
                </div>
                <div class="form-group form-check">
                  <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                  <label class="form-check-label" for="exampleCheck1">Clique em mim</label>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
