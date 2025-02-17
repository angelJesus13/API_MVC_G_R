import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://Dev-Angel:lucme123@clusterluvmee.fw2f7.mongodb.net/new_groceries_db?retryWrites=true&w=majority&appName=ClusterLuvmee')
.then(
    (db)=>console.log('Mongodb atlas connected')
)

.catch(
    (error)=>console.error(error)
)

export default mongoose;