document.addEventListener('DOMContentLoaded', () => {

    const socket = io.connect();

    const pincel = {
        ativo: false,
        movendo: false,
        pos: {x: 0, y: 0},
        posAnterior: null
    }

    const tela= document.querySelector('#tela');
    const contexto = tela.getContext('2d')


    tela.width = 700;
    tela.height = 500;


    contexto.lineWidth = 7;
    contexto.strokeStyle = "red";

    const desenharLinha = (linha) => {

        contexto.beginPath();
        contexto.moveTo(linha.posAnterior.x, linha.posAnterior.y);
        contexto.lineTo(linha.pos.x, linha.pos.y)
        contexto.stroke();
    }

    tela.onmousedown = (evento) => {pincel.ativo = true};
    tela.onmouseup = (evento) => {pincel.ativo = false};

    tela.onmousemove = (evento) => {
        pincel.pos.x = evento.clientX
        pincel.pos.y = evento.clientY
        pincel.movendo = true;
    }


    socket.on('desenhar', (linha)=>{
        desenharLinha(linha);
    })

    const ciclo = () => {
        if(pincel.ativo && pincel.movendo && pincel.posAnterior){
            socket.emit('desenhar',{pos: pincel.pos, posAnterior: pincel.posAnterior})
            //desenharLinha({pos: pincel.pos, posAnterior: pincel.posAterior})
            pincel.movendo = false;
        }

        pincel.posAnterior = { x: pincel.pos.x, y: pincel.pos.y}

        setTimeout(ciclo, 10);

    }

    ciclo()

})