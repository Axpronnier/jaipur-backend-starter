import * as gameService from "./gameService"

describe("Game service", () => {
  test("should init a deck", () => {
    const defaultDeck = gameService.initDeck()
    expect(defaultDeck.length).toBe(52)
    expect(defaultDeck.filter((card) => card === "diamonds").length).toBe(6)
    // etc
  })

  test("should draw cards", () => {
    const deck = ["camel", "diamonds", "gold"]
    const drawedCard = gameService.drawCards(deck, 1)
    expect(deck.length).toBe(2)
    expect(drawedCard).toStrictEqual(["camel"])
  })

  test("should put camels from hand to herd", () => {
    const game = {
      _players: [
        { hand: ["camel", "gold"], camelsCount: 0 },
        { hand: ["gold", "gold"], camelsCount: 0 },
      ],
    }
    gameService.putCamelsFromHandToHerd(game)
    expect(game._players[0].hand.length).toBe(1)
    expect(game._players[0].hand).toStrictEqual(["gold"])
    expect(game._players[0].camelsCount).toBe(1)

    expect(game._players[1].hand.length).toBe(2)
    expect(game._players[1].hand).toStrictEqual(["gold", "gold"])
    expect(game._players[1].camelsCount).toBe(0)
  })

  test("should take an item from market", async () => {
    const game = {
      _players: [
        { hand: ["diamonds", "gold"], camelsCount: 0 },
        { hand: ["gold", "gold"], camelsCount: 0 },
      ],
      _deck: ["diamonds", "gold", "camel"],
      market: ["diamonds", "gold", "camel", "camel", "camel"],
      currentPlayerIndex: 0,
    }
    gameService.takeGood(game, "gold")
    expect(game._players[0].hand).toStrictEqual(["diamonds", "gold", "gold"])
    expect(game.currentPlayerIndex).toBe(1)
    expect(game._deck).toStrictEqual(["gold", "camel"])
    expect(game.market).toStrictEqual([
      "diamonds",
      "camel",
      "camel",
      "camel",
      "diamonds",
    ])
  })

  test("should take a camel from market", async () => {
    const game = {
      _players: [
        { hand: ["diamonds", "gold"], camelsCount: 0 },
        { hand: ["gold", "gold"], camelsCount: 0 },
      ],
      _deck: ["diamonds", "gold", "camel"],
      market: ["diamonds", "gold", "camel", "camel", "camel"],
      currentPlayerIndex: 0,
    }
    gameService.takeGood(game, "camel")
    expect(game._players[0].hand).toStrictEqual(["diamonds", "gold"])
    expect(game._players[0].camelsCount).toBe(1)
    expect(game.currentPlayerIndex).toBe(1)
    expect(game._deck).toStrictEqual(["gold", "camel"])
    expect(game.market).toStrictEqual([
      "diamonds",
      "gold",
      "camel",
      "camel",
      "diamonds",
    ])
  })

  test("should exchange items", async () => {
    const game = {
      _players: [
        { hand: ["diamonds", "gold"], camelsCount: 3 },
        { hand: ["gold", "gold"], camelsCount: 0 },
      ],
      market: ["diamonds", "gold", "lether", "lether", "camel"],
      currentPlayerIndex: 0,
    }

    gameService.exchange(
      game,
      ["lether", "gold", "lether"],
      ["diamonds", "camel", "camel"]
    )
    expect(game._players[0].hand).toStrictEqual([
      "gold",
      "lether",
      "gold",
      "lether",
    ])
    expect(game.market).toStrictEqual([
      "diamonds",
      "camel",
      "diamonds",
      "camel",
      "camel",
    ])
    expect(game.currentPlayerIndex).toBe(1)
    expect(game._players[0].camelsCount).toBe(1)
  })
})
