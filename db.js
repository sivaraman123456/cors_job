import pg from "pg"
export const pool=new pg.Pool(
    {
    user:"postgres",
    password:"root",
    host:"localhost",
    port:5432,
    database:"User"
});
