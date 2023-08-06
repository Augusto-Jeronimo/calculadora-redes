
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
    var resul = document.getElementById('resul') // Campo de resultado
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

/* --v-- Código do Bit de paridade --v-- */

function bitDeParidade(opc) {
    var campoCod = document.getElementById('codigo') // Caixa de texto do código
    var codigo = campoCod.value // Código contido no campo de texto
    var resul = document.getElementById('resul') // Campo de resultado

    // Caso seja input
    if (opc == 'input') {
        //Remove os 0s do início
        while (codigo[0] != '1') {
            codigo = codigo.substr(1, codigo.length)
        }

        codigo += bitPari(codigo) // Adição di bit de paridade


        resul.innerText = codigo // Insere o código no campo de resultado
    }
    // Caso contrário
    else {
        if (codigo[codigo.length-1] == bitPari(codigo) && bitPari(codigo) == '1') {
            resul.innerText = 'Erro'
        }else {
            resul.innerText = 'Certo'
        }
    }
    
}

function bitPari(codigo) {
    var cont = 0

    for (var i = 0; i < codigo.length; i++) {
        
        if (codigo[i] == '1') {
            cont++
        }
    }

    if (cont % 2 == 0) {
        return '0'
    } else {
        return '1'
    }
}

/* --v-- Código do Checksum --v-- */

function checksum(opc) {
    var campoCod = document.getElementById('codigo') // Caixa de texto do código
    var codigo = campoCod.value // Código contido no campo de texto
    var resul = document.getElementById('resul') // Campo de resultado

    

    // caso seja input, calcula o checksum e concatena com o código original
    if (opc == 'input') {

        if (codigo.length % 2 != 0) {
            codigo = '0' + codigo
        }
    
        var tam = codigo.length
        var met = tam/2

        var pt1 = codigo.substring(0, met)
        var pt2 = codigo.substring(met, tam)

        var sum = cs(pt1, pt2)
        var sumNeg = ''

        for (let i = 0; i < sum.length; i++) {
            sum[i] == '1'? sumNeg += '0' : sumNeg += '1'
        }

        resul.value = codigo + sumNeg

        
    }
    // Caso seja output, calcula o checksum da parte dos dados e soma com o final
    else {
        while (codigo.length % 3 != 0) {
            codigo = '0' + codigo
        }

        var tam = codigo.length
        var ter = tam/3

        var pt1 = codigo.substring(0, ter)
        var pt2 = codigo.substring(ter, ter*2)
        var pt3 = codigo.substring(ter*2, tam)

        var sum = cs(pt1, pt2)

        var certo = true
        for (let i = 0; i < sum.length; i++) {
            if (sum[i] == pt3[i]) {
                certo = false
            }
        }

        if (certo) {
            resul.value = 'certo'
        } else {
            resul.value = 'errado'
        }

    }
}

function cs(cod1, cod2) {
    var tSum = 0
    var tCod = cod1.length
    var sum

    do {
        // Salva os valores como inteiro para executar a soma
        var int1 = parseInt(cod1, 2)
        var int2 = parseInt(cod2, 2)
        
        // Soma os inteiros e converte para binário
        sum = (int1 + int2).toString(2)
        
        // Se a soma for um valor com mais bits que os códigos, separa em 2 valores
        tSum = sum.length

        if (tSum > tCod) {
            cod1 = sum.substring(sum.length-tCod, sum.length)
            cod2 = sum.substring(0, sum.length-tCod)
        } else {
            while (tCod > tSum) {
                sum = '0' + sum
                tSum = sum.length
            }
        }
    } while (tSum != tCod)

    return sum
}