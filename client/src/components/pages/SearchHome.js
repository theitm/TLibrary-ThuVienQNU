import React from 'react';
import PropTypes from 'prop-types';
// import deburr from 'lodash/deburr';
// import Autosuggest from 'react-autosuggest';
// import match from 'autosuggest-highlight/match';
// import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
// import Paper from '@material-ui/core/Paper';
// import MenuItem from '@material-ui/core/MenuItem';
// import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import logo from "../../img/tlogo.png";
import Button from '@material-ui/core/Button';
import '../../css/searchBar.css'


// setTimeout(function() {
//   ReactDOM.render(<input value={null} />, mountNode);
// }, 1000);

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
    margin: "3rem",
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});



class SearchHome extends React.Component {
  state = {
    single: '',
    popper: '',
    kw: '',
    suggestions: [],
  };



  handleKeyPress = (e)  => {
    if(e.key == 'Enter'){
      const link = "rs/"+this.state.kw;
      this.props.history.push(link)
      console.log(this.props)
    }
  }

  // addMessage = e => {
  //   if(e.keyCode == 13 && e.shiftKey == false) {
  //     handleSubmit(p.values); // <--- all the form values are in a prop
  //   }
  // }
  
  handleChangeValue(e){
    const { name, value } = e.target;
    // e.target.className = "form-control"
    switch (name) {          
      case "kw":
        this.setState({ kw: value })
        // console.log(this.state.kw);
        break;
    
      default:
        break;
    }
  }

  render() {
    const { classes } = this.props;
    const link = "rs/"+this.state.kw;

  
  
  
   

    return (
      <div className={classes.root} >
      <Grid  
         direction="column"
          justify="flex-end"
         alignItems="center"
         container spacing={24}>
      
      <a href="/" className="logo-wrapper waves-effect text-center">

      <img alt="TLibrary Logo" width="400" className="img-fluid" src={logo}></img>
      </a>
      </Grid>
      <Grid container spacing={24}>
      <Grid item xs>
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
        <TextField
          id="standard-full-width"
          style={{ margin: 8 }}
          name="kw" value={this.state.kw} onChange={this.handleChangeValue.bind(this)}
          placeholder="Nhập tên sách..."
          fullWidth
          // onKeyDown={this.addMessage}
          onKeyPress={this.handleKeyPress}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br/>
        </Grid>
        <Grid item xs>
        </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="baseline"
          spacing={50}
        >
              <Button type="submit" href={link} link variant="outlined" color="primary" className={classes.button}>
              Tìm Kiếm
            </Button>

        {/* <Button variant="outlined" color="primary" className={classes.button}>
          Tìm sách bất kỳ
        </Button> */}
 
        </Grid>
      </div>
    );
  }
}

SearchHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchHome);