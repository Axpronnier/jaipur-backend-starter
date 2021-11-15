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

router.get("/", function (req,res) {
  const parties = databaseService.getGames()
  res.status(200).json(parties)
})

router.get("/:id", function(req,res) {
  const parties = databaseService.getGames()
  if (!parties.find((partie) => partie.id === Number.parseInt(req.params.id)))
  {
    return res.status(404).send("Game not found")
  }
  const infos = parties.find((partie) => partie.id === Number.parseInt(req.params.id))
  res.status(200).json(infos)
})

router.delete("/:id", (req, res) => {
  try {
      deleteGame(parseInt(req.params.id))
      res.status(200).send("OK")
  } catch (e) {
      res.status(404).send("Not found")
  }
})
export default router
