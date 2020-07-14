export class Api {
    constructor(options) {
        this.options = options;
    }

    /* REVIEW: Надо исправить:                      OK
    
    Структура методов класса Api должна быть следующей:

    methodApi = (...) => {
        return fetch(`...`, {
        ...
        })
        .then(res => {
            if (!res.ok) {
            return Promise.reject(res.status);
            } else {
            return res.json();
            }
        })
    }

    Также должна присутствовать обработка ошибок с помощью .catch, если промис завершается с ошибкой, то управление переходит в
    ближайший обработчик ошибок. .catch должен находится в самом конец цепочки (за пределы класса Api) - сейчас это сделано корректно.
    Однако структуру методов нужно исправить по примеру выше.

    После того как это будет реализоавно, лучше всего будет вынести повторяющийся код разбора ответа в отдельный метод класса и 
    переиспользовать для всех запросов к API 
    */
   
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