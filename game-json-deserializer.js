import GameJsonSerializer from "./game-json-serializer";

export default class GameJsonDeserializer{
  constructor(game, string){
    this.game = game;
    this.string = string;
  }

  deserialize(){
    const gameStatusArr = JSON.parse(this.string);
  }
}
