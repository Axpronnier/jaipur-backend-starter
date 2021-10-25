import request from "supertest"
import app from "../app"
import lodash from "lodash"
import fs from "fs"

// Prevent database service to write tests game to filesystem
jest.mock("fs")

// Prevent shuffle for tests
jest.mock("lodash")
lodash.shuffle.mockImplementation((array) => array)

describe("Game router", () => {
  test("should create a game", async () => {
    const expectedGame = {
      id: 1,
      name: "test",
      market: ["camel", "camel", "camel", "diamonds", "diamonds"],
      _deck: [
        "silver",
        "silver",
        "silver",
        "silver",
        "silver",
        "silver",
        "cloth",
        "cloth",
        "cloth",
        "cloth",
        "cloth",
        "cloth",
        "cloth",
        "cloth",
        "spice",
        "spice",
        "spice",
        "spice",
        "spice",
        "spice",
        "spice",
        "spice",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "camel",
        "camel",
        "camel",
        "camel",
        "camel",
        "camel",
        "camel",
        "camel",
      ],
      _players: [
        {
          hand: ["diamonds", "diamonds", "diamonds", "diamonds", "gold"],
          camelsCount: 0,
          score: 0,
        },
        {
          hand: ["gold", "gold", "gold", "gold", "gold"],
          camelsCount: 0,
          score: 0,
        },
      ],
      currentPlayerIndex: 0,
      tokens: {
        diamonds: [7, 7, 5, 5, 5],
        gold: [6, 6, 5, 5, 5],
        silver: [5, 5, 5, 5, 5],
        cloth: [5, 3, 3, 2, 2, 1, 1],
        spice: [5, 3, 3, 2, 2, 1, 1],
        leather: [4, 3, 2, 1, 1, 1, 1, 1, 1],
      },
      _bonusTokens: {
        3: [2, 1, 2, 3, 1, 2, 3],
        4: [4, 6, 6, 4, 5, 5],
        5: [8, 10, 9, 8, 10],
      },
      isDone: false,
    }

    const response = await request(app).post("/games").send({ name: "test" })
    expect(response.statusCode).toBe(201)
    expect(response.body).toStrictEqual(expectedGame)
  })

  test("should take an item from market", async () => {
    fs.readFileSync.mockImplementation(() =>
      JSON.stringify([
        {
          id: 1,
          name: "test",
          market: ["camel", "camel", "silver", "diamonds", "spice"],
          _deck: [
            "diamonds",
            "gold",
            "gold",
            "spice",
            "gold",
            "leather",
            "cloth",
            "leather",
            "camel",
            "silver",
            "camel",
            "camel",
            "gold",
            "cloth",
            "gold",
            "silver",
            "camel",
            "cloth",
            "leather",
            "leather",
            "silver",
            "leather",
            "spice",
            "camel",
            "camel",
            "gold",
            "camel",
            "cloth",
            "spice",
            "silver",
            "cloth",
            "leather",
            "cloth",
            "leather",
            "spice",
            "silver",
            "spice",
            "cloth",
            "diamonds",
          ],
          _players: [
            {
              hand: [
                "leather",
                "spice",
                "leather",
                "spice",
                "diamonds",
                "camel",
              ],
              camelsCount: 0,
              score: 0,
            },
            {
              hand: ["cloth", "leather", "diamonds", "diamonds"],
              camelsCount: 1,
              score: 0,
            },
          ],
          currentPlayerIndex: 1,
          tokens: {
            diamonds: [7, 7, 5, 5, 5],
            gold: [6, 6, 5, 5, 5],
            silver: [5, 5, 5, 5, 5],
            cloth: [5, 3, 3, 2, 2, 1, 1],
            spice: [5, 3, 3, 2, 2, 1, 1],
            leather: [4, 3, 2, 1, 1, 1, 1, 1, 1],
          },
          _bonusTokens: {
            3: [1, 1, 3, 2, 2, 2, 3],
            4: [5, 4, 6, 6, 5, 4],
            5: [8, 9, 8, 10, 10],
          },
          isDone: false,
        },
      ])
    )

    const response = await request(app)
      .header({ PlayerIndex: 0 })
      .put("1/take-good")
      .send({ good: "spice" })

    const expectedGame = {
      id: 1,
      name: "test",
      market: ["camel", "camel", "silver", "diamonds", "diamonds"],
      _deck: [
        "gold",
        "gold",
        "spice",
        "gold",
        "leather",
        "cloth",
        "leather",
        "camel",
        "silver",
        "camel",
        "camel",
        "gold",
        "cloth",
        "gold",
        "silver",
        "camel",
        "cloth",
        "leather",
        "leather",
        "silver",
        "leather",
        "spice",
        "camel",
        "camel",
        "gold",
        "camel",
        "cloth",
        "spice",
        "silver",
        "cloth",
        "leather",
        "cloth",
        "leather",
        "spice",
        "silver",
        "spice",
        "cloth",
        "diamonds",
      ],
      _players: [
        {
          hand: ["leather", "spice", "leather", "spice", "diamonds", "camel"],
          camelsCount: 0,
          score: 0,
        },
        {
          hand: ["cloth", "leather", "diamonds", "diamonds", "spice"],
          camelsCount: 1,
          score: 0,
        },
      ],
      currentPlayerIndex: 1,
      tokens: {
        diamonds: [7, 7, 5, 5, 5],
        gold: [6, 6, 5, 5, 5],
        silver: [5, 5, 5, 5, 5],
        cloth: [5, 3, 3, 2, 2, 1, 1],
        spice: [5, 3, 3, 2, 2, 1, 1],
        leather: [4, 3, 2, 1, 1, 1, 1, 1, 1],
      },
      _bonusTokens: {
        3: [1, 1, 3, 2, 2, 2, 3],
        4: [5, 4, 6, 6, 5, 4],
        5: [8, 9, 8, 10, 10],
      },
      isDone: false,
    }

    expect(response.statusCode).toBe(201)
    expect(response.body).toStrictEqual(expectedGame)
  })
})
