import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './styles.css';

export default class Advert extends Component {

    constructor() {
        super();

        this.state = {
            data: [],
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.getItems = this.getItems.bind(this);
    }

    componentDidMount() {
        this.getItems();
    }

    getItems() {
        fetch('/getAllItems')
        .then(response => response.json())
        .then(
            data => this.setState({
            data: data
        }))
    }

    deleteItem(id, index) {

        let postHeaders = new Headers();
        postHeaders.append("Content-Type", "application/json");

        fetch('/delete', {
            method: 'POST',
            body: JSON.stringify({id: id}),
            headers: postHeaders,
        })
        .then(
            response => {
                if (response.status == 200) { alert('удалено') }
            }
        )
        this.getItems();
    } 

    render() {
        return (
            <div>
                <div>
                    <h1>Список объявлений</h1>
                    <div>
                        <Link to='/new_advert'>Создать новое объявление</Link>
                    </div>
                </div>
                <div className='list'>
                    {
                        this.state.data.length == 0 ?
                            <div className='noAdverts'>Объявлений нет</div>
                            :
                            null
                    } 
                    {
                        this.state.data.map(
                            (item, index) => {
                                return <div key={item._id} className='list--item'> 
                                        <Link className='item' to={`/adverts/${item._id}`}>
                                            <div>{item.title}</div>
                                        </Link>
                                        <div onClick={() => this.deleteItem(item._id)} className='delete'>X</div>
                                    </div>
                            }
                        )
                    }
                </div>
            </div>
        )
    }
}
