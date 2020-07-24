import { Component } from '@angular/core';
import { Players, teamA, teamB } from './players';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** Cricket Team - A */
  public teamA: Players[] = teamA;

  /** Cricket Team - B */
  public teamB: Players[] = teamB;

  /** Current battig team */
  public battingTeam = 'Team - A';

  /** Present player batting */
  public battingPlayer: string;

  /** Current bowling team */
  public bowlingTeam = 'Team - B';

  /** Present bowling player */
  public bowlingPlayer: string;

  /** Number of overs */
  public overs: number;

  /** Total number of balls */
  public totalBalls: number;

  /** Total score */
  public totalScore: number;

  public totalWickets: number;

  public gameStatus: string;

  public innings: number;

  private startGame: number;

  private randomScore = [0, 1, 2, 3, 4, 5, 6, 'wd', 'nb', 'out'];

  constructor() {
    this.battingPlayer = this.teamA[0].player;
    this.bowlingPlayer = this.teamB[0].player;
    this.overs = 0;
    this.totalBalls = 0;
    this.gameStatus = 'Start';
    this.innings = 1;
    this.startGame = 0;
    this.totalScore = 0;
    this.totalWickets = 0;
  }

  /** Start the game */
  public bowl(): void {
    let startGame: number;
    let batsmanArr = 0;
    let bowlArr = 0;
    // this.gameStatus === 'Start' ? this.gameStatus = 'Stop' : this.gameStatus = 'Start';
    if (this.gameStatus === 'Start') {
      this.gameStatus = 'Stop';
    } else {
      this.gameStatus = 'Start';
      // clearInterval(startGame);
    }
    if (this.overs <= 20.0 && this.gameStatus === 'Stop') {
      startGame = setInterval(() => {

        // Overs increment
        if (this.checkDec()) {
          this.overs += .4;
        }
        this.overs = this.overs + 0.1;

        // gets the bowler by overs
        if (bowlArr < 9 && Math.floor(this.overs) < 9) {
          bowlArr = Math.floor(this.overs);
        } else if (bowlArr === 9) {
          bowlArr = 0;
        }
        this.bowlingPlayer = this.teamB[bowlArr].player;
        bowlArr += 1;

        // gets the batsman
        if (batsmanArr === 10) {
          // match end
        } else {
          if (this.teamA[batsmanArr].battingStats.wicketBy.length > 0) {
            batsmanArr += 1;
          }
          this.battingPlayer = this.teamA[batsmanArr].player;
          const randomScore = this.randomScore[Math.floor(Math.random() * this.randomScore.length)];
          if (typeof (randomScore) === 'number') {
            this.teamA[batsmanArr].battingStats.bowls += 1; // number of balls played by the player
            switch (randomScore) {
              case 4:
                this.teamA[batsmanArr].battingStats.fours += 1; // number of 4s
                this.teamA[batsmanArr].battingStats.runs += randomScore;
                this.totalScore += randomScore;
                break;
              case 6:
                this.teamA[batsmanArr].battingStats.sixs += 1;  // number of 6s
                this.teamA[batsmanArr].battingStats.runs += randomScore;
                this.totalScore += randomScore;
                break;
              default:
                this.teamA[batsmanArr].battingStats.runs += randomScore;
                this.totalScore += randomScore;
                break;
            }
          } else {
            switch (randomScore) {
              case 'wd':
                this.teamA[batsmanArr].battingStats.runs += 1;
                this.totalScore += 1;
                break;
              case 'nb':
                this.teamA[batsmanArr].battingStats.runs += 0;
                break;
              case 'out':
                this.teamA[batsmanArr].battingStats.wicketBy = this.bowlingPlayer;
            }
          }
          // this.teamA.forEach(team => {
          //   this.totalScore += team.battingStats.runs;
          //   if (team.battingStats.wicketBy.length > 0) {
          //     this.totalWickets = team.battingStats.wicketBy.length;
          //   }
          // });
        }

        // stop if the game reaches to 20 overs;
        if (Math.floor(this.overs) === 20) {
          clearInterval(startGame);
        }
      }, 1000);
    } else {
      // Match end
      console.log('second innn');
    }
  }

  /** Checking the decimal number */
  private checkDec(): boolean {
    return JSON.parse(this.overs.toFixed(1).split('.')[1]) > 4 ? true : false;
  }
}
