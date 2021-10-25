import express from "express"
import * as gameService from "../services/gameService"
import * as databaseService from "../services/databaseService"

const router = express.Router()

// Listen to POST /games
router.post("/", function (req, res) {
  if (!req.body.name) {
    return res.status(400).send("Missing name parameter")
  }
  const newGame = gameService.createGame(req.body.name)
  res.status(201).json(newGame)
})
export default router

router.put("/:id/take-good", function (req, res) {
  if (!req.params.id || !req.header("playerIndex") || !req.body.good) {
    return res.status(400).send("Missing parameters")
  }

  if (req.body.good === "camel") {
    return res.status(401).send("Can't take camel")
  }

  const game = databaseService
    .getGames()
    .find((g) => g.id === Number.parseInt(req.params.id))

  if (!game) {
    return res.status(404).send("Game not found")
  }

  console.log(
    Number.parseInt(req.header("playerIndex")),
    game.currentPlayerIndex
  )
  if (Number.parseInt(req.header("playerIndex")) !== game.currentPlayerIndex) {
    return res.status(401).send("Not this player turn")
  }

  const code = gameService.takeGood(game, req.body.good)

  if (code === 1) {
    return res.status(401).send("Ressource not in the market")
  }

  if (code === 2) {
    return res.status(401).send("Hand already full")
  }

  return res.status(200).send(game)
})
