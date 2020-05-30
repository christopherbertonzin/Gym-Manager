module.exports = {
    age: function(timestamp){
        const today = new Date()
        const birthDay = new Date(timestamp)

        const age = today.getFullYear() - birthDay.getFullYear()
        const month = today.getMonth - birthDay.getMonth()

        if ( month < 0 || month == 0  && today.Date() < birthDay.Date())
            return age - 1

        return age
    },
    date: function(timestamp) {
        const date = new Date(timestamp)  
        const day = `0${date.getUTCDay()}`.slice(-2)
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const year = date.getUTCFullYear()
        
        return {
            day,
            month,
            year,
            birthDay: `${day}/${month}`,
            iso: `${year}-${month}-${day}`
        }    
    }
}
