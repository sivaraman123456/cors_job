import { scheduleJob} from "node-schedule"
import csv from "csv-parser"

import path from 'path'
import cron from 'node-cron';
const __dirname=path.resolve()
import fs from 'fs';
import csv1 from 'fast-csv';
import {pool} from './db.js';



const main = async () => {
      await pool.connect();
        const dataArray = [];
      const stream = fs.createReadStream('data.csv');
      const csvStream = csv1.parse({ headers: true })
      
          .on('data', async (row) => {
              if (row) {
                  dataArray.push(row);
              }
          })
          .on('end', async () => {
              const promises = dataArray.map(async (row) => {
                  console.log(row);
                  const data = await pool.query("SELECT * FROM personal WHERE email=$1", [row.email]);
                  if (data) {
                      await pool.query('INSERT INTO personal (name, email, password) VALUES ($1, $2, $3)', [row.name, row.email, row.password]);
                      console.log("Data inserted successfully!");
                  } else {
                      console.log("User already exists.");
                  }
              });
  
              // Await all promises to finish
              await Promise.all(promises);
          })
stream.pipe(csvStream);
}
const task = () => {
      console.log('Hello, world!');
  };


  

cron.schedule('1 * * * * *', main);

console.log('Cron job scheduled to run every minute.');
// main();
// const date=new Date(2024,5,7,4,46,30)
// console.log("loggg");
// const job=scheduleJob("* * * * * ",()=>{
//     console.log("running successfully..",date);
// })


// Define your task


// Schedule the task to run every minute


 //Reading CSV file
const results =[];
// fs.createReadStream("data.csv")
// .pipe(csv())
// .on("data",data=>{
//     results.push(data)
// })
// .on("end",()=>{
//     console.log("csv file successfuly processes");
//     console.log(results);
// //Writing csv file
// const csvWriter=createObjectCsvWriter({
//     path:"output.csv",
//     header:[
//         {id:"name",title:"Name"},
//         {id:"email",title:"Email"},
//         {id:"age",title:"Age"}
// ]
// })
// console.log(csvWriter);
// csvWriter.writeRecords(results).then(()=>{
//     console.log("The CSV file was written successfully");
// })
// })
// const fileopen=()=>{
//     try {
//         const data=fs.readFile(path.join(__dirname,'data.csv'),'utf-8')
//         console.log(data);
//     } catch (err) {
//         console.log(err);
//     }}
// fileopen();