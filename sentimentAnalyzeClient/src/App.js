import './bootstrap.min.css';
import './App.css';
import EmotionTable from './EmotionTable.js';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    innercomp:<textarea rows="4" cols="100" id="textinput" placeholder="add text" required />,
    mode: "text",
    sentimentOutput:[],
    sentiment:true
  }
  
  renderTextArea = ()=>{
    document.getElementById("textinput").value = "";
    if(this.state.mode === "url") {
      this.setState({innercomp:<textarea rows="4" cols="100" id="textinput" placeholder="add text" required />,
        mode: "text",
        sentimentOutput:[],
        sentiment:true
      })
    } 
  }

  renderTextBox = ()=>{
    document.getElementById("textinput").value = "";
    if(this.state.mode === "text") {
      this.setState({innercomp:<textarea rows="1" cols="100" id="textinput" placeholder="url" required />,
      mode: "url",
      sentimentOutput:[],
      sentiment:true
    })
    }
  }

  sendForTextAnalysis = e => {
    e.preventDefault();
    this.setState({
      sentimentOutput: <div className="spinner-border m-4" role="status"><span className="visually-hidden"></span></div>,
      sentiment:true
    });
    let ret = "";
    let url = "";

    if(this.state.mode === "url") {
      url = url+"/url/?url="+document.getElementById("textinput").value;
    } else {
      url = url+"/text/?text="+document.getElementById("textinput").value;
    }
    ret = axios.get(url);
    ret.then((response)=>{
      //Include code here to check the sentiment and fomrat the data accordingly
      if (response.data.status === 200) {
        this.setState({sentimentOutput:<EmotionTable analytics={response.data.result.keywords}/>});
      } else {
        this.setState({sentimentOutput:<div className="alert alert-danger m-4" role="alert">{response.data.message}</div>});
      }
      
    }).catch(err => {
      console.log("err: ", err);
      this.setState({sentimentOutput:<div className="alert alert-danger m-4" role="alert">{err.message}</div>});
    })
  }
  
  render() {
    return (  
      <form className="App mt-2" onSubmit={this.sendForTextAnalysis}>
        <button type="button" className={this.state.mode === "text" ? "btn btn-info" : "btn btn-dark"} onClick={this.renderTextArea}>Text</button>
        <button type="button" className={this.state.mode === "url" ? "btn btn-info" : "btn btn-dark"}  onClick={this.renderTextBox}>URL</button>
        <br/><br/>
        {this.state.innercomp}
        <br/>
        <button type="submit" className="btn-primary">Analyze</button>
        <br/>
        {this.state.sentimentOutput}
      </form>
    );
  }
}

export default App;
