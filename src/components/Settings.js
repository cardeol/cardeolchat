import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { Actions } from '../actions/postActions';

const { I18n } = require('react-i18nify');

const styles = (theme) => ({
    toolbar: theme.mixins.toolbar,
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
        display: 'flex'
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

class Settings extends React.Component {

    handleData = key => (event) => {
        let response = event.target.value;
        if (key === "messages_on_enter") response = event.target.checked;
        this.props.saveSettings({ // mapped back to redux base on a settings key
            ...this.props.settings,
            [key]: response
        });        
    }
    
    resetToDefault = (event) => {
        this.props.resetToDefault();
    }

    render() {
      const { classes } = this.props;
      const  { settings } = this.props;
      return (
          <div className="ChatPage">         
              <div className={classes.toolbar} />   
              <h3> {I18n.t('application.settings')}</h3> 
                <Paper className="ChatContent">  
                <FormControl component="fieldset" className={classes.formControl}>                                                 
                  <TextField
                      id="outlined-name"
                      label={I18n.t('application.user')}
                      className={classes.textField}
                      value={settings.user_name}
                      onChange={this.handleData('user_name')}
                      margin="normal"
                      variant="outlined"
                  />
                  </FormControl>
                  <FormControl component="fieldset" className={classes.formControl}>                                                 
                    <FormLabel component="legend">{I18n.t('settings.interface_color')}</FormLabel>
                    <RadioGroup
                        aria-label="Gender"
                        name="radio_interface_color"
                        style={{ display: "block" }}
                        className={classes.group}
                        value={settings.interface_theme}
                        onChange={this.handleData("interface_theme")}>
                          <FormControlLabel value="light"control={<Radio />} label={I18n.t('settings.interface_color_light')} />
                          <FormControlLabel value="dark"  control={<Radio />} label={I18n.t('settings.interface_color_dark')} />
                    </RadioGroup>
                      <FormLabel component="legend">{I18n.t('settings.clock_display')}</FormLabel>
                      <RadioGroup
                          aria-label="Gender"
                          name="radio_clock_display"
                          style={{ display: "block" }}
                          className={classes.group}
                          value={settings.clock_display}
                          onChange={this.handleData("clock_display")}>
                          <FormControlLabel value="hh:mm a" control={<Radio />} label={I18n.t('settings.clock_display_12')} />
                          <FormControlLabel value="HH:mm" control={<Radio />} label={I18n.t('settings.clock_display_24')} />
                      </RadioGroup>
                  <FormControlLabel
                      control={
                          <Switch
                              checked={settings.messages_on_enter}
                              onChange={this.handleData('messages_on_enter')}
                              value={this.props.messages_on_enter}
                          />
                      }
                          label={I18n.t('settings.messages_on_enter')}
                  />
                      <FormControl className={classes.formControl}>
                          <FormLabel component="legend">{I18n.t('settings.language')}</FormLabel>
                          <Select
                              native
                              value={settings.language}
                              onChange={this.handleData("language")}                              
                            >
                              <option value="en">{I18n.t('settings.language_en')}</option>
                              <option value="es">{I18n.t('settings.language_es')}</option>
                          </Select>
                      </FormControl>
                      <Button variant="contained" color="secondary" onClick={this.resetToDefault}>
                          {I18n.t('settings.reset_to_defaults')}
                        </Button>
                  </FormControl>  
            </Paper>
          </div>
      )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        settings: state.settingsReducer
    }    
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveSettings: (settings) => dispatch(Actions.saveSettings(settings)),    
        resetToDefault: () => dispatch(Actions.resetToDefault())    
    }
}

Settings.propTypes = {
    classes: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Settings));