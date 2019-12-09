const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const sound_do = document.getElementById('do')
const sound_re = document.getElementById('re')
const sound_mi = document.getElementById('mi')
const sound_fa = document.getElementById('fa')
const sound_win = document.getElementById('win')
const sound_lost = document.getElementById('lost')
const imprimeNivel = document.getElementById('nivel')
const imprimeSubNivel = document.getElementById('subnivel')

const btnempezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10

class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar() 
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 250)
    }
    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1
        
        
        this.sonidos = {
            sound_do,
            sound_re,
            sound_mi,
            sound_fa,
            sound_lost,
            sound_win
        }
        
        this.colores = {
            celeste, 
            violeta,
            naranja,
            verde
        }
    }
    
    toggleBtnEmpezar(){
        if (btnempezar.classList.contains('hide')){
            btnempezar.classList.remove('hide')
        } else {
            btnempezar.classList.add('hide')
        }
    }
    
    
    generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }
    
    siguienteNivel() {
        document.getElementById("valorNivel").innerHTML=this.nivel;
        this.subNivel = 0
        this.iluminarSecuencia()
        this.agregarEventoClick()
    }
    
    transformarNumeroAColor(numero){
        switch (numero){
            case 0:
                return 'celeste'
                case 1:
                    return 'violeta'
                case 2:
                    return 'naranja'
                case 3:
                    return 'verde' 
            }
        }

        transformarColorAnumero(nombreColor){
            switch (nombreColor){
                case 'celeste':
                    return 0
                case 'violeta':
                    return 1
                case 'naranja':
                    return 2
                case 'verde':
                    return 3 
            }
        }
        generarSonido(numero){
            // debugger
            switch(numero){
                case 'celeste':
                    this.sonidos.sound_do.play()
                    break;
                case 'violeta':
                    this.sonidos.sound_re.play()
                    break;
                case 'verde':
                    this.sonidos.sound_mi.play()
                    break;
                case 'naranja':
                    this.sonidos.sound_fa.play()
                    break;
                case 'ganar':
                    this.sonidos.sound_win.play()
                    break;
                case 'perder':
                    this.sonidos.sound_lose.play()
                    break;
            }
        }


        iluminarSecuencia() {
            for (let i = 0; i < this.nivel; i++) {
                const color = this.transformarNumeroAColor(this.secuencia[i])
                setTimeout(() => this.iluminarColor(color), 1500 * i)
            }   
        }    
        
        iluminarColor(color){
            this.colores[color].classList.add('light')
            this.generarSonido(color)
            setTimeout(() => this.apagarColor(color), 350)
        }
        
        apagarColor(color){
            this.colores[color].classList.remove('light')
        }
        agregarEventoClick()
        {
            this.colores.celeste.addEventListener('click', this.elegirColor)
            this.colores.violeta.addEventListener('click', this.elegirColor)
            this.colores.verde.addEventListener('click', this.elegirColor)
            this.colores.naranja.addEventListener('click', this.elegirColor)
        }

        eliminarEventosClick(){
            this.colores.celeste.removeEventListener('click', this.elegirColor)
            this.colores.violeta.removeEventListener('click', this.elegirColor)
            this.colores.verde.removeEventListener('click', this.elegirColor)
            this.colores.naranja.removeEventListener('click', this.elegirColor)
        }

        elegirColor(ev){
           const nombreColor = ev.target.dataset.color
           const numeroColor = this.transformarColorAnumero(nombreColor) 
           this.iluminarColor(nombreColor)
           if (numeroColor === this.secuencia[this.subNivel]){
               this.subNivel++
               
               if (this.subNivel === this.nivel){
                   this.nivel++
                   this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)){
                    this.generarSonido('ganar')
                    this.ganoEljuego()
                } else{
                    setTimeout(this.siguienteNivel, 1500)
                }
               }
           } else {
            this.perdioEljuego()
           }
        }

        ganoEljuego(){
            swal('Felicitaciones!', 'Ganaste el Juego! ;)', 'success')
            .then(() => {
                this.inicializar()
            })
        }

        perdioEljuego(){
            swal('Lo Sentimos!', 'Perdiste :( vuelve a intentarlo!', 'error')
           
            .then(() => {
                this.eliminarEventosClick()
                this.inicializar()
            })
        }
    }
function empezarJuego(){
    window.juego = new Juego()
}
