import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

const teamsBgColorList = ['rcb', 'kkr', 'kxp', 'csk', 'rr', 'mi', 'sh', 'dc']

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    latestMatchDetails: {},
    recentMatchesList: [],
    bgColorClassname: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatchesDetails()
  }

  getTeamMatchesDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const className = teamsBgColorList.filter(item => item === id.toLowerCase())

    this.setState({
      isLoading: false,
      bgColorClassname: className[0],
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        date: data.latest_match_details.date,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        result: data.latest_match_details.result,
        umpires: data.latest_match_details.umpires,
        venue: data.latest_match_details.venue,
      },
      recentMatchesList: data.recent_matches.map(item => ({
        id: item.id,
        competingTeam: item.competing_team,
        competingTeamLogo: item.competing_team_logo,
        firstInnings: item.first_innings,
        secondInnings: item.second_innings,
        matchStatus: item.match_status,
        result: item.result,
      })),
    })
  }

  render() {
    const {
      teamBannerUrl,
      latestMatchDetails,
      recentMatchesList,
      bgColorClassname,
      isLoading,
    } = this.state

    return isLoading ? (
      <div data-testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    ) : (
      <div className={`team-details-container ${bgColorClassname}`}>
        <img
          className="teambanner-image"
          src={teamBannerUrl}
          alt="team banner"
        />
        <p className="latestmatches-heading">Latest Matches</p>
        <LatestMatch latestMatchDetails={latestMatchDetails} />
        <ul className="matchcard-list-container">
          {recentMatchesList.map(eachMatch => (
            <MatchCard key={eachMatch.id} matchCardDetails={eachMatch} />
          ))}
        </ul>
      </div>
    )
  }
}

export default TeamMatches
//
