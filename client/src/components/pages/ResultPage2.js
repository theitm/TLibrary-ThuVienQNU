import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import logo from "../../img/tlogo.png";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from "../component/Pagination";
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import '../../css/pagination.scss'
function TabContainer(props) {
  return (
    <Typography component="div" >
      {props.children}
    </Typography>
  );
}

//   function xoadau(str) {


//     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
//     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
//     str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
//     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
//     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
//     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
//     str = str.replace(/đ/g, "d");
//     str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
//     str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
//     str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
//     str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
//     str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
//     str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
//     str = str.replace(/Đ/g, "D");
//     return str;
// }




TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,

  },
  key:{
    width: '100%',
    // maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,

  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  formSearch: {
    margin: "1rem",
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
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
  // divider: {
  //     height: theme.spacing.unit * 2,
  // },
  card: {
    width: "99%",
    // minWidth: 275,
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
    kw: '',
    Book: [],
    currentBooks: [],
    LuanAn: [],
    currentLuanAns: [],
    LuanVan: [],
    currentLuanVans: [],
    currentPage: null,
    totalPages: null

    // kw2: 'to%C3%A1n',
  };



  //   constructor(props) {
  //     super(props);

  //     this.handleChange = this.handleChange.bind(this);
  //     this.handleGetBookByKW = this.handleGetBookByKW.bind(this);
  //   }

  componentDidMount = () => {
    const { match: { params } } = this.props
    this.setState({
      kw: params.kw
    })
    const key = encodeURIComponent(params.kw);

    fetch("http://localhost:8080/book/" + key, {
      method: 'GET',
      mode: 'cors'
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          Book: data,
          
          // resultCount: data.length
        })
      });
      fetch("http://localhost:8080/luanvan/" + key, {
      method: 'GET',
      mode: 'cors'
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          LuanVan: data,
          
          // resultCount: data.length
        })
      });
      fetch("http://localhost:8080/luanan/" + key, {
      method: 'GET',
      mode: 'cors'
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          LuanAn: data,
        })
      });
      fetch("http://localhost:8080/key/" + key, {
        method: 'GET',
        mode: 'cors'
      })
        .then(response => response.json())
        .then(data => {
          this.setState({
            Key: data,
          })
        });
  }



  handleChangeValue(e) {

    const { name, value } = e.target;
    // e.target.className = "form-control"
    switch (name) {
      case "kw":
        this.setState({ kw: value })
        // console.log(this.state.Book.length);

        break;

      default:
        break;
    }
  }

  handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      const link = this.state.kw;
      this.props.history.push(link)
      console.log(this.props)
      window.location.reload(); 

    }
    
  }

  // handleSameKeyPress = (kw) => {
  //   this.props.history.push(kw)
  //   console.log(this.props)

  // }
    handleSameKeyClick(key){
      this.props.history.push("/"+key);

    }
    

  handleGetBookByKW = () => {
    // console.log(params.kw)
    const key = encodeURIComponent(this.state.kw);
    fetch("http://localhost:8080/book/" + key, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
     
        this.setState({
          Book: data,
          // allBooks: [],
          currentPage: null,
          totalPages: null
          // value: 0
        })
      });
  }



  // handleChange = name => (event, { newValue }) => {
  //     this.setState({
  //         [name]: newValue,
  //     });
  // };
  handleChangeTab = (event, value) => {
    this.setState({ value });
  };
  onPageBookChanged = data => {
    const { Book } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentBooks = Book.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentBooks, totalPages });
  };
  onPageLuanAnChanged = data => {
    const { LuanAn } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentLuanAns = LuanAn.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentLuanAns, totalPages });
  };
  onPageLuanVanChanged = data => {
    const { LuanVan } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentLuanVans = LuanVan.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentLuanVans, totalPages });
  };

  render() {
    const { classes } = this.props;
    const {
      value,
      Book,
      currentBooks,
      currentPage,
      totalPages
    } = this.state;
    const totalBooks = this.state.Book.length;
    const totalLuanAns = this.state.LuanAn.length;
    const totalLuanVans = this.state.LuanVan.length;

    while (totalBooks === 0  ) return (
      <div >
        <a href="/" className="logo-wrapper waves-effect text-center">
          <img alt="TLibrary Logo" width="400" className="img-fluid" src={logo}></img>
          <br></br>
          <CircularProgress className={classes.progress} />

        </a>
        <br/>
        Nếu đợi quá lâu, hãy nhấp vào ảnh để về trang chủ!</div>
    );

    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-gray border-right" : ""
    ]
      .join(" ")
      .trim();


    return (
      <div className={classes.root}>

        <Grid

          direction="row"
          // justify="center"
          alignItems="baseline"
          container >
          <Grid item lg={2} xs={12}>
            <a href="/" className="logo-wrapper waves-effect text-center">

              <img alt="TLibrary Logo" width="78" className="img-fluid" src={logo}></img>
            </a>
          </Grid>
          <Grid item alignItems="center" lg={6} xs={12}>
            <Paper className={classes.formSearch} elevation={1}>
              {/* <MDBInput name="kw" value={this.state.kw} onChange={this.handleChangeValue.bind(this)} /> */}
              <InputBase
                onKeyPress={this.handleKeyPress}
                className={classes.input} name="kw"
                value={this.state.kw}
                onChange={this.handleChangeValue.bind(this)}
                placeholder="Nhập tên sách..." />
              <IconButton onClick={this.handleGetBookByKW} className={classes.iconButton} aria-label="Search">
                <SearchIcon />
              </IconButton>

            </Paper>
          </Grid>
          <Grid item xs>
            {/* <Button href='/rs' variant="outlined" color="primary"  className={classes.button}>
                            Tìm Kiếm
                        </Button> */}
          </Grid>
        </Grid>

        <Grid
          direction="row"
          justify="flex-start"
          alignItems="baseline"
          container >
          <Grid item xs></Grid>
          <Grid item lg={6} xs={12} >
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
                label="Luận Án"
              />
            </Tabs>
            {/* Tab Luận Văn */}
            {value === 1 &&
              <TabContainer>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="center"
                  alignContent="flex-start"
                >
                  {this.state.currentLuanVans.map((item, index) =>
                    (
                      <Card key={index} className={classes.card}>
                        <CardContent align='left'>

                          <a href={'/'} className={classes.link}>
                            <b>{item.Name}</b>
                          </a>

                          <Typography className={classes.author} color="textSecondary" gutterBottom>
                            {item.Author}
                          </Typography >
                          <hr />
                          <Typography className={classes.detail} component="p">
                            {item.Code}<br />
                            {/* {item.Code2}<br />
                            {item.Code3} */}
                          </Typography>
                        </CardContent>

                      </Card>
                    )
                  )}
                  <div className="d-flex flex-row py-4 align-items-center">
                    <Pagination
                      totalRecords={totalLuanVans}
                      pageLimit={18}
                      pageNeighbours={1}
                      onPageChanged={this.onPageLuanVanChanged}
                    />
                  </div>
                </Grid>

              </TabContainer>
            }
            {/* Tab luận án */}
            {value === 2 &&
              <TabContainer>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="center"
                  alignContent="flex-start"
                >
                  {this.state.currentLuanAns.map((item, index) =>
                    (
                      <Card key={index} className={classes.card}>
                        <CardContent align='left'>

                          <a href={'/'} className={classes.link}>
                            <b>{item.Name}</b>
                          </a>

                          <Typography className={classes.author} color="textSecondary" gutterBottom>
                            {item.Author}
                          </Typography >
                          <hr />
                          <Typography className={classes.detail} component="p">
                            {item.Code}<br />
                            {/* {item.Code2}<br />
                            {item.Code3} */}
                          </Typography>
                        </CardContent>

                      </Card>
                    )
                  )}
                  <div className="d-flex flex-row py-4 align-items-center">
                    <Pagination
                      totalRecords={totalLuanAns}
                      pageLimit={18}
                      pageNeighbours={1}
                      onPageChanged={this.onPageLuanAnChanged}
                    />
                  </div>
                </Grid>

              </TabContainer>
            }
            {value === 0 &&
              <TabContainer>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="center"
                  alignContent="flex-start"
                >
                  {this.state.currentBooks.map((item, index) =>
                    (
                      <Card key={index} className={classes.card}>
                        <CardContent align='left'>

                          <a href={'#'} className={classes.link}>
                            <b>{item.Name}</b>
                          </a>

                          <Typography className={classes.author} color="textSecondary" gutterBottom>
                            {item.Author}
                          </Typography >
                          <hr />
                          <Typography className={classes.detail} component="p">
                            {item.Code1}<br />
                            {item.Code2}<br />
                            {item.Code3}
                          </Typography>
                        </CardContent>

                      </Card>
                    )
                  )}
                  <div className="d-flex flex-row py-4 align-items-center">
                    <Pagination
                      totalRecords={totalBooks}
                      pageLimit={18}
                      pageNeighbours={1}
                      onPageChanged={this.onPageBookChanged}
                    />
                  </div>
                </Grid>
              
              </TabContainer>
            }

<h5>  Người dùng cũng tìm kiếm: </h5>
                {this.state.Key.map((item, index) =>
                <List className={classes.key}>
                <a  href={"/rs/"+item.Key}> 
                  <ListItem button divider>
                    {item.Key}
                    {/* onClick={this.handleSameKeyPress(item.Key)}  */}
                  </ListItem>
                  </a>
                  {/* <Divider /> */}
                </List>
                )}
          </Grid>
          
          <Grid item lg={4} xs></Grid>
          
        </Grid>


      </div>
    );
  }
}



ResultPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultPage);