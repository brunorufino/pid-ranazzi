const mysql = require('mysql2/promise')

class DataBase{
    constructor(){
        this.pool=mysql.createPool({
            host:'roundhouse.proxy.rlwy.net',
            user:'root',
            password:'a6A2edeeB64gCGA-Fh5A1-db1a12bc64',
            database:'railway',
            port:39895
        })
    }

    async ExecutaComando(sql, params=[]){
        const connection = await this.pool.getConnection();
        try {
            const [rows] = await connection.query(sql,params);
            return rows;
        
        } finally{
            connection.release();
        }
    }

    async ExecutaComandoNonQuery(sql,params=[]){
        const connection = await this.pool.getConnection();
        try {
            const [results] = await connection.query(sql,params);
            return  results.affectedRows;
        } finally{
            connection.release();
        }
    }
}

module.exports=DataBase