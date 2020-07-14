class Api {
    constructor(options) {
        this.options = options;
    }

    getInitialCards() {
       return fetch(`${this.options.baseUrl}/cards`, {
           headers: this.options.headers                 
       })
    }

    getUserInfo() {
        return fetch(`${this.options.baseUrl}/users/me`, {         
            headers: this.options.headers
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
    }
}