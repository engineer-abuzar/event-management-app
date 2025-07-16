import { log } from "console";
import connection from "../db.js";
import { type } from "os";

const createEvent = async (req, res) => {
    const { title, date, location, capacity } = req.body;
    try {
        const insert = `insert into events (title,date_time,location,capacity) values($1,$2,$3,$4) RETURNING *`;
        const values = [title, date, location, capacity];
        const result = await connection.query(insert, values)

        console.log(result.rows[0].id);


        res.status(201).send(`Event Created Succesfuly With ID :${result.rows[0].id} `)


    } catch (error) {
        res.status(400).send("Event creation failed")

        console.error("Query error :", error);

    }
}

const eventDetails = async (req, res) => {
    try {
        const events = (await connection.query(`select * from events`)).rows
        const users = (await connection.query(`select * from users`)).rows
        res.status(200).send({ totalEvents: events, totalUsers: users })

    } catch (err) {
        res.status(404).send(`Error in getting Events Details : ${err}`)
    }
}

const eventStats = async (req, res) => {
    try {
        const { event_id } = req.body
        const { registrations, capacity, } = (await connection.query(`select * from events where id='${event_id}'`)).rows[0]
        const capacityUsed = (registrations / capacity) * 100
        res.status(200).send({
            totalRegistration: registrations,
            remainingCapacity: capacity - registrations,
            totalCapacityUsed: capacityUsed
        })

    } catch (err) {
        res.status(404).send("Event not exist")
    }
}

const upcomingEvents = async (req, res) => {
    try {
        const todayDate = new Date();
        const result = (await connection.query(`select * from events where date_time>=NOW()`)).rows
        let sortedEvents = result

        //sorting by Date
        for (let i = 0; i < sortedEvents.length; i++) {
            for (let j = i; j < sortedEvents.length; j++) {
                if (sortedEvents[i].date_time > sortedEvents[j].date_time) {
                    let t = sortedEvents[i]
                    sortedEvents[i] = sortedEvents[j]
                    sortedEvents[j] = t
                }
            }
        }

        //sorting by Alphabet
        for (let i = 0; i < sortedEvents.length-1 ; i++) {
            
            if (new Date(sortedEvents[i].date_time).getTime() === new Date(sortedEvents[i+1].date_time).getTime()) {
                    let t=sortedEvents[i]
                    sortedEvents[i] = sortedEvents[i + 1];
                    sortedEvents[i + 1] = t;
            }
        }

        res.status(200).send({ sortedEvents })
    } catch (err) {
        console.error(err)
        res.status(404).send(err)
    }
}
export { createEvent, eventDetails, eventStats, upcomingEvents };  