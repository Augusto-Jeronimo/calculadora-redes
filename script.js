
/* --v-- Código da interface, marca a opção clicada --v-- */

function opcMark(clicado, n) {
    var met = document.getElementsByClassName('esc')
    var campoCod = document.getElementById('codigo')

    for (let index = 0; index < 3; index++) {
        met[index].style.backgroundColor = 'var(--dark1)'
        clicado.style.backgroundColor = 'var(--normal1)'
    }
}