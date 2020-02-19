import React from 'react';
import axios from 'axios';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVisibility: false,
      autoFills: [],
      matchingFillsIndex: [],
      matchingFillsFormatted: []
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

// on mount, get all the potential autofills
  componentDidMount() {
    // axios
    //   .get('http://localhost:3001/api')
    //   // .get('/api')
    //   .then(autoFills => {
    //     this.setState({
    //       autoFills: autoFills.data
    //     });
    //   })
    //   .catch(err => console.error(err));
  }

  onBlurHandler() {
    this.setState({
      searchVisibility: false
    });
  }

  onFocusHandler() {
    this.setState({
      searchVisibility: true
    });
  }

  // on change of the search field
  // filter the autoFill list for anything that contains the substring
  onChangeHandler(e) {
    const searchTerm = e.target.value.toString();
    // if (searchTerm === '') {
    //   this.setState({
    //     matchingFillsIndex: [],
    //     matchingFillsFormatted: [],
    //     searchVisibility: false
    //   });
    //   return;
    // }
    var check = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
    if(!searchTerm.match(check)){
      console.log('hi')
      return;
    }
    console.log(searchTerm)
    axios.post('http://localhost:3001/api', { "term": searchTerm } )
    .then(data => {
      var results = [];
      var products = [];
      data.data.forEach(product => {
        products.push(product.productname)

      })
      var sortedData = products.sort();
      console.log(sortedData)
      sortedData.map(item => {results.push(`<span class="AJautofillhighlight">${item}</span>`)})
      if(searchTerm === "") {
        results = []
      }
      this.setState({
        matchingFillsFormatted:results
      })
    })

    // let regexString = '';

    // this loop builds a regEx expression that ignores whitespace between all characters
    // \s* is a regex term that ignores whitespace, use a \\ to escape the second slash because strings
    // for (var i = 0; i < searchTerm.length; i++) {
    //   regexString += '\\s*' + searchTerm[i];
    // }
    // // add a regex value for spaces after as well
    // regexString += '\\s*';

    // create a regexQuery object to feed into the string
    // let regexQuery = new RegExp(regexString);
    // let matchingFillsIndex = [];
    // let matchingFillsFormatted = [];

    // this.state.autoFills.forEach((autoFillItem, index) => {
    //   let autoFillTerm = autoFillItem.name;
    //   // search within the all the autofill options
    //   let indexOfSearchStart = autoFillTerm.search(regexQuery);

    //   // the case where we do find the searchterm
    //   if (indexOfSearchStart !== -1) {
    //     matchingFillsIndex.push(index);
    //     let indexOfSearchEnd = this.findEndIndexIgnoreSpaces(searchTerm, autoFillTerm, indexOfSearchStart);

    //     // now we need to add spans before and after the search term
    //     let returnValue = autoFillTerm;
    //     returnValue = this.stringSpliceAdd(returnValue, indexOfSearchEnd + 1, '</span>');
    //     returnValue = this.stringSpliceAdd(returnValue, indexOfSearchStart, '<span class="AJautofillhighlight">');

    //     matchingFillsFormatted.push(returnValue);

    //   }
    // }
    // );

    // this.setState({
    //   // matchingFillsIndex,
    //   matchingFillsFormatted,
    //   searchVisibility: true
    // });
  }

  /*
    search term is the string that we're looking for
    searchIn is the string we're searching within
    startingIndex is the index where we know the searchTerm starts
    
    We're looking for the ending index of the searchTerm within searchIn
      ignoring all whitespaces inbetween each letter of the searchTerm

    return: the index of the last space
  */
  findEndIndexIgnoreSpaces(searchTerm, searchIn, startingIndex) {
    for (var i = startingIndex, j = 0; i < searchIn.length; i++) {
      // check to see if the current letter within the search term equals the letter in the search term
      if (searchIn[i] === searchTerm[j]) {
        j++;
        // if J is now equal to the length of the searchTerm, then 
        if (j === searchTerm.length) {
          return i;
        }
      }
    }

    return -1;
  }

  // str is the string to operate on
  // index is where to add the string
  // add is the string to add
  stringSpliceAdd(str, index, add) {
    return str.slice(0, index) + add + str.slice(index, str.length);
  }

  render() {
    return (
      <div className="AJsearchwrapper" onFocus={this.onFocusHandler} onBlur={this.onBlurHandler}>
        <form onSubmit={(e) => e.preventDefault()}>
          <input id="AJsearchbox" placeholder="Search for great gear & clothing" onChange={this.onChangeHandler}></input>
          <button id="AJsearchbutton">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.707 19.294a1 1 0 01-1.414 1.414l-4.244-4.245a7.5 7.5 0 111.414-1.414l4.244 4.245zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"/>
            </svg>
          </button>
          {(this.state.searchVisibility ? 
          <div className="AJautofillmodal">
            <ul className="AJautofilllist">
            {
              this.state.matchingFillsFormatted.map((item, index) => {
                if (index < 10) {
                  return <li className="AJautofillitems" dangerouslySetInnerHTML={{__html: item}}></li>;
                }
              })
            }
            </ul>
          </div>
          : null)}
        </form>
      </div>
    );
  }
}

export default SearchBar;
