import React from "react";
import '../App.css'

class Main extends Component {
    constructor(){
        super();
        
        this.state = {
            isOpenPopup: false,
        }
 
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
    };
 
    openPopup(){
        this.setState({
            isOpenPopup: true,
        })
    };
 
    closePopup(){
        this.setState({
            isOpenPopup: false,
        })
    };
 
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

 
export default Main;