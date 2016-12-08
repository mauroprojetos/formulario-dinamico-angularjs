{
    "lista": [
        "nome",
        "proprietario",
        "telefone"
    ],
    "acoes": [
        "detalhes",
        "alterar",
        "excluir"
    ],
    "campos": {
        "chave_animal": {
            "tipo": "oculto",
            "padrao": "0"
        },
        "foto": {
            "tipo": "arquivo",
            "texto": "Foto do Animal",
            "sm": "3"
        },
        "registro": {
            "sm": "3",
            "texto": "Registro",
            "obrigatorio": "true",
            "atributos_input": {
                "valor-existe": "",
                "tabela": "animais"
            }
        },
        "nome": {
            "obrigatorio": "true",
            "sm": "6",
            "texto": "Nome do Animal",
            "atributos_input": {
                "valor-existe": "",
                "tabela": "animais"
            }
        },
        "pelagem": {
            "texto": "Pelagem",
            "sm": "4",
            "atributos_input": {
                "nome_lista": "pelagem",
                "comentario": "lembrar que quando usar lista tem que por a raiz do modelo e depois posso melhorar fazendo o id_chave automaticamente",
                "id_chave": "animal_chave_pelagem"
            },
            "classes_input": "lista"
        },
        "chave_pelagem": {
            "tipo": "oculto"
        },
        "peso": {
            "tipo": "inteiro",
            "texto": "Peso (Kg)",
            "sm": "2"
        },
        "animal_rebanho": {
            "tipo": "select-animal-rebanho",
            "texto": "Animal do Rebanho",
            "sm": "3"
        },
        "bloco_0": {
            "classes": "row",
            "campos": {
                "bloco_0_1": {
                    "classes": "col-xs-12",
                    "campos": {
                        "nascimento": {
                            "tipo": "data",
                            "texto": "Data de Nascimento",
                            "sm": "4"
                        },
                        "chave_animal_tipo": {
                            "tipo": "select-animal-tipo",
                            "sm": "4",
                            "texto": "Tipo de Animal",
                            "obrigatorio": "true"
                        },
                        "sexo": {
                            "tipo": "select-sexo",
                            "texto": "Sexo",
                            "sm": "4",
                            "atributos_div": {
                                "ng-if": "animal.chave_animal_tipo > 2 || !animal.chave_animal_tipo"
                            },
                            "obrigatorio": "true"
                        },
                        "situacao_vaca": {
                            "tipo": "select-situacao-vaca",
                            "texto": "Situação da Vaca",
                            "sm": "4",
                            "atributos_div": {
                                "ng-if": "animal.chave_animal_tipo == 1 && animal.chave_animal == undefined"
                            },
                            "obrigatorio": "true"
                        }
                    }
                }
            }
        },
        "bloco_1": {
            "Descricao": "Bloco que contera os dados da cobertura atual ou da cobertura com o bezerro",
            "atributos_bloco": {
                "ng-if": "animal.situacao_vaca != 'seca' && animal.situacao_vaca != undefined"
            },
            "nome": "ciclo1",
            "titulo": "Informações da Cobertura",
            "classes": "col-xs-12 div4",
            "campos": {
                "chave_touro": {
                    "tipo": "oculto"
                },
                "registro_touro": {
                    "texto": "Reg. Touro",
                    "sm": "2",
                    "obrigatorio": "true"
                },
                "touro": {
                    "texto": "Touro",
                    "sm": "4",
                    "obrigatorio": "true"
                },
                "data_cobricao": {
                    "tipo": "data",
                    "texto": "Cobrição",
                    "classes_input": "data",
                    "sm": "2",
                    "obrigatorio": "true"
                },
                "chave_acasalamento_tipo": {
                    "tipo": "select-acasalamento-tipo",
                    "texto": "Tipo de Acasalamento",
                    "sm": "4"
                },
                "data_diagnostico": {
                    "tipo": "data",
                    "texto": "Data do Diagnóstico",
                    "sm": "3",
                    "classes_input": "data"
                },
                "diagnostico": {
                    "tipo": "select-diagnostico",
                    "texto": "Diagnóstico",
                    "sm": "3"
                },
                "bloco_1_1": {
                    "atributos_bloco": {
                        "ng-if": "animal.situacao_vaca == 'emLactacaoSemCobertura' || animal.situacao_vaca == 'emLactacaoCoberta'"
                    },
                    "campos": {
                        "data_cria": {
                            "tipo": "data",
                            "texto": "Data da Cria",
                            "classes_input": "data",
                            "sm": "3",
                            "obrigatorio": "true"
                        },
                        "registro_bezerro": {
                            "texto": "Registro do Bezerro",
                            "sm": "3",
                            "obrigatorio": "true"
                        },
                        "nome_bezerro": {
                            "texto": "Nome do Bezerro",
                            "sm": "4",
                            "obrigatorio": "true"
                        },
                        "peso_bezerro": {
                            "tipo": "inteiro",
                            "texto": "Peso do Bezerro",
                            "sm": "2"
                        },
                        "sexo_bezerro": {
                            "tipo": "select-sexo",
                            "texto": "Sexo do Bezerro",
                            "sm": "3",
                            "obrigatorio": "true"
                        }
                    }
                }
            }
        },
        "bloco_2": {
            "nome": "ciclo2",
            "atributos_bloco": {
                "ng-if": "animal.situacao_vaca == 'emLactacaoCoberta'"
            },
            "titulo": "Informações da Cobertura - Bezerro na Barriga (Nascituro)",
            "classes": "col-xs-12 div6",
            "campos": {
                "chave_touro": {
                    "tipo": "oculto"
                },
                "registro_touro": {
                    "texto": "Reg. Touro",
                    "sm": "2",
                    "obrigatorio": "true"
                },
                "touro": {
                    "texto": "Touro",
                    "sm": "4",
                    "obrigatorio": "true"
                },
                "data_cobricao": {
                    "tipo": "data",
                    "texto": "Cobrição",
                    "sm": "2",
                    "classes_input": "data",
                    "obrigatorio": "true"
                },
                "chave_acasalamento_tipo": {
                    "tipo": "select-acasalamento-tipo",
                    "texto": "Tipo de Acasalamento",
                    "sm": "4"
                },
                "data_diagnostico": {
                    "tipo": "data",
                    "texto": "Data do Diagnóstico",
                    "sm": "3",
                    "classes_input": "data"
                },
                "diagnostico": {
                    "tipo": "select-diagnostico",
                    "texto": "Diagnóstico",
                    "sm": "3"
                }
            }
        },
        "bloco_3": {
            "titulo": "Informações da Mãe",
            "classes": "col-xs-12",
            "campos": {
                "bloco_3_1": {
                    "classes": "row",
                    "campos": {
                        "registro_mae": {
                            "texto": "Registro da Mãe",
                            "sm": "3",
                            "classes_div": "col-sm-offset-2"
                        },
                        "mae": {
                            "texto": "Nome da Mãe",
                            "sm": "5"
                        }
                    }
                },
                "bloco_3_2": {
                    "classes": "row",
                    "campos": {
                        "registro_avo_materna": {
                            "texto": "Reg. Avó Materna",
                            "sm": "2"
                        },
                        "avo_materna": {
                            "texto": "Avó Materna",
                            "sm": "4"
                        },
                        "registro_avo_materno": {
                            "texto": "Reg. Avô Materno",
                            "sm": "2"
                        },
                        "avo_materno": {
                            "texto": "Avô Materno",
                            "sm": "4"
                        }
                    }
                }
            }
        },
        "bloco_4": {
            "titulo": "Informações do Pai",
            "classes": "col-xs-12",
            "campos": {
                "bloco_4_1": {
                    "classes": "row",
                    "campos": {
                        "registro_pai": {
                            "texto": "Registro do Pai",
                            "sm": "3",
                            "classes_div": "col-sm-offset-2"
                        },
                        "mae": {
                            "texto": "Nome da Pai",
                            "sm": "5"
                        }
                    }
                },
                "bloco_4_2": {
                    "classes": "row",
                    "campos": {
                        "registro_avo_paterna": {
                            "texto": "Reg. Avó Paterna",
                            "sm": "2"
                        },
                        "avo_materna": {
                            "texto": "Avó Paterna",
                            "sm": "4"
                        },
                        "registro_avo_paterno": {
                            "texto": "Reg. Avô Paterno",
                            "sm": "2"
                        },
                        "avo_materno": {
                            "texto": "Avô Paterno",
                            "sm": "4"
                        }
                    }
                }
            }
        }
    }
}
