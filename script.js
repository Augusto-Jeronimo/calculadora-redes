
/* --v-- Código da interface, marca a opção clicada --v-- */

function opcMark(clicado, n) {
    var met = document.getElementsByClassName('esc')
    var campoCod = document.getElementById('codigo')

    for (let index = 0; index < 3; index++) {
        met[index].style.backgroundColor = 'var(--dark1)'
        clicado.style.backgroundColor = 'var(--normal1)'
    }
}

/* --v-- Códogo de seleção --v-- */

function enviar(opc) {
    var metodo = document.getElementsByName('opc')

    if (document.getElementById('codigo').value.length == 0) {
        
        alert('[ERRO] O campo não pode estar vazio!')

    }else if (metodo[0].checked) {
        
        crc(opc)

    }else if (metodo[1].checked) {

        checksum(opc)

    }else if (metodo[2].checked) {

        bitDeParidade(opc)

    }else {

        alert('[ERRO] Escolha uma das opções!')

    }
    
}

/* --v-- Código do CRC --v-- */

function crc(opc){

    var poliCrc = '1101' // Polinômio gerador
    var campoCod = document.getElementById('codigo') // Caixa de texto do código
    var codigo = campoCod.value // Código contido no campo de texto
    var resul = document.getElementById('resul')
    var codIni = codigo // Cópia do código

    // Caso seja input, adiciona os 0s necessários
    if (opc == 'input') {
        // Repete o (tamanho do polinômio -1) vezes
        for (var i = 1; i < poliCrc.length; i++) {
            codigo += '0'
        }
    }

    codigo = divXor(codigo, poliCrc) // Chama a função que faz a operação

    // Caso seja input
    if (opc == 'input') {
        // Junta o resultado do crc com a cópia feita anteriormente do código
        codigo = compileResult(codIni, codigo, poliCrc)

        // Exibe o resultado na caixa de texto de saída
        resul.innerText = codigo
    }
    // Caso seja output
    else {
        // Caso o rezultado do código seja 0, exibe "Certo", caso contrário, "Erro"
        if (codigo == 0) {
            resul.innerText = "Certo" // Insere o texto no campo de resultado
        }else {
            resul.innerText = 'Erro' // Insere o texto no campo de resultado
        }

    }
}

// Função que substitui os bits
function replaceChar(cod, index, bit) {
    // Returna o código com o bt específico substituido
    return cod.substr(0, index) + bit + cod.substr(index+1, cod.length)
}

// Função que executa a operação de divisão com o operador XOR
function divXor(cod, poliCrc){
    // Define o limite da repetição
    var rep = cod.length - (poliCrc.length-1)
    
    // Repetição que faz a conta "andar para a direita"
    for (let i1 = 0; i1 < rep; i1++) {
        
        // Caso o primeiro valor testado seja 1, conta, senão, ignora
        if (cod[i1] == '1') {

            // Percorre o polinômio 
            for (let i2 = 0 ; i2 < poliCrc.length; i2++) {

                //caso o bit do código seja igual o do polinômio na respectiva posição
                if (cod[i1 + i2] == poliCrc[i2]) {
                    cod = replaceChar(cod, (i1+i2), '0') // Chama a função que substitui o bit - 0
                }
                // Caso contrário
                else {
                    cod = replaceChar(cod, (i1+i2), '1') // Chama a função que substitui o bit - 1
                }

            }

        }
        
    }

    // retorna o código
    return cod
}

// Junta o código inicial com o crc calculado
function compileResult(inicio, fim, poliCrc) {
    // Define o limite da sobrescrição
    var fimMsm = fim.length - (poliCrc.length-1)
    
    // Retorna o resultado, sendo:
    return inicio + fim.substr(fimMsm, fim.length)
    /*  código ^  +   ^ final do crc gerado ^  */
}