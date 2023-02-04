import { pool } from "../db.js"

export const getEmployees = async (req,res) => {
    //res.send('Getting employees')
   try {
        const [rows] = await pool.query('SELECT * FROM employees')
        res.json(rows)
   } catch (error) {
        res.status(500).json({
            message:'Something goes grong'
        }) 
   }
}

export const getEmployeeByID = async (req,res) => {
    //res.send('Getting employee by ID')
    try {
        const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [req.params.id])
        if (rows.length <= 0 ) return res.status(404).json ({
            message: 'Employee not found'
        })
    res.json(rows)
    } catch (error) {
        res.status(500).json({
            message:'Something goes grong'
        }) 
    }
}

export const postEmployees = async (req,res) => {
    //res.send('Creating employees')
    try {
        const {name, salary} = req.body
        const [rows] = await pool.query('INSERT INTO employees (name, salary) VALUES (?, ?)', [name, salary])
        res.send({
            id: rows.insertId,
            name,
            salary
        })
    } catch (error) {
        res.status(500).json({
            message:'Something goes grong'
        }) 
    }
}

export const putEmployees = async (req,res) => {
    //res.send('Updating employees')
    try {
        const {id} = req.params
        const {name, salary} = req.body
        const [result] = await pool.query('UPDATE employees SET name = IFNULL(?,name), salary = IFNULL(?, salary)  WHERE id = ?', [name, salary, id])
        if (result.affectedRows == 0 ) return res.status(404).json ({
            message: 'Employee not found'
        })
        const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [req.params.id])
        //res.json('The data has been update')
        res.json(rows[0])
    } catch (error) {
        res.status(500).json({
            message:'Something goes grong'
        }) 
    }
}

export const deleteEmployees = async (req,res) => {
    //res.send('Deleting employees')
    try {
        const [rows] = await pool.query('DELETE FROM employees WHERE id = ?', [req.params.id])
        if (rows.affectedRows <= 0 ) return res.status(404).json ({
            message: 'Employee not found'
        })
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({
            message:'Something goes grong'
        }) 
    }
}
