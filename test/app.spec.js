
/**
 * Carrega as bibliotecas que vamos utilizar
 * O mocha nao eh carregado aqui, pois ele que executa este arquivo
 */
let request = require("request");
var expect = require('expect.js');
let urlbase = "http://localhost:4000/";
let idUsuario;
let idSigno;
let IdAscendente;
let token;

describe("Teste API /usuarios POST",  () => {
    it("Testando a criação do usuario", (done) => {

        request.post(
            {
                url: `${urlbase}usuarios`,
                json: true,
                body: { usuario: 'Rafael 99', senha: '1234' }
            },
            (error, response, body) => {
                if (error) throw new Error(error);
                //Salvando o id para deletar o usuario de teste
                idUsuario = body.id;
                expect(response.statusCode).equal(200);
                expect(body).to.be.a('object');

                done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
            }
        );
    });
}); 

describe("Teste API /usuarios POST", () => {
    it("Testando a criação do usuario repetido, erro esperado", (done) => {

        request.post(
            {
                url: `${urlbase}usuarios`,
                json: true,
                body: { usuario: 'Rafael 99', senha: '1234' }
            },
        (error, response, body) => {
                if (error) throw new Error(error);
                expect(response.statusCode).equal(400);
                expect(body.message).equal('Este usuario já existe');

                done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
            }
        );
    });
}); 



describe("Teste API /login POST", () => {
    it("Testando o login na aplicação", (done) => {
        
        request.post(
            {
                url: `${urlbase}login`,
                json:true,
                body: { usuario: 'Rafael 99', senha: '1234' }
            },
        (error, response, body) => {
            if (error) throw new Error(error);
                expect(response.statusCode).equal(200);
                expect(body.token).to.be.a('string');
                expect(body.senha).to.not.equal('1234');
               token = 'Bearer ' + body.token;
                done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
            }
        );
    });
});

describe('Testando API /signos POST', () => {
    it('Testando o insert de signo', (done) => {
        var options = {
            url: `${urlbase}signos`,
            headers:
            {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            body:
            {
                nome: 'Peixes',
                data_inicio: '01/02',
                data_fim: '28/02',
                usuarioid: idUsuario
            },
            json: true
        };
        request.post(options, (error, response, body) => {
            if (error) throw new Error(error);
            expect(response.statusCode).equal(200);
            expect(body).to.be.a('object');
            expect(body.id).to.not.equal(undefined);
            idSigno = body.id;

            done();

        });
    })
})


describe('Testando API /signos POST', () => {
    it('Testando o insert de signo repetido, erro esperado', (done) => {
        var options = {
            url: `${urlbase}signos`,
            headers:
            {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            body:
            {
                nome: 'Peixes',
                data_inicio: '01/02',
                data_fim: '28/02',
                usuarioid: idUsuario
            },
            json: true
        };
        request.post(options, (error, response, body) => {
            if (error) throw new Error(error);
            expect(response.statusCode).equal(400);
            expect(body.message).equal('Este signo já existe');


            done();

        });
    })
})

describe('Testando API /signos/:id GET', () => {
    it('Testando o get de signos por usuarioId', (done) => {
        var options = {
            url: `${urlbase}signos/${idUsuario}`,
            headers:
            {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        };
        request.get(options, (error, response, body) => {
            if (error) throw new Error(error);
            expect(response.statusCode).equal(200);
            done();

        });
    })
})


describe('Testando API /ascendentes POST', () => {
    it('Testando o post de ascendentes por signoid', (done) => {
        var options = {
            method: 'POST',
            url: `${urlbase}ascendentes`,
            headers:
            {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            body:
            {
                nome: 'Touro',
                hora_inicio: '16:00',
                hora_fim: '19:00',
                signoid: idSigno
            },
            json: true
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            IdAscendente = body.id;
            expect(body.id).to.not.equal(undefined);
            expect(response.statusCode).equal(200);
            done();
        });

    })
});

describe('Testando API /ascendentes POST', () => {
    it('Testando o post de ascendentes por signoid repetido, erro esperado', (done) => {
        var options = {
            method: 'POST',
            url: `${urlbase}ascendentes`,
            headers:
            {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            body:
            {
                nome: 'Touro',
                hora_inicio: '16:00',
                hora_fim: '19:00',
                signoid: idSigno
            },
            json: true
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            expect(response.statusCode).equal(400);
            expect(body.message).equal('Este ascendente já existe');
            done();
        });

    })
});

describe('Testando API /ascendentes/:id GET', () => {
    it('Testando o get de ascendentes por signoId', (done) => {
        var options = {
            method: 'GET',
            url: `${urlbase}ascendentes/${idSigno}`,
            headers:
            {
                Authorization: token
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            expect(response.statusCode).equal(200);
            done();
        });

    })
})

describe('Testando API /ascedentes/:id DELETE', () => {
    it('Testando o delete de ascendentes', (done) => {
        var request = require("request");

        var options = {
            method: 'DELETE',
            Accept: '*/*',
            url: `${urlbase}ascendentes/${IdAscendente}`,
            headers:
            {
                Authorization: token
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            expect(response.statusCode).equal(200);
            done();
        });

    })
})


describe('Testando API /signos/:id DELETE', () => {
    it('Testando o delete de signos por signoId', (done) => {
        var options = {
            url: `${urlbase}signos/${idSigno}`,
            headers:
            {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        };
        request.delete(options, (error, response, body) => {
            if (error) throw new Error(error);
            expect(response.statusCode).equal(200);
            done();

        });
    })
})


describe("Teste API /usuarios/:id DELETE", () => {
    // a funcao it eh o que vamos testar realmente, se o google retorna 200
    it("Testando o delete de usuario na aplicação", (done) => {
        request.delete(
            {
                url: `${urlbase}usuarios/${idUsuario}`,
                json: true
            },
        (error, response, body) => {
                if (error) throw new Error(error);
                expect(response.statusCode).equal(200);
                expect(body).to.be.a('object');

                done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
            }
        );
    });
});