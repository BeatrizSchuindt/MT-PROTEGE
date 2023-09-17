import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { isAuthenticated } from './utils/is-authenticated';

import Login from './pages/login';
import Cadastro from './pages/cadastro';
import PainelPrincipal from './pages/painel-principal';
import Policiais from './pages/crud-policiais';
import Ocorrencias from "./pages/ocorrencias/crud-ocorrencias";
import RegistrarOcorrencia from "./pages/ocorrencias/create-ocorrencia";
import Ajuda from './pages/ajuda';
import NaoAutorizado from "./pages/nao-autorizado";
import NaoEncontrado from "./pages/nao-encontrada";

/**
 * Cria rotas autenticadas
 */
export function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/nao-autorizado" replace />
    }
    return children;
}

export function Navigations() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/nao-autorizado" element={<NaoAutorizado />} />
                <Route path="*" element={<NaoEncontrado />} />
                <Route
                    path="/painel-principal"
                    element={(
                        <PrivateRoute>
                            <PainelPrincipal />
                        </PrivateRoute>
                    )}
                />
                <Route
                    path="/policiais"
                    element={(
                        <PrivateRoute>
                            <Policiais />
                        </PrivateRoute>
                    )}
                />
                <Route
                    path="/ocorrencias"
                    element={(
                        <PrivateRoute>
                            <Ocorrencias />
                        </PrivateRoute>
                    )}
                />
                <Route
                    path="/registrar-ocorrencia"
                    element={(
                        <PrivateRoute>
                            <RegistrarOcorrencia />
                        </PrivateRoute>
                    )}
                />
                <Route
                    path="/ajuda"
                    element={(
                        <PrivateRoute>
                            <Ajuda />
                        </PrivateRoute>
                    )}
                />
            </Routes>
        </BrowserRouter>
    )
}
