const router = require('express').Router();
const Artist = require("../../models/Artist");
const Calendar = require("../../models/Calendar");
const Portfolio = require("../../models/Portfolio");


 router.get('/', (req, res, next) => {
  Artist.find()
  .then(artists => {
    res.status(200).json(artists)
  })
  .catch(error => {
    res.status(500).json({message: 'Something went wrong'})
  })
}) 


router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Artist.findById(id)
  .populate("calendar")
  .populate("portfolio")
  .then(artist => {
    res.status(200).json(artist)
  })
  .catch(error => console.log(error))
})


router.post('/:calendarId', (req, res, next) => {
  const { calendarId } = req.params;
  const {eventId} = req.body;
  console.log(eventId)
  Calendar.findByIdAndUpdate(calendarId,{ $pull: {events: {id: eventId}}}, {new: true})
  .then(calendar => {
    res.status(200).json(calendar)
  })
  .catch(error => console.log(error))
})

module.exports = router;