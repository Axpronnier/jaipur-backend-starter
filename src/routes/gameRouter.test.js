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
})

describe("Game router", () => {
  test("should create a game and list it", async () => {

    fs.readFileSync.mockImplementation(() => "")

    const response2 = await request(app).get("/games")
    expect(response2.statusCode).toBe(200)
    expect(response2.body).toStrictEqual([])
  })
})

describe("Game router", () => {
  test("should create a game and list it", async () => {

    fs.readFileSync.mockImplementation(() => '[{"id":2,"name":"cillum et do","market":["camel","camel","camel","leather","cloth"],"_deck":["silver","leather","cloth","silver","leather","diamonds","spice","spice","camel","spice","spice","camel","silver","diamonds","leather","gold","leather","spice","leather","cloth","gold","cloth","camel","silver","cloth","gold","leather","diamonds","gold","gold","leather","cloth","camel","silver","spice","camel","leather","gold","camel","spice"],"_players":[{"hand":["silver","cloth","leather","cloth"],"camelsCount":1,"score":0},{"hand":["diamonds","diamonds","spice","diamonds"],"camelsCount":1,"score":0}],"currentPlayerIndex":0,"tokens":{"diamonds":[7,7,5,5,5],"gold":[6,6,5,5,5],"silver":[5,5,5,5,5],"cloth":[5,3,3,2,2,1,1],"spice":[5,3,3,2,2,1,1],"leather":[4,3,2,1,1,1,1,1,1]},"_bonusTokens":{"3":[1,3,2,2,3,2,1],"4":[4,4,6,5,6,5],"5":[9,8,8,10,10]},"isDone":false}]')

    const response2 = await request(app).get("/games")
    expect(response2.statusCode).toBe(200)
    expect(response2.body).toStrictEqual([{ "id": 2, "name": "cillum et do", "market": ["camel", "camel", "camel", "leather", "cloth"], "_deck": ["silver", "leather", "cloth", "silver", "leather", "diamonds", "spice", "spice", "camel", "spice", "spice", "camel", "silver", "diamonds", "leather", "gold", "leather", "spice", "leather", "cloth", "gold", "cloth", "camel", "silver", "cloth", "gold", "leather", "diamonds", "gold", "gold", "leather", "cloth", "camel", "silver", "spice", "camel", "leather", "gold", "camel", "spice"], "_players": [{ "hand": ["silver", "cloth", "leather", "cloth"], "camelsCount": 1, "score": 0 }, { "hand": ["diamonds", "diamonds", "spice", "diamonds"], "camelsCount": 1, "score": 0 }], "currentPlayerIndex": 0, "tokens": { "diamonds": [7, 7, 5, 5, 5], "gold": [6, 6, 5, 5, 5], "silver": [5, 5, 5, 5, 5], "cloth": [5, 3, 3, 2, 2, 1, 1], "spice": [5, 3, 3, 2, 2, 1, 1], "leather": [4, 3, 2, 1, 1, 1, 1, 1, 1] }, "_bonusTokens": { "3": [1, 3, 2, 2, 3, 2, 1], "4": [4, 4, 6, 5, 6, 5], "5": [9, 8, 8, 10, 10] }, "isDone": false }])
  })
})

describe("Game router", () => {
  test("should find a game by the id", async () => {

    fs.readFileSync.mockImplementation(() => {
      return JSON.stringify([{id:2,name:"cillum et do"}])
    })

    const response = await request(app).get("/games/3")
    expect(response.statusCode).toBe(404)
  })
})

describe("Game router", () => {
  test("should find a game by the id", async () => {

    fs.readFileSync.mockImplementation(() => {
      return JSON.stringify([{id:2,name:"cillum et do"}])
    })

    const response = await request(app).get("/games/2")
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({id:2,name:"cillum et do"})
  })
})

describe("Game router", () => {
  test("should delete a game by the id", async () => {

    fs.readFileSync.mockImplementation(() => {
      return JSON.stringify([{id:2,name:"cillum et do"}])
    })

    const response = await request(app).delete("/games/3")
    expect(response.statusCode).toBe(404)
  })
})

describe("Game router", () => {
  test("should delete a game by the id", async () => {

    fs.readFileSync.mockImplementation(() => {
      return JSON.stringify([{id:2,name:"cillum et do"}])
    })

    const response = await request(app).delete("/games/2")
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual([])
  })
})