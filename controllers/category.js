exports.create = async(req, res) => {
    try{
        res.send('hello category controller')
    } catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }

}
exports.list = async(req, res) => {
    try{
        res.send('hello category list controller')
    } catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }

}
exports.remove = async(req, res) => {
    try{
        const { id } = req.params
        console.log(id)
        res.send('hello category remove controller')
    } catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }

}