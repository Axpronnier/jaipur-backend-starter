// Listen to POST /games
router.post("/", function (req, res) {
    if (!req.body.name) {
      return res.status(400).send("Missing name parameter")
    }
    const newGame = gameService.createGame(req.body.name)
    res.status(201).json(newGame)
  })