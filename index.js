var app = angular.module('formDinamico', []);

app.controller('formDinamicoCtrl', function($scope) {
    //Pus esta função só para mostrar como fazer upload
    $scope.salvarAnimal = function(animal) {
            var fd = new FormData();

            if (animal.foto != undefined) {
                fd.append('foto', animal.foto);
            }

            //Faço o append em todos os campos ou uso um angular.foreach isso só no caso de haver imagem no formulário


            $http.post('Caminho do serviço', fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                })
                .success(function(retorno) {

                })

            .error(function() {});
        }
});

app.directive('templateDados', ['$http', '$compile', function($http, $compile) {
    var montaAtributos = function(atributos) {
        var retorno = [];
        angular.forEach(atributos, function(val, atr) {
            let temp = val != "" ? `${atr}="${val}"` : atr;
            retorno.push(temp);
        })
        return retorno;
    }

    var montaHtml = function(varDoScope, campo, parametros) {
        p = parametros;

        p.tipo = p.tipo != undefined ? p.tipo : 'texto';

        //Definindo o modelo, pois com a criacao de blocos no arquivo pode vir undefined nos blocos sem nome
        p.modelo = p.modelo != undefined ? p.raizModelo + '.' + p.modelo : p.raizModelo + '.' + campo;

        //Criando a variável com todos os campos do formulario vazios para
        //juntar com a preenchida ao enviar para os servidor, para não ter que verificar no servidor se a mesma existe
        var tempS = p.modelo.split('.');
        for (i = 1; i <= tempS.length; i++) {
            varDoScope[tempS[i]] = '';
        }

        p.obrigatorio = p.obrigatorio != undefined && p.obrigatorio === "true" ? true : false;
        nomeElemento = p.raizModelo + '.' + campo;
        idElemento = p.raizModelo.split('.').join('_') + '_' + campo;

        var inputs = ['texto', 'data', 'decimal2', 'inteiro', 'telefone', 'email', 'arquivo', 'oculto', 'area-texto'];
        var selects = ['select-uf', 'select-sexo', 'select-animal-tipo', 'select-animal-rebanho', 'select-acasalamento-tipo', 'select-situacao-vaca', 'select-diagnostico'];

        var temInput = inputs.indexOf(p.tipo) >= 0;
        var temSelect = selects.indexOf(p.tipo) >= 0;

        if (temInput || temSelect) {
            var filho = '';

            var classes = temInput && p.tipo != 'oculto' ? ['form-control', 'input-lg'] : [];
            let classesInput = p.classes_input != undefined ? p.classes_input.split(' ') : [];
            classes = p.classes_input != undefined ? [].concat(classes, classesInput) : classes;

            var atributos = p.atributos_input != undefined ? montaAtributos(p.atributos_input) : [];

            var typeElemento = 'text';


            if (p.tipo == 'data') {
                atributos.push('ui-data');
                atributos.push('placeholder="dd/mm/aaaa"');
            } else if (p.tipo == 'telefone') {
                atributos.push('ui-Telefone');
            } else if (p.tipo == 'inteiro') {
                atributos.push('ui-Inteiro');
            } else if (p.tipo == 'decimal2') {
                atributos.push('ui-Decimal2');
            } else if (p.tipo == 'arquivo') {
                //Ponho esse atributo por causa da diretiva de upload de arquivos que uso para o angular.
                atributos.push(`input-file="${p.modelo}"`);
                typeElemento = 'file'
            } else if (p.tipo == 'oculto') {
                classes.push('oculto');
                //typeElemento = 'hidden';
            }

            //Vendo se nos atributos do elemento tem o atributo obrigatorio
            if (p.obrigatorio) atributos.push('required');
            let spanObrigatorio = p.obrigatorio ? `<span class="vermelho font16">*</span>` : '';


            var label = p.texto != undefined && p.tipo != 'oculto' ? `<label for="${campo}">${p.texto} ${spanObrigatorio}</label>` : '';

            if (temInput) {
                if (p.tipo == 'area-texto') {
                    let linhas = p.linhas != undefined ? p.linhas : 3;
                    var input = `<textarea name="${nomeElemento}" ng-model="${p.modelo}" id="${idElemento}" ${atributos.join(' ')} rows="${linhas}" class="${classes.join(' ')}"></textarea>`
                } else {
                    //var typeElemento = s.tipo == 'arquivo' ? 'file' : 'text';
                    var input = `<input type="${typeElemento}" name="${nomeElemento}" ng-model="${p.modelo}" id="${idElemento}" ${atributos.join(' ')} class="${classes.join(' ')}">`;
                }
            } else if (temSelect) {
                var input = `<${p.tipo} name="${nomeElemento}" ng-model="${p.modelo}" id="${idElemento}" ${atributos.join(' ')}></${p.tipo}>`;
            }

            let atributosDiv = p.atributos_div != undefined ? montaAtributos(p.atributos_div) : [];
            let classesDiv = p.classes_div != undefined ? p.classes_div.split(' ') : [];

            //Acrecentando as classes de tamanho do elemento div
            if (p.xs >= 1) classesDiv.push('col-xs-' + p.xs);
            if (p.sm >= 1) classesDiv.push('col-sm-' + p.sm);
            if (p.md >= 1) classesDiv.push('col-md-' + p.md);
            if (p.lg >= 1) classesDiv.push('col-lg-' + p.lg);


            var html = p.tipo != 'oculto' ? `
                    <div class="form-group ${classesDiv.join(' ')}"  id="div_${campo}"  ${atributosDiv.join(' ')}>
                        ${label}
                        ${input}
                    </div>` : `${input}`;
            return html;

        }

    }; //Fim da funcao monta html

    var montaBlocoHtml = function(varDoScope, raizModelo, bloco) {
        let classesDiv = bloco.classes != undefined ? bloco.classes : '';
        let atributosBloco = bloco.atributos_bloco != undefined ? montaAtributos(bloco.atributos_bloco) : [];
        let titulo = bloco.titulo != undefined ? `<h2 class="text-center">${bloco.titulo}</h2>` : '';

        var htmlInterno = '';
        angular.forEach(bloco.campos, function(propriedades, campo) {
            if (campo.substr(0, 5) == 'bloco') {
                propriedades.nome = bloco.nome;

                htmlInterno += montaBlocoHtml(varDoScope, raizModelo, propriedades);
            } else {
                propriedades.raizModelo = bloco.nome != undefined ? raizModelo + '.' + bloco.nome : raizModelo;
                htmlInterno += montaHtml(varDoScope, campo, propriedades);
            }
        });

        var html =
            `<div class="${classesDiv}" ${atributosBloco.join(' ')}>
                ${titulo}
                ${htmlInterno}
            </div>
            `;
        return html;
    }

    var controller = function($scope, $element, $attrs) {
        var url = $attrs.urlTemplate;
        var html = '';
        $http.get(url).success(function(retorno) {
            raizModelo = $attrs.raizModelo;
            //Esta variavel armazenará todas as campos do formulario vazios
            $scope['campo_vazio'] = {};
            angular.forEach(retorno.campos, function(propriedades, campo) {
                if (campo.substr(0, 5) != "bloco") {
                    propriedades.raizModelo = raizModelo;
                    html += montaHtml($scope['campo_vazio'], campo, propriedades);
                } else if (campo.substr(0, 5) == "bloco") {
                    html += montaBlocoHtml($scope['campo_vazio'], raizModelo, propriedades);
                }
            });
            $element.html(html);
            $compile($element.contents())($scope);
        });
    }

    return {
        restrict: 'E',
        controller: controller
    }
}])

app.directive('selectSexo', function() {
    var ddo = {
        restrict: 'E',
        template: `
        <select class="form-control input-lg">
            <option value="">Selecione</option>
            <option value="F">Fêmea</option>
            <option value="M">Macho</option>
        </select>`,
        replace: true
    }
    return ddo;
})
app.directive('selectDiagnostico', function() {
    return {
        restrict: 'E',
        replace: true,
        template: `<select class="form-control input-lg">
            <option value="">Selecione o Diagnóstico</option>
            <option value="Positivo">Positivo</option>
            <option value="Negativo">Negativo</option>
        </select>`
    }
})
app.directive('selectAnimalRebanho', function() {
    var ddo = {
        restrict: 'E',
        template: `
        <select class="form-control input-lg">
            <option value="S">Sim</option>
            <option value="N">Não</option>
        </select>`,
        replace: true
    }
    return ddo;
})

app.directive('selectAnimalTipo', function() {
    var ddo = {
        restrict: 'E',
        template: `
            <select class="form-control input-lg">
                <option value="">Selecione O Tipo de Animal</option>
                <option value="1">Vaca</option>
                <option value="2">Touro</option>
                <option value="3">Bezerro (a)</option>
                <option value="4">Novilho (a)</option>
            </select>`,
        replace: true
    }
    return ddo;
})

app.directive('selectAcasalamentoTipo', function() {
    var ddo = {
        restrict: 'E',
        template: `
                <select class="form-control input-lg">
                    <option value="">Selecione o Tipo de Acasalamento</option>
                    <option value="1">MONTA NATURAL</option>
                    <option value="2">INSEMINAÇÃO ARTIFICIAL</option>
                    <option value="3">I. A. T. F.</option>
                    <option value="4">F. I. V</option>
                </select>`,
        replace: true
    }
    return ddo;
})
app.directive('selectSituacaoVaca', function() {
    return {
        restrict: 'E',
        replace: true,
        template: `
                <select class="form-control input-lg">
                    <option value="">Selecione</option>
                    <option value="seca">Seca</option>
                    <option value="coberta">Coberta</option>
                    <option value="emLactacaoSemCobertura">Em Lactação Sem Cobertura</option>
                    <option value="emLactacaoCoberta">Em Lactação e Coberta</option>
                </select>`
    }
})

app.directive('inputFile', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.inputFile);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    }
}])

app.directive('validaFormulario', function() {
        return {
            require: '^form',
            priority: -1,
            link: function(scope, element, attr, form) {
                element.bind('submit', function() {
                    
                    var nomeForm = form.$name;

                    var _montaMensagem = function(tipo, campo) {
                        switch (tipo) {
                            case 'igual':
                                return 'Valor Diferente de: ' + campo;
                                break;
                            case 'invalido':
                                return 'Valor Invalido!'
                                break;
                            default:
                                return ' !!!';
                        }
                    }

                    angular.forEach(form, function(value, key) {
                        //Varrendo os itens de do formul?rio e vendo se sao objeto se tem ngModel se e obrigatorio e se nao e valido
                        if (typeof value === 'object' && value.hasOwnProperty('$modelValue') && value.$error.required && !value.$valid) {
                            var elemento = $("[name='" + value.$name + "']");
                            var nomeElemento = elemento[0].name;
                            var elementoPai = elemento.parent('div');
                            var elementoInserir = $(elemento).siblings('label');
                            var mensagem = _montaMensagem();

                            elemento.bind('keyup change click', function() {
                                var valorElemento = form[nomeElemento].$viewValue;
                                var valido = form[nomeElemento].$valid;

                                if (elemento.attr('igual') != undefined) {
                                    var valorComparar = form[elemento.attr('igual').split('-')[0]].$viewValue;
                                    if (valorElemento != valorComparar) {
                                        valido = false;
                                        mensagem = _montaMensagem('igual', elemento.attr('igual').split('-')[1])
                                    }
                                } else if (valorElemento != undefined && valorElemento != '') {
                                    mensagem = _montaMensagem('invalido');
                                } else {
                                    mensagem = _montaMensagem();
                                }

                                elementoPai.toggleClass('erro', !valido);

                                if (valido) {
                                    $(elementoPai).find('span').remove();

                                    mensagem = '';

                                } else {
                                    $(elementoPai).find('span').html(mensagem);
                                }
                                var template = '<span>' + mensagem + '</span>';

                                var elementoInserir = $(elemento).siblings('label');
                                if ($(elementoInserir).children('span').length <= 0) {
                                    $(template).appendTo(elementoInserir);
                                }
                            });

                            if ($(elementoInserir).find('span').length <= 0) {
                                var template = '<span>' + mensagem + '</span>';
                                $(template).appendTo(elementoInserir);
                            }
                            elementoPai.addClass('erro');
                        }
                    });
                });
            }
        }
    })
