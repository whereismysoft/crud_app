import React, { Component } from 'react';

import { Link } from "react-router-dom";

export default class NewAdvert extends Component {
    constructor() {
        super();

        this.state={
            title: '',
            description: '',
            phoneNumber: ''
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.postData = this.postData.bind(this);
    }

    onInputChange(e, inputType, maxLength) {
        if (maxLength && e.target.value.length <= maxLength) {
            return this.setState({
                [inputType]: e.target.value
            })
        } else {
            return alert(`Колличество символов данного поля не может быть больше ${maxLength} единиц`)
        }

        this.setState({
            [inputType]: e.target.value
        })
    }

    postData(data) {

        let postHeaders = new Headers();
        postHeaders.append("Content-Type", "application/json");
        
        fetch('/addItem', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: postHeaders,
        })
        .then(
            response => {
                if (response.status == 200) {
                    alert('успешно отправлено');
                    this.setState({
                        title: '',
                        description: '',
                        phoneNumber: ''
                    })
                }
            })
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <div>
                            <h1>Создайте новое объявление</h1>
                        </div>
                        <div>
                            <Link to='/adverts'>Все объявления</Link>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span>Название</span>
                        </div>
                        <input 
                            onChange={(e) => this.onInputChange(e, 'title', 100)} 
                            type='text' 
                            value={this.state.title}
                            required
                        />
                    </div>
                    <div>
                        <div>
                            <span>Описание</span>
                        </div>
                        <div>
                            <input 
                                onChange={(e) => this.onInputChange(e, 'description', 300)} 
                                type='text' 
                                value={this.state.description}
                            />
                        </div>                    
                    </div>
                    <div>
                        <div> 
                            <span>Номер телефона</span>
                        </div>
                        <div>
                            <input 
                                onChange={(e) => this.onInputChange(e, 'phoneNumber', 12)}
                                type='text' 
                                value={this.state.phoneNumber}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <button 
                        onClick={() => this.postData({
                            title: this.state.title,
                            description: this.state.description,
                            phoneNumber: this.state.phoneNumber
                        })}
                        disabled={this.state.phoneNumber && this.state.title ? false : true}
                    >
                        Создать объявление
                    </button>
                </div>
            </div>
        )
    }
}
