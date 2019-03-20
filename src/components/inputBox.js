import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import TagFaces from '@material-ui/icons/TagFaces'
import TextField from "@material-ui/core/TextField";

const { I18n } = require('react-i18nify');

class InputBox extends React.Component  {   

    state = {
        msg: ''
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        this.setState({ msg : e.target.value });
    };

    setSmiley = (e) => {
        this.setState({ msg: this.state.msg + " :-) <3 :wink: 😸 :D  ^__^" }); // emoji example
    }

    submit = (e) => {
        if(this.state.msg !== "") {
            this.props.handleSubmit(this.state.msg);
            this.setState({ msg: '' });
        }        
    }
    
    render() {
        const { messagesOnEnter } = this.props;
        const { theme } = this.props;
        return (
        <Grid container>
            <Grid item xs={12} style={{ width: "100%", textAlign: "right", display: "flex", flexDirection: "row" }}>
                <TextField
                    label={I18n.t('application.your_message')}
                    style={{ float: "left", flexGrow: 1 }}                
                    className="InputBox"
                    variant="outlined"
                    value={this.state.msg}
                    autoFocus={true}
                    onChange={this.handleChange}
                    InputProps={{
                        style: { 
                            color: "black",
                            background: theme === "dark" ? "#DDDDDD" : "#EEEEEE"
                        }
                    }}
                    onKeyDown={event => {
                        // if (event.ctrlKey) check if ctrl is present
                        if (messagesOnEnter && event.key === "Enter") {
                            this.submit(event);
                        }
                    }}
                />
                <Button variant="contained" color="inherit" style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }} onClick={this.setSmiley}><TagFaces /></Button>
                <Button variant="contained" color="inherit" style={{ marginTop: 5, marginRight: 5 }} onClick={this.submit}><SendIcon /></Button>
            </Grid>
        </Grid>
        )
    }
};



export default InputBox;
