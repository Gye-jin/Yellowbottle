import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import "./App.css";

class PopupContent extends Component {
  render() {
    return (
      <div className="dimmed_layer_wrapper">
        <div className="full_layer">
          <div className="common_alert">
            <div>
              <button
                type="button"
                class="btn__close"
                onClick={this.props.onClose}
              >
                닫기
              </button>
            </div>
            <p>아이디</p>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <p>비밀번호</p>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PopupContent;
