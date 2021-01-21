import React, { Component } from 'react'
import classes from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const links = [
    1, 2, 3
]

class Drawer extends Component {
    renderLinks() {
        return links.map((link, i) => {
            return (
                <li key={i}>
                    <a href="#!">Link {link}</a>
                </li>
            )
        })
    }

    render() {
        const cls = [classes.Drawer]

        if (!this.props.isOpen) {
            cls.push(classes.close);
        }

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        { this.renderLinks() }
                    </ul>
                </nav>
                { this.props.isOpen 
                    ?  <Backdrop onClick={this.props.onClose} /> 
                    : null}
            </React.Fragment>
        )
    }

} // end Drawer

export default Drawer