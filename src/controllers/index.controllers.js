import {pool} from '../db.js'

export const database = async(req,res) => {
    const result =  await pool.query('SELECT "DATABASE IS CONECTED" AS RESULT')
    res.json(result[0])
}