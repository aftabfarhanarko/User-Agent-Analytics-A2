const events = [
  {
    id: 1,
    name: "Tech Conference",
    date: "2026-11-15",
    location: "Dhaka",
  },
  {
    id: 2,
    name: "Web Development Workshop",
    date: "2026-11-20",
    location: "Rajshahi",
  },
  {
    id: 3,
    name: "Backend Developer Meetup",
    date: "2026-11-25",
    location: "Dhaka",
  },
  {
    id: 4,
    name: "JavaScript Bootcamp",
    date: "2026-11-28",
    location: "Chattogram",
  },
  {
    id: 5,
    name: "Node.js Workshop",
    date: "2026-12-01",
    location: "Dhaka",
  },
  {
    id: 6,
    name: "React Developer Conference",
    date: "2026-12-05",
    location: "Sylhet",
  },
  {
    id: 7,
    name: "TypeScript Meetup",
    date: "2026-12-08",
    location: "Dhaka",
  },
  {
    id: 8,
    name: "NestJS Training",
    date: "2026-12-10",
    location: "Rajshahi",
  },
  {
    id: 9,
    name: "Database Design Seminar",
    date: "2026-12-12",
    location: "Khulna",
  },
  {
    id: 10,
    name: "API Development Workshop",
    date: "2026-12-15",
    location: "Dhaka",
  },
  {
    id: 11,
    name: "Go Programming Meetup",
    date: "2026-12-18",
    location: "Chattogram",
  },
  {
    id: 12,
    name: "Software Engineering Summit",
    date: "2026-12-20",
    location: "Dhaka",
  },
  {
    id: 13,
    name: "Cyber Security Conference",
    date: "2026-12-22",
    location: "Sylhet",
  },
  {
    id: 14,
    name: "Cloud Computing Workshop",
    date: "2026-12-25",
    location: "Rajshahi",
  },
  {
    id: 15,
    name: "System Design Meetup",
    date: "2026-12-28",
    location: "Dhaka",
  },
];


//Get AllUser 
const getAllEvent = (req,res )  =>{
    res.json(events);
}

const singelEvent = (req,res) => {
    const id = Number(req.params.id);
    const eventFind = events.find((e)=> e.id  === id);

    if(!eventFind){
        res.send("Event Not Found !!!");
    }

    res.send(eventFind);
    console.log(eventFind);
    
}


module.exports = {
    getAllEvent,
    singelEvent
}