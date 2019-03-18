
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Badge from '@material-ui/core/Badge'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings'
import NotificationsIcon from '@material-ui/icons/Notifications';

const { I18n } = require('react-i18nify');

const styles = {
    
};

class Navbar extends React.Component {
    
    render() {
        return (            
            <AppBar className="AppHeader" position="absolute">
                    <Toolbar>
                        <Typography color="inherit">
                            { I18n.t('application.title') }
                        </Typography>                    
                        <div style={{ flexGrow: 1, textAlign: "right"}}>
                            <IconButton color="inherit" component={Link} to="/">
                                <Badge badgeContent={this.props.unread} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton color="inherit" component={Link} to="/settings">
                                <SettingsIcon />
                            </IconButton>
                        </div>      
                    </Toolbar>
                
            </AppBar>        
        )}
}

const mapStateToProps = (state, ownProps) => {
    return {
        unread: state.chatReducer.unread
    }    
}

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
