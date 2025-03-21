import express from 'express'

import moviesRouter from "./MoviesApp/moviesRouter"
import genresRouter from "./GenresApp/genresRouter"
import personRouter from "./PersonsApp/personsRouter"
import userRouter from "./UserApp/userRouter"

const cors = require("cors")

const app = express()
const HOST = 'localhost'
const PORT = 8000

app.use(cors())
app.use(express.json())


app.use("/api", moviesRouter)
app.use('/api', genresRouter)
app.use("/api", personRouter)
app.use("/api", userRouter)

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});
