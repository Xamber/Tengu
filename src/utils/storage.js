export class Storage {
    constructor(version = "v1") {
        this.prefix = `${version}:`
        this.database = window.localStorage
    
        this.addhistory = (_id) => {
            let key = `${this.prefix}history:${_id}`
            let value = this.getHistory(_id)
            this.database.setItem(key, value + 1)
        }

        this.getHistory = (_id) => {
            let key = `${this.prefix}history:${_id}`
            let value = this.database.getItem(key)
            value = (value === null) ? 0 : parseInt(value, 10)
            return value
        }

        this.setAsKnown = (_id) => {
            let key = `${this.prefix}known:${_id}`
            this.database.setItem(key, "known")
        }

        this.getKnown = (_id) => {
            let key = `${this.prefix}known:${_id}`
            let value = this.database.getItem(key) === "known"
            return value ? "Yes" : "No"
        }
    }
}