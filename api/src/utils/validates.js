class Validates {
    //Validação de DATA
    static validDate(date) {
        const dateFormated = new Date(date.split('/').reverse().join('-'))
        return dateFormated.toString() !== 'Invalid Date' && dateFormated <= new Date();
    }

    //Validação de CPF (desde dos 11 dígitos, aos dígitos verificadores)
    static validCPF(cpf) {
        // Remove todos os caracteres não numéricos do CPF
        cpf = cpf.replace(/[^\d]/g, '');
    
        // Verifica se o CPF possui 11 dígitos
        if (cpf.length !== 11) {
            return false;
        }
    
        // Calcula o primeiro dígito verificador
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let remainder = 11 - (sum % 11);
        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }
        if (remainder !== parseInt(cpf.charAt(9))) {
            return false;
        }
    
        // Calcula o segundo dígito verificador
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        remainder = 11 - (sum % 11);
        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }
        if (remainder !== parseInt(cpf.charAt(10))) {
            return false;
        }
    
        return true;
    }
    
    //VALIDAÇÃO DE EMAIL
    static validEmail(email) {
        const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.+[A-Z]{2,}$/i;
        return regexEmail.test(email);
    }

    //VALIDAÇÃO DE HORA
    static validHour(hour) {
        const hourFormated = hour.split(':');
        return hourFormated.length === 3 &&
            hourFormated[0] <= 24 &&
            hourFormated[0] >= 0 &&
            hourFormated[1] < 60 &&
            hourFormated[1] >= 0 &&
            hourFormated[2] < 60 &&
            hourFormated[2] >= 0;
    }

    //VALIDAÇÃO DE CELULAR
    static validarCelular(numero) {
        // Expressão regular para validar o formato do celular
        const regexCelular = /^\([1-9]{2}\) 9[0-9]{4}-[0-9]{4}$/;

        // Teste se o número corresponde à expressão regular
        return regexCelular.test(numero);
    }

    //VALIDAÇÃO DE MATRÍCULA POLICIAL
    static validarMatriculaPolicial(matricula) {
        // Verifica se a matrícula possui exatamente 8 dígitos numéricos
        const regexMatricula = /^[0-9]{8}$/;

        return regexMatricula.test(matricula);
    }
}

module.exports = { Validates };