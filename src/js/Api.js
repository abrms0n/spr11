export class Api {
    constructor(options) {
        this.options = options;
    }
   
    getInitialCards() {
       return fetch(`${this.options.baseUrl}/cards`, {
           headers: this.options.headers                 
       })
       .then(res => {
        if (!res.ok) {
            return Promise.reject(`Ошибочка вышла: ${res.status}`);
        } else {
            return res.json()
        }
      }) 
    }

    getUserInfo() {
        return fetch(`${this.options.baseUrl}/users/me`, {         
            headers: this.options.headers
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Ошибочка вышла: ${res.status}`);
            } else {
                return res.json()
            }
          })   
    }

    updateUserInfo(newName, newJob) {                                          
      return fetch(`${this.options.baseUrl}/users/me`, {                            
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
                name: newName,
                about: newJob
            })
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Ошибочка вышла: ${res.status}`);
            } else {
                return res.json()
            }
          }) 
    }
}