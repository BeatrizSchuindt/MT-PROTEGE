import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cadastro() {
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
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputEmail4">Email</label>
                                        <input type="email" class="form-control" id="inputEmail4" placeholder="Email"/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="inputPassword4">Senha</label>
                                        <input type="password" class="form-control" id="inputPassword4" placeholder="Senha"/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="inputAddress">Endereço</label>
                                    <input type="text" class="form-control" id="inputAddress" placeholder="Rua dos Bobos, nº 0"/>
                                </div>
                                <div class="form-group">
                                    <label for="inputAddress2">Endereço 2</label>
                                    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartamento, hotel, casa, etc."/>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputCity">Cidade</label>
                                        <input type="text" class="form-control" id="inputCity"/>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="inputEstado">Estado</label>
                                        <select id="inputEstado" class="form-control">
                                            <option selected>Escolher...</option>
                                            <option>...</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="inputCEP">CEP</label>
                                        <input type="text" class="form-control" id="inputCEP"/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="gridCheck"/>
                                            <label class="form-check-label" for="gridCheck">
                                                Clique em mim
                                            </label>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary">Entrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;