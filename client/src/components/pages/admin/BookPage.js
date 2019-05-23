import React from 'react'
import {
  Row, Col, Card, CardBody, MDBIcon, MDBModalBody, MDBInput, MDBBtn, MDBModal,
} from 'mdbreact';
import MUIDataTable from "mui-datatables";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import ReactNotification from "react-notifications-component";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import "react-notifications-component/dist/theme.css";

// /* Import MUIDataTable using command "npm install mui-datatables --save" */

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

function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}



TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};


const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    // margin: "5rem",

  },
  main: {
    backgroundColor: "#007bff",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class BookPage extends React.Component {

  constructor() {
    super();
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
    this.state = {  
      modal: false,
      data: [],
      value: 0,
      bookList: [],
      luanvanList: [],
      luananList: [],
      isUpdate: false,
      checkValidate: true
    };
  }
  addNotification(kind) {
    switch (kind) {
        case "successUpdate":
            this.notificationDOMRef.current.addNotification({
                message: "Cập nhật thông tin thành công!",
                type: "warning", //success, danger, default, info, warning or custom
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: { duration: 1000 },
                dismissable: { click: true }
            });
            break;
        case "successAdd":
            this.notificationDOMRef.current.addNotification({
                message: "Thêm thành công!",
                type: "success", //success, danger, default, info, warning or custom
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: { duration: 1000 },
                dismissable: { click: true }
            });
            break;
        case "successDelete":
            this.notificationDOMRef.current.addNotification({
                message: "Xóa thành công!",
                type: "danger", //success, danger, default, info, warning or custom
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: { duration: 1000 },
                dismissable: { click: true }
            });
            break;
    }
}
  GetBookList() {
    fetch('http://localhost:8080/books')
      .then(response => response.json())
      .then(data => {
        let NewData = []
        let cnt = 1
        data.map(row => {
          NewData.push([cnt, row.ID,row.Name, row.Author, row.Year, row.Keyword, row.Sumary, row.Code1, row.Code2, row.Code3, row.Uname])
          cnt++
          return NewData
        })
        this.setState({
          bookList: NewData
        })
      });
  }
  GetLuanVanList() {
    fetch('http://localhost:8080/luanvans')
      .then(response => response.json())
      .then(data => {
        let NewData = []
        let cnt = 1
        data.map(row => {

          ///Đang sửa ở đây
          NewData.push([cnt, row.ID,row.Name, row.Author, row.Year, row.Describe, row.Summary, row.Code, row.Uname, row.Uauthor, row.Udescribe, row.Usummary])
          cnt++
          return NewData
        })
        this.setState({
          luanvanList: NewData
        })
      });
  }
  GetLuanAnList() {
    fetch('http://localhost:8080/luanans')
      .then(response => response.json())
      .then(data => {
        let NewData = []
        let cnt = 1
        data.map(row => {
          NewData.push([cnt, row.ID, row.Name, row.Author, row.Describe, row.Summary, row.Code])
          cnt++
          return NewData
        })
        this.setState({
          luananList: NewData
        })
      });
  }
  GetKeyList() {
    fetch('http://localhost:8080/keys')
      .then(response => response.json())
      .then(data => {
        let NewData = []
        let cnt = 1
        data.map(row => {
          NewData.push([cnt, row.ID, row.Key, row.Kcount])
          cnt++
          return NewData
        })
        this.setState({
          keyList: NewData
        })
      });
  }

  componentDidMount() {

    this.GetBookList()
    this.GetLuanAnList()
    this.GetLuanVanList()
    this.GetKeyList()
  }


  toggleBook = () => {
    this.setState({
      modalBook: !this.state.modalBook,
    });
  };

  toggleLuanVan = () => {
    this.setState({
      modalLuanVan: !this.state.modalLuanVan,
    });
  };
  toggleLuanAn = () => {
    this.setState({
      modalLuanAn: !this.state.modalLuanAn,
    });
  };
  toggleKey = () => {
    this.setState({
      modalKey: !this.state.modalKey,
    });
  };


  addBook = () => {
    this.setState({
      name: "",
      author: "",
      year: "",
      keyword: "",
      sumary: "",
      code1: "",
      code2: "",
      code3: "",
      icon: "plus",
      isUpdate: false,
      checkValidate: false
    });
    this.toggleBook()
  }
  addLuanAn = () => {
    this.setState({
      name: "",
      author: "",
      year: "",
      describe: "",
      summary: "",
      code: "",
      icon: "plus",
      isUpdate: false,
      checkValidate: false
    });
    this.toggleLuanAn()
  }
  addLuanVan = () => {
    this.setState({
      name: "",
      author: "",
      year: "",
      year:"",
      describe: "",
      summary: "",
      code: "",
      icon: "plus",
      isUpdate: false,
      checkValidate: false
    });
    this.toggleLuanVan()
  }
  addKey = () => {
    this.setState({
      name: "",
      kcount: "",
      icon: "plus",
      isUpdate: false,
      checkValidate: false
    });
    this.toggleKey()
  }
  columnsBook = [
    {
      name: "#",
      options: {
        filter: false,
        sort: false,
      }
    },
    
    {
      name: "ID",
      options: {
        filter: false,
        sort: false,
        display: "excluded"
      }
    },
    {
      name: "Tên sách",
      options: {
        filter: false,
        sort: false,
        // sortDirection: 'asc',
      }
    },
    {
      name: "Thông tin phụ",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "Năm",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "Từ khóa",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "Tóm tắt",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "Mã 1",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "Mã 2",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "Mã 3",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "Uname",
      options: {
        filter: true,
        sort: false,
      }
    },
  ]
  columnsLuanVan = [
    {
      name: "#",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "ID",
      options: {
        filter: false,
        sort: false,
        display: "excluded"
      }
    },
    {
      name: "Tên luận văn",
      options: {
        filter: false,
        sort: false,
        // sortDirection: 'asc',
      }
    },
    {
      name: "Thông tin phụ",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "Năm",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "Mô tả",
      options: {
        filter: false,
        sort: false,
      }
    },
    
    {
      name: "Tóm tắt",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "Mã",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "Uname",
      options: {
        filter: false,
        sort: false,
        display: "excluded"
      }
    },
    {
      name: "Uauthor",
      options: {
        filter: false,
        sort: false,
        display: "excluded"
      }
    },
    {
      name: "Udescribe",
      options: {
        filter: false,
        sort: false,
        display: "excluded"
      }
    },
    {
      name: "Usummary",
      options: {
        filter: false,
        sort: false,
        display: "excluded"
      }
    },
  ]
  columnsLuanAn = [
    {
      name: "#",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "ID",
      options: {
        filter: false,
        sort: false,
        display: "excluded"
      }
    },
    {
      name: "Tên luận án",
      options: {
        filter: false,
        sort: false,
        // sortDirection: 'asc',
      }
    },
    {
      name: "Thông tin phụ",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "Mô tả",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "Tóm tắt",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "Mã",
      options: {
        filter: false,
        sort: false,
      }
    },
  ]
  columnsKey = [
    {
      name: "#",
      options: {
        filter: false,
        sort: false,
      }
    },
    
    {
      name: "ID",
      options: {
        filter: false,
        sort: false,
        display: "excluded"
      }
    },
    {
      name: "Từ khóa",
      options: {
        filter: false,
        sort: false,
        // sortDirection: 'asc',
      }
    },
    {
      name: "Lượt tìm kiếm",
      options: {
        filter: false,
        sort: false,
      }
    },
  ]

  optionsBook = {
    filterType: "dropdown",
    responsive: "scroll",
    download: true,
    print: false,
    selectableRows: false,
    textLabels: {
      body: {
        noMatch: "Xin vui lòng đợi trong giây lát...",
        toolTip: "Sort",
      },
      pagination: {
        next: "Next Page",
        previous: "Previous Page",
        rowsPerPage: "Rows per page:",
        displayRows: "of",
      },
      toolbar: {
        search: "Search",
        downloadCsv: "Download CSV",
        print: "Print",
        viewColumns: "View Columns",
        filterTable: "Filter Table",
      },
      filter: {
        all: "All",
        title: "FILTERS",
        reset: "RESET",
      },
      viewColumns: {
        title: "Show Columns",
        titleAria: "Show/Hide Table Columns",
      },
      selectedRows: {
        text: "rows(s) selected",
        delete: "Delete",
        deleteAria: "Delete Selected Rows",
      },
    },
    onRowClick: (rowData) => {
      // console.log(this.state.dob)

      this.setState({
        id: rowData[1],
        name: rowData[2],
        author: rowData[3],
        year: rowData[4],
        keyword: rowData[5],
        sumary: rowData[6],
        code1: rowData[7].trim(),
        code2: rowData[8].trim(),
        code3: rowData[9].trim(),
        uname: rowData[10],

        icon: "edit",
        isUpdate: true,
        checkValidate: true
      });
      this.toggleBook()
    }
  }
  optionsLuanVan = {
    filterType: "dropdown",
    responsive: "scroll",
    download: true,
    print: false,
    selectableRows: false,
    textLabels: {
      body: {
        noMatch: "Xin vui lòng đợi trong giây lát...",
        toolTip: "Sort",
      },
      pagination: {
        next: "Next Page",
        previous: "Previous Page",
        rowsPerPage: "Rows per page:",
        displayRows: "of",
      },
      toolbar: {
        search: "Search",
        downloadCsv: "Download CSV",
        print: "Print",
        viewColumns: "View Columns",
        filterTable: "Filter Table",
      },
      filter: {
        all: "All",
        title: "FILTERS",
        reset: "RESET",
      },
      viewColumns: {
        title: "Show Columns",
        titleAria: "Show/Hide Table Columns",
      },
      selectedRows: {
        text: "rows(s) selected",
        delete: "Delete",
        deleteAria: "Delete Selected Rows",
      },
    },
    onRowClick: (rowData) => {
      // console.log(this.state.dob)

      this.setState({
        id: rowData[1],
        name: rowData[2],
        author: rowData[3],
        year: rowData[4],
        describe: rowData[5],
        summary: rowData[6],
        code: rowData[7],
        uname: rowData[8],
        uauthor: rowData[9],
        udescribe: rowData[10],
        usummary: rowData[11],

        icon: "edit",
        isUpdate: true,
        checkValidate: true
      });
      this.toggleLuanVan()
    }
  }
  optionsLuanAn = {
    filterType: "dropdown",
    responsive: "scroll",
    download: true,
    print: false,
    selectableRows: false,
    textLabels: {
      body: {
        noMatch: "Xin vui lòng đợi trong giây lát...",
        toolTip: "Sort",
      },
      pagination: {
        next: "Next Page",
        previous: "Previous Page",
        rowsPerPage: "Rows per page:",
        displayRows: "of",
      },
      toolbar: {
        search: "Search",
        downloadCsv: "Download CSV",
        print: "Print",
        viewColumns: "View Columns",
        filterTable: "Filter Table",
      },
      filter: {
        all: "All",
        title: "FILTERS",
        reset: "RESET",
      },
      viewColumns: {
        title: "Show Columns",
        titleAria: "Show/Hide Table Columns",
      },
      selectedRows: {
        text: "rows(s) selected",
        delete: "Delete",
        deleteAria: "Delete Selected Rows",
      },
    },
    onRowClick: (rowData) => {
      // console.log(this.state.dob)

      this.setState({
        id: rowData[1],
        name: rowData[2],
        author: rowData[3],
        describe: rowData[4],
        summary: rowData[5],
        code: rowData[6].trim(),
        icon: "edit",
        isUpdate: true,
        checkValidate: true
      });
      this.toggleLuanAn()
    }
  }
  optionsKey = {
    filterType: "dropdown",
    responsive: "scroll",
    download: true,
    print: false,
    selectableRows: false,
    textLabels: {
      body: {
        noMatch: "Xin vui lòng đợi trong giây lát...",
        toolTip: "Sort",
      },
      pagination: {
        next: "Next Page",
        previous: "Previous Page",
        rowsPerPage: "Rows per page:",
        displayRows: "of",
      },
      toolbar: {
        search: "Search",
        downloadCsv: "Download CSV",
        print: "Print",
        viewColumns: "View Columns",
        filterTable: "Filter Table",
      },
      filter: {
        all: "All",
        title: "FILTERS",
        reset: "RESET",
      },
      viewColumns: {
        title: "Show Columns",
        titleAria: "Show/Hide Table Columns",
      },
      selectedRows: {
        text: "rows(s) selected",
        delete: "Delete",
        deleteAria: "Delete Selected Rows",
      },
    },
    onRowClick: (rowData) => {
      // console.log(this.state.dob)

      this.setState({
        id: rowData[1],
        name: rowData[2],
        kcount: rowData[3],
        icon: "edit",
        isUpdate: true,
        checkValidate: true
      });
      this.toggleKey()
    }
  }
  handleChangeTab = (event, value) => {
    this.setState({ value });
  };

  checkValidate() {

    return false;
  }
  handleChangeValue(e) {
    const { name, value } = e.target;
    e.target.className = "form-control"
    switch (name) {
      case "name":
        this.setState({ name: value })
        if (value.trim().length === 0) {
          this.setState({
            name: " ",
            errorName: "Name can not be blank"
          })
          e.target.className += " invalid"
        } else if (value.trim().length < 2) {
          this.setState({
            errorName: "Name contains more than 2 characters"
          })
          e.target.className += " invalid"
        } else {
          e.target.className += " valid"
        }
        break;

      case "author":
        this.setState({ author: value })
        if (value.trim().length > 0) {
          e.target.className += " valid"
        }
        break;
        case "code":
        this.setState({ code: value })
        if (value.trim().length > 0) {
          e.target.className += " valid"
        }
        break;
        case "kcount":
        this.setState({ kcount: value })
        if (value.trim().length > 0) {
          e.target.className += " valid"
        }
        break;
        case "summary":
        this.setState({ summary: value })
        if (value.trim().length > 0) {
          e.target.className += " valid"
        }
        break;
      case "year":
      this.setState({ year: value })
      if (value.trim().length > 0) {
        e.target.className += " valid"
      }
      break;
      
      case "describe":
      this.setState({ describe: value })
      if (value.trim().length > 0) {
        e.target.className += " valid"
      }
      break;
      case "keyword":
      this.setState({ keyword: value })
      if (value.trim().length > 0) {
        e.target.className += " valid"
      }
      break;
      case "sumary":
      this.setState({ sumary: value })
      if (value.trim().length > 0) {
        e.target.className += " valid"
      }
      break;
      case "code1":
        this.setState({ code1: value })
        if (value.trim().length > 0) {
          this.setState({
          })
          e.target.className += " valid"
        }
        break;
      case "code2":
        this.setState({ code2: value })
        if (value.trim().length > 0) {
          e.target.className += " valid"
        }
        break;
      case "code3":
        this.setState({ code3: value })
        if (value.trim().length > 0) {
          e.target.className += " valid"
        }
        break;
      default:
        break;
    }
 

  }


  handlerAddBook = () => {

    var moment = require('moment');
    const date = moment.utc(this.state.dob).format();
    const data = {
      "Name": this.state.name,
      "Author": this.state.author,
      "Year": this.state.year,
      "Keyword": this.state.keyword,
      "Sumary": this.state.sumary,
      "Code1": this.state.code1,
      "Code2": this.state.code2,
      "Code3": this.state.code3,
      "Uname": this.state.uname,
      "IsDeleted": "no",
    }
    fetch("http://localhost:8080/book",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(this.addNotification("successAdd"))
      .then(this.GetBookList())
    this.toggleBook()


  }


  handlerDeleteBook = () => {
    fetch("http://localhost:8080/book/" + this.state.id, {
      method: 'DELETE',
      mode: 'cors'
    })
      .then(this.addNotification("successDelete"))
      .then(this.GetBookList())
    this.toggleBook()


  }

  handlerEditBook = () => {
    var moment = require('moment');
    const date = moment.utc(this.state.dob).format();
    console.log("dt" + date);
    const data = {
      "Name": this.state.name,
      "Author": this.state.author,
      "Year": this.state.year,
      "Describe": this.state.describe,
      "Sumary": this.state.sumary,
      "Code1": this.state.code1,
      "Code2": this.state.code2,
      "Code3": this.state.code3,
      "Uname": this.state.uname,
      "IsDeleted": "no",
    }
    fetch("http://localhost:8080/booku/" + this.state.id, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(this.GetBookList())
      .then(this.addNotification("successUpdate"))


    this.toggleBook()
    
  }

  handlerAddLuanVan = () => {

    var moment = require('moment');
    const date = moment.utc(this.state.dob).format();
    const data = {
      "Name": this.state.name,
      "Author": this.state.author,
      "Year": this.state.year,
      "Describe": this.state.describe,
      "Summary": this.state.summary,
      "Code": this.state.code,
      "Uname": this.state.uname,
      "Uauthor": this.state.uauthor,
      "Udescribe": this.state.udescribe,
      "Usummary": this.state.usummary,

      "IsDeleted": "no",
    }
    fetch("http://localhost:8080/luanvan",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(this.addNotification("successAdd"))
      .then(this.GetLuanVanList())
    this.toggleLuanVan()


  }
  handlerAddKey = () => {
    const data = {
      "Key": this.state.name,
      "Kcount": parseInt(this.state.kcount),
    }
    fetch("http://localhost:8080/key",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(this.addNotification("successAdd"))
      .then(this.GetKeyList())
    this.toggleKey()


  }


  handlerDeleteKey = () => {
    fetch("http://localhost:8080/key/" + this.state.id, {
      method: 'DELETE',
      mode: 'cors'
    })
      .then(this.addNotification("successDelete"))
      .then(this.GetKeyList())
    this.toggleKey()


  }

  handlerEditKey = () => {
    const data = {
      "Key": this.state.name,
      "Kcount": parseInt(this.state.kcount),
    }
    fetch("http://localhost:8080/keyu/" + this.state.id, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(this.GetKeyList())
      .then(this.addNotification("successUpdate"))


    this.toggleKey()
    
  }

  handlerDeleteLuanVan = () => {
    fetch("http://localhost:8080/luanvan/" + this.state.id, {
      method: 'DELETE',
      mode: 'cors'
    })
      .then(this.addNotification("successDelete"))
      .then(this.GetLuanVanList())
    this.toggleLuanVan()


  }

  handlerEditLuanVan = () => {
    var moment = require('moment');
    const date = moment.utc(this.state.dob).format();
    console.log("dt" + date);
    const data = {
      "Name": this.state.name,
      "Author": this.state.author,
      "Year": this.state.year,
      "Describe": this.state.describe,
      "Summary": this.state.summary,
      "Code": this.state.code,
      "Uname": this.state.uname,
      "Uauthor": this.state.uauthor,
      "Udescribe": this.state.udescribe,
      "Usummary": this.state.usummary,
    }
    fetch("http://localhost:8080/luanvanu/" + this.state.id, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(this.GetLuanVanList())
      .then(this.addNotification("successUpdate"))


    this.toggleLuanVan()
    
  }
  handlerAddLuanAn = () => {

    var moment = require('moment');
    const date = moment.utc(this.state.dob).format();
    const data = {
      "Name": this.state.name,
      "Author": this.state.author,
      "Describe": this.state.describe,
      "Summary": this.state.summary,
      "Code": this.state.code,
      "IsDeleted": "no",
    }
    fetch("http://localhost:8080/luanan",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(this.addNotification("successAdd"))
      .then(this.GetLuanAnList())
    this.toggleLuanAn()


  }


  handlerDeleteLuanAn = () => {
    fetch("http://localhost:8080/luanan/" + this.state.id, {
      method: 'DELETE',
      mode: 'cors'
    })
      .then(this.addNotification("successDelete"))
      .then(this.GetLuanAnList())
    this.toggleLuanAn()


  }

  handlerEditLuanAn = () => {
    const data = {
      "Name": this.state.name,
      "Author": this.state.author,
      "Describe": this.state.describe,
      "Summary": this.state.summary,
      "Code": this.state.code,
      "IsDeleted": "no",
    }
    fetch("http://localhost:8080/luananu/" + this.state.id, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(this.GetLuanAnList())
      .then(this.addNotification("successUpdate"))


    this.toggleLuanAn()
    
  }



  render() {
    const { classes } = this.props;
    const { value } = this.state;
    this.state.bookList.map((value, key) => {
      return (<option key={key} value={value[1]}>{value[1]}</option>)
    })
    return (
      <React.Fragment>
        <ReactNotification ref={this.notificationDOMRef} />

        <Row>

          <Col md="12">
            <Card >
              <CardBody>
                <NoSsr>
                  <div className={classes.root}>
                    <AppBar position="static" className={classes.main}>
                      <Tabs fullWidth value={value} onChange={this.handleChangeTab}>
                        <LinkTab label="Sách" href="page1" />
                        <LinkTab label="Luận Văn" href="page2" />
                        <LinkTab label="Luận Án" href="page3" />
                        <LinkTab label="Từ khóa" href="page4" />
                      </Tabs>
                    </AppBar>
                  </div>
                </NoSsr>
                {value === 0 &&
                  <TabContainer>

                    <MDBBtn
                      className="mb-3 blue darken-2"
                      onClick={this.addBook}>
                      Thêm sách mới
                      </MDBBtn>

                    <hr></hr>
                    {/* <MUIDataTable
                      title={"Book List"}
                      data={this.state.bookList}
                      columns={this.columnsBook}
                      options={this.optionsBook} /> */}
                  </TabContainer>
                }
                {/* Luận văn */}
                {value === 1 &&
                  <TabContainer>
                    <MDBBtn
                      className="mb-3 blue darken-2"
                      onClick={this.addLuanVan}>
                      Thêm Luân Văn Mới
                      </MDBBtn>

                    <hr></hr>
                    <MUIDataTable
                      title={"Danh sách luận văn"}
                      data={this.state.luanvanList}
                      columns={this.columnsLuanVan}
                      options={this.optionsLuanVan} />
                  </TabContainer>
                }
                {/* Luận án */}
                {value === 2 &&
                  <TabContainer>
                    <MDBBtn
                      className="mb-3 blue darken-2"
                      onClick={this.addBook}>
                      Thêm Luận Án Mới
                      </MDBBtn>

                    <hr></hr>
                    <MUIDataTable
                      title={"Danh sách luận án"}
                      data={this.state.luananList}
                      columns={this.columnsLuanAn}
                      options={this.optionsLuanAn} />
                  </TabContainer>}
                {/* Từ khóa */}
                {value === 3 &&
                  <TabContainer>

                    <MDBBtn
                      className="mb-3 blue darken-2"
                      onClick={this.addKey}>
                      Thêm từ khóa mới
                      </MDBBtn>

                    <hr></hr>
                    <MUIDataTable
                      title={"Danh sách từ khóa"}
                      data={this.state.keyList}
                      columns={this.columnsKey}
                      options={this.optionsKey} />
                  </TabContainer>
                }
              </CardBody>
            </Card>
          </Col>

          {
            // Add, Edit Sách form
          }
          <MDBModal
            isOpen={this.state.modalBook}
            toggle={this.toggleBook}
            size="md"
            cascading>

            <MDBModalBody>
              <MDBInput label="Tên sách" name="name" value={this.state.name} onChange={this.handleChangeValue.bind(this)} />
              <MDBInput label="Thông tin phụ" name="author" value={this.state.author} onChange={this.handleChangeValue.bind(this)} />
              <MDBInput label="Năm" name="year" value={this.state.year} onChange={this.handleChangeValue.bind(this)} />
              <MDBInput label="Từ khóa" name="keyword" value={this.state.keyword} onChange={this.handleChangeValue.bind(this)} />
              <MDBInput label="Tóm tắt" name="sumary" value={this.state.sumary} onChange={this.handleChangeValue.bind(this)} />
              <MDBInput label="Mã 1" name="code1" value={this.state.code1} onChange={this.handleChangeValue.bind(this)} />
              <MDBInput label="Mã 2" name="code2" value={this.state.code2} onChange={this.handleChangeValue.bind(this)} />
              <MDBInput label="Mã 3" name="code3" value={this.state.code3} onChange={this.handleChangeValue.bind(this)} />

              <div className="text-center mt-1-half">
                {
                  (this.state.isUpdate === false) &&
                  <MDBBtn
                    className="mb-2 blue darken-2"
                    onClick={this.handlerAddBook}
                  >
                    Tạo mới
                  <MDBIcon icon="send" className="ml-1" />
                  </MDBBtn>
                }

                {
                  this.state.isUpdate &&
                  <MDBBtn
                    className="mb-2 blue darken-2"
                    onClick={this.handlerEditBook}>
                    Cập nhật thông tin
                  <MDBIcon icon="edit" className="ml-1" />
                  </MDBBtn>
                }
                {
                  this.state.isUpdate &&


                  <MDBBtn
                    className="mb-2 blue darken-2"
                    onClick={this.handlerDeleteBook}>
                    Xóa
                  <MDBIcon icon="trash" className="ml-1" />
                  </MDBBtn>
                }
              </div>
            </MDBModalBody>
          </MDBModal>
          {
            // Add, edit Luận Văn form
          }
          <MDBModal
            isOpen={this.state.modalLuanVan}
            toggle={this.toggleLuanVan}
            size="md"
            cascading>

            <MDBModalBody>
              <MDBInput label="Tên luận văn" name="name" value={this.state.name} onChange={this.handleChangeValue.bind(this)} />
              <MDBInput label="Thông tin phụ" name="author" value={this.state.author} onChange={this.handleChangeValue.bind(this)} />
              <MDBInput label="Năm" name="year" value={this.state.year} onChange={this.handleChangeValue.bind(this)} />
              <MDBInput label="Mô tả" name="describe" value={this.state.describe} onChange={this.handleChangeValue.bind(this)} />
              <MDBInput label="Tóm tắt" name="summary" value={this.state.summary} onChange={this.handleChangeValue.bind(this)} />
              <MDBInput label="Mã" name="code" value={this.state.code} onChange={this.handleChangeValue.bind(this)} />

              <div className="text-center mt-1-half">
                {
                  (this.state.isUpdate === false) &&

                  <MDBBtn
                    className="mb-2 blue darken-2"
                    onClick={this.handlerAddLuanVan}
                  >
                    Tạo mới
                  <MDBIcon icon="send" className="ml-1" />
                  </MDBBtn>
                }

                

                {
                  this.state.isUpdate &&
                  <MDBBtn
                    className="mb-2 blue darken-2"
                    onClick={this.handlerEditLuanVan}>
                    Cập nhật thông tin
                  <MDBIcon icon="edit" className="ml-1" />
                  </MDBBtn>
                }
                {
                  this.state.isUpdate &&


                  <MDBBtn
                    className="mb-2 blue darken-2"
                    onClick={this.handlerDeleteLuanVan}>
                    Xóa
                  <MDBIcon icon="trash" className="ml-1" />
                  </MDBBtn>
                }
              </div>
            </MDBModalBody>
          </MDBModal>
          { 
                // Add, edit Luận Án form
          }
          <MDBModal
            isOpen={this.state.modalLuanAn}
            toggle={this.toggleLuanAn}
            size="md"
            cascading>

            <MDBModalBody>
            <MDBInput label="Tên luận văn" name="name" value={this.state.name} onChange={this.handleChangeValue.bind(this)} />
              <MDBInput label="Thông tin phụ" name="author" value={this.state.author} onChange={this.handleChangeValue.bind(this)} />
              <MDBInput label="Mô tả" name="describe" value={this.state.describe} onChange={this.handleChangeValue.bind(this)} />
              <MDBInput label="Tóm tắt" name="summary" value={this.state.summary} onChange={this.handleChangeValue.bind(this)} />
              <MDBInput label="Mã" name="code" value={this.state.code} onChange={this.handleChangeValue.bind(this)} />

              <div className="text-center mt-1-half">
                {
                  (this.state.isUpdate === false) &&
                  
                  <MDBBtn
                    className="mb-2 blue darken-2"
                    onClick={this.handlerAddLuanAn}
                  >
                    Tạo mới
                  <MDBIcon icon="send" className="ml-1" />
                  </MDBBtn>
                }

                {
                  this.state.isUpdate &&
                  <MDBBtn
                    className="mb-2 blue darken-2"
                    onClick={this.handlerEditLuanAn}>
                    Cập nhật thông tin
                  <MDBIcon icon="edit" className="ml-1" />
                  </MDBBtn>
                }
                {
                  this.state.isUpdate &&


                  <MDBBtn
                    className="mb-2 blue darken-2"
                    onClick={this.handlerDeleteLuanAn}>
                    Xóa
                  <MDBIcon icon="trash" className="ml-1" />
                  </MDBBtn>
                }
              </div>
            </MDBModalBody>
          </MDBModal>
          {
          // Add, edit Từ khóa form
          }
          <MDBModal
            isOpen={this.state.modalKey}
            toggle={this.toggleKey}
            size="md"
            cascading>

            <MDBModalBody>
            <MDBInput label="Từ khóa" name="name" value={this.state.name} onChange={this.handleChangeValue.bind(this)} />
              <MDBInput label="Số lần tìm kiếm" name="kcount" value={this.state.kcount} onChange={this.handleChangeValue.bind(this)} />
             
              <div className="text-center mt-1-half">
                {
                  (this.state.isUpdate === false) &&
                  
                  <MDBBtn
                    className="mb-2 blue darken-2"
                    onClick={this.handlerAddKey}
                  >
                    Tạo mới
                  <MDBIcon icon="send" className="ml-1" />
                  </MDBBtn>
                }

                {
                  this.state.isUpdate &&
                  <MDBBtn
                    className="mb-2 blue darken-2"
                    onClick={this.handlerEditKey}>
                    Cập nhật thông tin
                  <MDBIcon icon="edit" className="ml-1" />
                  </MDBBtn>
                }
                {
                  this.state.isUpdate &&


                  <MDBBtn
                    className="mb-2 blue darken-2"
                    onClick={this.handlerDeleteKey}>
                    Xóa
                  <MDBIcon icon="trash" className="ml-1" />
                  </MDBBtn>
                }
              </div>
            </MDBModalBody>
          </MDBModal>


        </Row>
        


      </React.Fragment>

    )

  }
}
export default withStyles(styles)(BookPage);