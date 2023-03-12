import conn from './db'

//import conn from './db'
//const rows = await pool.query('SELECT * FROM users WHERE id = $1', [1])
//console.log('user:', rows)

const execute = async (query) => {
   try {
      await conn.connect() // gets connection
      await conn.query(query) // sends queries
      return true
   } catch (error) {
      console.error(error.stack)
      return false
   } finally {
      await conn.end() // closes connection
   }
}

const text = `
    CREATE TABLE IF NOT EXISTS "users" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
	    "role" VARCHAR(15) NOT NULL,
	    PRIMARY KEY ("id")
    );`

export const dale = () =>
   execute(text).then((result) => {
      if (result) {
         console.log('Table created')
      }
   })
