import React, { Component } from "react";
import axios from "axios";

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: "The Products are",
            term: "",
            data: []
        };
    }

    componentDidMount() {
        this.searchItemsInDB();
    }

    // handleInputChange (event) {
    //     this.setState({ term: event.target.value });
    // };

    searchForTerm (event){
        event.preventDefault();
        this.searchItemsInDB();
    };

    searchItemsInDB() {
        const data = {
            params: {
              term: this.state.term
            }
          };
        axios.get("/api/get/allproducts", data)
            .then(response => {
                this.showProducts(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    showProducts(data) {
        this.setState({
            data: data
        });
        console.log(data);
    };

    render() {
        return (
            <div className="container">
                <div className="col-sm-8 mt-4 offset-2">
                    <form>
                        <div className="form-group">
                            <input
                                type="text"
                                onChange={this.handleInputChange}
                                className="form-control"
                                placeholder="Search"
                            />
                        </div>

                        <button className="btn btn-primary" type="submit">
                            Search Now
            </button>
                    </form>

                    <p>{this.state.query}</p>
                    <table className="table" style={{ textAlign: "center" }}>
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((rowData, index) => (
                                <tr key={index}>
                                    <td>{rowData.ProductID}</td>
                                    <td>{rowData.Title}</td>
                                    <td>{rowData.Quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default Search;