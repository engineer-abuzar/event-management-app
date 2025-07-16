import connection from "../db.js";

const registerEvent = async (req, res) => {
    try {
        const { name, email, event_id } = req.body;
        const TodayDate = new Date()
        const isUserRegistered = (await connection.query(`select * from users where email='${email}'`)).rows
        const { capacity, registrations, date_time } = (await connection.query(`select capacity,registrations,date_time from events where id=${event_id}`)).rows[0]

        // console.log(date_time>=TodayDate&&date_time.getTime()>TodayDate.getTime())
        //checking for user existance
        if (isUserRegistered.length === 0) {
            //checking registration is full or not
            if (capacity > registrations) {
                //check event date and time
                if (TodayDate <= date_time && TodayDate.getTime() < date_time.getTime()) {

                    //creating user in db
                    await connection.query(`insert into users (name,email,event_id)values('${name}','${email}',${event_id})`)

                    //updating events table
                    await connection.query(`UPDATE events
SET registrations = sub.count
FROM (
  SELECT event_id, COUNT(*) AS count
  FROM users
  GROUP BY event_id
) AS sub
WHERE events.id = sub.event_id;`)
                    res.status(203).send(`User created successfully`)

                } else {
                    res.status(203).send("Registration closed ")

                }


            } else {
                res.status(203).send("Event is full (Registration Failed)")

            }

        } else {
            res.status(203).send("User Already exist")
        }
    } catch (err) {

        res.status(400).send(`Register event faild with error ${err}`)
    }
}

const cancelRegistration = async (req, res) => {
    try {
        const { email } = req.body;
        const Result = await connection.query(`delete from users where email='${email}'`)


        if (Result.rowCount == 0)
            res.status(404).send("User not registerd")
        else {
            //updating events table
            await connection.query(`UPDATE events
SET registrations = sub.count
FROM (
  SELECT event_id, COUNT(*) AS count
  FROM users
  GROUP BY event_id
) AS sub
WHERE events.id = sub.event_id;`)
            res.status(200).send("Registration cancelled")

        }

    } catch (err) {
        res.status(404).send(`Error in Cancel registration ${err}`)
    }
}

export { registerEvent, cancelRegistration }