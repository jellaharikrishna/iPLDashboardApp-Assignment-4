import {Component} from 'react'
import {Link} from 'react-router-dom'
import {PieChart, Pie, Legend, Tooltip, Cell} from 'recharts'

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

  findStats = (matchesList, type) => {
    const countOf = matchesList.filter(each => each.matchStatus === type)
    return countOf.length
  }

  renderPieChart = () => {
    const {recentMatchesList} = this.state

    const winsCount = this.findStats(recentMatchesList, 'Won')
    const lostCount = this.findStats(recentMatchesList, 'Lost')
    const drawCount = this.findStats(recentMatchesList, 'Draw')

    const data = [
      {name: 'Won', value: winsCount},
      {name: 'Lost', value: lostCount},
      {name: 'Drawn', value: drawCount},
    ]

    return (
      <div className="pie-chart-container">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            <Cell key="cell-0" fill="#34cc09" />
            <Cell key="cell-1" fill="#c20404" />
            <Cell key="cell-2" fill="#0bf3d0" />
          </Pie>
          <Legend
            iconType="circle"
            iconSize={18}
            wrapperStyle={{top: '50px'}}
          />

          <Tooltip />
        </PieChart>
      </div>
    )
  }

  render() {
    const {
      teamBannerUrl,
      latestMatchDetails,
      recentMatchesList,
      bgColorClassname,
      isLoading,
    } = this.state

    return (
      <>
        {isLoading ? (
          <div data-testid="loader" className="ipl-team-match-loader">
            <Loader type="Oval" color="#000000" height={50} width={50} />
          </div>
        ) : (
          <div className={`team-details-container ${bgColorClassname}`}>
            <Link to="/" className="team-match-back-btn-link">
              <button className="team-match-back-btn" type="button">
                Back
              </button>
            </Link>
            <img
              className="teambanner-image"
              src={teamBannerUrl}
              alt="team banner"
            />
            <div className="stats-container">
              <h1 className="stats-heading">Statistics</h1>
              {this.renderPieChart()}
            </div>
            <p className="latestmatches-heading">Latest Matches</p>
            <LatestMatch latestMatchDetails={latestMatchDetails} />
            <ul className="matchcard-list-container">
              {recentMatchesList.map(eachMatch => (
                <MatchCard key={eachMatch.id} matchCardDetails={eachMatch} />
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }
}

export default TeamMatches
//
