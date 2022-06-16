import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


/**
 * Création de la class Welcome
 * Ajout de props au constructor de la class
 * 
 * fonction render : envoie en vue du component react
 */
class Welcome extends React.Component {

    constructor (props) {
        super(props);
        console.log(props)
    }

    render (){
        /**Props name est définit dans la function Home qui met en route l'app 
         * Props children et également définit dans la function home à l'intérieur d'un nouvel objet Welcome    
        */
        return <div>
            
            <h1>Bonjour {this.props.name}</h1>
            <p>
                
                {this.props.children}
            </p>
        </div>
    }
}

class Clock extends React.Component {

    constructor (props) {
        super(props);
        this.state = {date: new Date()}
    }

    componentDidMount () {
        this.timer = window.setInterval(this.tick.bind(this), 1000)
    } 

    componentWillUnmount () {
        window.clearInterval(this.timer)
    }

    tick () {
        this.setState({date: new Date()})
    }

    render () {

        return <div>
            Il est {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
        </div>
    }
}

class Incrementer extends React.Component {
    /**Il est possible de bind(this) les fonctions dans le construct afin de ne plus se soucier de le faire plus tard */
    constructor (props) {
        super(props);
        this.timer = null
        this.state = {n: props.start, timer: null}
        this.toggle = this.toggle.bind(this)
        this.reset = this.reset.bind(this)
        this.increment = this.increment.bind(this)
    }

    componentDidMount () {
       this.play()
    }

    componentWillUnmount () {
        this.pause()
    }

    increment () {
        this.setState((state, props) => ({n: state.n + props.step}))
    }

    pause () {
        window.clearInterval(this.state.timer)
        this.setState({
            timer: null
        })
    }

    play () {
        this.setState({
            timer: window.setInterval(this.increment, 1000)
        })
    }

    toggle() {
        return this.state.timer ? this.pause() : this.play()
    }

    label () {
        return this.state.timer ? 'Pause' : 'Lecture'
    }

    reset () {
        this.pause()
        this.play()
        this.setState((state, props) => ({n: props.start}))
    }

    render () {
        return <div>
            Valeur : {this.state.n}
            <button onClick={this.toggle}>{this.label()}</button> 
            <button onClick={this.reset}>Réinitialiser</button>
        </div>
    }
}

Incrementer.defaultProps = {
    start: 0, 
    step: 1
}

class ManualIncrementer extends React.Component {

    
    constructor (props) {
        super(props);
        this.state = {n: 0}

    }

    increment () {
        this.setState((state) => ({n: state.n + 1}))
    }

    render () {
        return <div>
            Valeur :  {this.state.n} <button onClick={this.increment.bind(this)}>Incrémenter</button>
        </div>
    }
}

function Home () {
    return <div>
        <Welcome name="Boris & Max" />
        <Welcome name="les humains" >Et tous les autres aussi</Welcome>
        <Clock/>
        <Incrementer start={0} />
        <ManualIncrementer />
    </div>
}

function Form() {
    return <div>
        
    </div>
}

ReactDOM.render(
    <div>
        <Home /><Form />
    </div>,
    document.getElementById("root")
)
