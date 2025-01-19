exports.register = async(req, res) => {
    //code
    try{
        const { email, password } = req.body
        //step validation
        if(!email) {
            return res.status(400).json({ message: "Please fill email" })
        }
        if(!password){
            return res.status(400).json({ message: "Please fill password" })
        }

        //step2 db already?


        console.log(email, password)
        res.send('hello Register controller')

    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}

exports.login = async(req, res) => {
    try{
        res.send('hello login controller')

    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }

}

exports.currentUser = async(req, res) => {
    try{
        res.send('hello  currentUser controller')

    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}
