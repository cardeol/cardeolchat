import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Chat from './components/Chat';
import Settings from './components/Settings'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Actions } from './actions/postActions';
import io from 'socket.io-client';
import './App.css';

const { I18n } = require('react-i18nify');

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar  
});

const themeDark = createMuiTheme({  palette: { type: 'dark'  }, useNextVariants: true });
const themeLight = createMuiTheme({ palette: { type: 'light' }, useNextVariants: true });

I18n.setTranslations({ // can be loaded from a file
  en: {
    application: {
      title: "MyChat App",
      your_message: "Your message",
      settings: "Settings",
      user: "User"
    },
    settings: {
      interface_color: "Interface Color",
      interface_color_light: "Light Theme",
      interface_color_dark: "Dark Theme",
      language: "Language",
      language_en: "English",
      language_es: "Spanish",
      clock_display: "Clock Display",
      clock_display_12: "12 Hours",
      clock_display_24: "24 Hours",
      reset_to_defaults: "Reset to Defaults",
      messages_on_enter: "Messages on Ctrl+Enter"
    }  
  },
  es: {
    application: {
      title: "Sistema MyChat",
      your_message: 'Tu mensaje',
      settings: "Opciones",
      user: "Usuario"
    },
    settings: {
      interface_color: "Interface Color",
      interface_color_light: "Tema Claro",
      interface_color_dark: "Tema Oscuro",
      language: "Lenguaje",
      language_en: "Espanol",
      language_es: "Ingles",
      clock_display: "Formato de Reloj",
      clock_display_12: "12 Horas",
      clock_display_24: "24 Horas",
      reset_to_defaults: "Reiniciar opciones",
      messages_on_enter: "Mensages con Ctrl+Enter"
    }
  }
});

/**
 * Main Class and bootstrap facade
 */
class App extends Component {
  
  constructor(props) {
    super(props);
    console.log(props);
    this.socket = io.connect(props.settings.socket_server);   
    props.hasBeenConnected(false);
    this.socket.on("connect", () => {
      props.hasBeenConnected(true);
    });
  }

  componentWillMount() {
     window.socket = this.socket;
  }
  
  componentDidMount() {
    this.socket.on("connection", () => {
        console.log("connected");
    });
    this.socket.on("new_message", this.props.receiveMessage)
  }

  render() {
    // bootstraping
    const { settings } = this.props;
    const SettingsTheme = settings.interface_theme === "light" ? themeLight : themeDark; // setting theme stored in redux
    I18n.setLocale(settings.language); // setting language for i18n    
    return (
      <MuiThemeProvider theme={SettingsTheme}>
      <BrowserRouter>
        <div className="App">          
          <Navbar className="AppHeader" />     
            <div className="AppContent">
              <Switch>
                <Route exact path="/" component={Chat} />
                <Route path="/settings" component={Settings} />
              </Switch>
          </div>
        </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}
/**  
 * @param {*} dispatch mapper for dispatcher -> props (postActions)
 */
const mapDispatchToProps = (dispatch) => {
  return {
    receiveMessage: (message) => dispatch(Actions.receiveMessage(message)),
    hasBeenConnected: (cstate) => dispatch(Actions.hasBeenConnected(cstate)) 
  }
}


/**
 * 
 * @param {*} state  Redux state
 * @param {*} ownProps  Own Properties
 */
const mapStateToProps = (state, ownProps) => {
  return {
    settings: state.settingsReducer
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
//export default connect(mapStateToProps)(Chat);

