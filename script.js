
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