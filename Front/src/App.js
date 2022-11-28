import React, {Component} from 'react';
import PopupDom from './PopupDom';
import PopupContent from './PopupContent';
 
import './App.css'
 
class App extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            isOpenPopup: false,
        }
 
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }
 
    openPopup(){
        this.setState({
            isOpenPopup: true,
        })
    }
 
    closePopup(){
        this.setState({
            isOpenPopup: false,
        })
    }
 
    render(){
        return(
            <div>
                <h2> 누르면 팝업창 생성 </h2>
                <div>
                    <button type="button"
                            id="popupDom"
                            onClick={this.openPopup}
                    >
                        Click
                    </button>
                    {this.state.isOpenPopup &&
                        <PopupDom>
                            <PopupContent onClose={this.closePopup}/>
                        </PopupDom>
                    }
                </div>
            </div>
        );
    }
}
 
export default App;