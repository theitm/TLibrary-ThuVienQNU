import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
// import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import logo from "../img/logo-nonback.png";
// import '../css/searchBar.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
const suggestions = [
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
];

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => { }, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) =>
                    part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 500 }}>
                            {part.text}
                        </span>
                    ) : (
                            <strong key={String(index)} style={{ fontWeight: 300 }}>
                                {part.text}
                            </strong>
                        ),
                )}
            </div>
        </MenuItem>
    );
}

function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

function getSuggestionValue(suggestion) {
    return suggestion.label;
}
function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };
const styles = theme => ({
    root: {
        height: 250,
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,

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
    card: {
        width: "100%",
        minWidth: 275,
        margin: 5,
      },
      author: { 
        fontSize: 14,
        margin: theme.spacing.unit,
      },
      detail: {
        marginBottom: 12, 
        margin: theme.spacing.unit,  
      },
      link: {
        margin: theme.spacing.unit,
      },
      tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
      },
      tabsIndicator: {
        backgroundColor: '#1890ff',
      },
      tabRoot: {
        textTransform: 'initial',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing.unit * 4,
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
          color: '#40a9ff',
          opacity: 1,
        },
        '&$tabSelected': {
          color: '#1890ff',
          fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
          color: '#40a9ff',
        },
      },
      tabSelected: {},
      typography: {
        padding: theme.spacing.unit * 3,
      },
});

class ResultPage extends React.Component {
    state = {
        value: 0,
        single: '',
        popper: '',
        suggestions: [],
    };

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = name => (event, { newValue }) => {
        this.setState({
            [name]: newValue,
        });
    };
    handleChangeTab = (event, value) => {
        this.setState({ value });
      };
    
     
    render() {
        const { classes } = this.props;
        const { value } = this.state;

        const autosuggestProps = {
            renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue,
            renderSuggestion,
        };
        

        return (
            <div className={classes.root}>

                <Grid

                    direction="row"
                    // justify="center"
                    alignItems="baseline"
                    container >
                    <Grid item xs>
                        <a href="/" className="logo-wrapper waves-effect text-center">

                            <img alt="TLibrary Logo" width="78" className="img-fluid" src={logo}></img>
                        </a>
                    </Grid>
                    <Grid item lg={6} xs={6}>
                        <Autosuggest
                            
                            {...autosuggestProps}
                            inputProps={{
                                classes,
                                placeholder: 'Nhập tên sách cần tìm',
                                value: this.state.single,
                                onChange: this.handleChange('single'),
                            }}
                            theme={{
                                container: classes.container,
                                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                                suggestionsList: classes.suggestionsList,
                                suggestion: classes.suggestion,
                            }}
                            renderSuggestionsContainer={options => (
                                <Paper {...options.containerProps} square>
                                    {options.children}
                                </Paper>
                            )}
                        />
                    </Grid>
                    <Grid item lg={3} xs={4}>
                        <Button href='/rs' variant="outlined" color="primary"  className={classes.button}>
                            Tìm Kiếm
                        </Button>
                    </Grid>
                </Grid>

                <Grid

                    direction="row"
                    justify="flex-start"
                    alignItems="baseline"
                    container >
                    <Grid item xs></Grid>
                    <Grid item lg={8} xs={12} >
                    <Tabs
          value={value}
          onChange={this.handleChangeTab}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Sách"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Luận Văn"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Bài Giảng"
          />
        </Tabs>      
        {value === 0 && <TabContainer>
            <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="center"
                            alignContent="flex-start"
                            

                        >
                            <Card className={classes.card}>
                                <CardContent align='left'>

                                <a href={'/'} className={classes.link}>
                                 <b>Dế Mèn Phiêu Lưu Ký</b>   
                                </a>
                                <hr/>
                                    <Typography  className={classes.author} color="textSecondary" gutterBottom>
                                        Word of the Day
                                      </Typography >

                                    <Typography  className={classes.detail}  component="p">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                    Phasellus aliquam malesuada lobortis. Suspendisse pellentesque 
                                    augue malesuada dui semper varius.

                                     
                                   
                                    </Typography>
                                </CardContent>

                            </Card>                       
                        </Grid>
                </TabContainer>}
            
                        
                    </Grid>
                    <Grid item xs></Grid>



                </Grid>


            </div>
        );
    }
}



ResultPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultPage);